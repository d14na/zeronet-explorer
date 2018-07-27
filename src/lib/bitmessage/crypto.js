const assert = require('./_util').assert
const platform = require('./platform')
const eccrypto = require('secp256k1')

/**
 * Calculate SHA-1 hash.
 * @param {Buffer} buf - Input data
 * @return {Buffer} Resulting hash.
 * @function
 * @static
 */
const sha1 = exports.sha1 = platform.sha1

/**
 * Calculate SHA-256 hash.
 * @param {Buffer} buf - Input data
 * @return {Buffer} Resulting hash.
 * @function
 */
exports.sha256 = platform.sha256

/**
 * Calculate SHA-512 hash.
 * @param {Buffer} buf - Input data
 * @return {Buffer} Resulting hash.
 * @function
 */
exports.sha512 = platform.sha512

/**
 * Calculate RIPEMD-160 hash.
 * @param {Buffer} buf - Input data
 * @return {Buffer} Resulting hash.
 * @function
 */
exports.ripemd160 = platform.ripemd160

/**
 * Generate cryptographically strong pseudo-random data.
 * @param {number} size - Number of bytes
 * @return {Buffer} Buffer with random data.
 * @function
 */
exports.randomBytes = platform.randomBytes

/**
 * Generate a new random private key.
 * @return {Buffer} New private key.
 */
exports.getPrivate = function () {
    const utils = require('ethers').utils

    return utils.randomBytes(32)
}

/**
 * Generate public key for the given private key.
 * @param {Buffer} privateKey - A 32-byte private key
 * @return {Buffer} A 65-byte (uncompressed) public key.
 * @function
 */
exports.getPublic = function (privateKey) {
    assert(privateKey.length === 32, "Bad private key")

    // See https://github.com/wanderer/secp256k1-node/issues/46
    // const secp256k1 = require("secp256k1")
    const compressed = eccrypto.publicKeyCreate(privateKey)

    return eccrypto.publicKeyConvert(compressed, false)
}

/**
 * Sign message using ecdsa-with-sha1 scheme.
 * @param {Buffer} privateKey - A 32-byte private key
 * @param {Buffer} msg - The message being signed
 * @return {Promise.<Buffer>} A promise that contains signature in DER
 * format when fulfilled.
 */
exports.sign = function(privateKey, msg) {
    var hash = sha1(msg)
    return eccrypto.sign(privateKey, hash)
}

/**
 * Verify signature using ecdsa-with-sha1 scheme.
 * @param {Buffer} publicKey - A 65-byte public key
 * @param {Buffer} msg - The message being verified
 * @param {Buffer} sig - The signature in DER format
 * @return {Promise.<null>} A promise that resolves on correct signature
 * and rejects on bad key or signature.
 */
exports.verify = function(publicKey, msg, sig) {
    var hash = sha1(msg)
    return eccrypto.verify(publicKey, hash, sig)
}

const SECP256K1_TYPE = 714

// We define this structure here to avoid circular imports. However we
// rexport and document it in `structs` module for consistency.
const encrypted = exports.encrypted = {
    decode: function(buf) {
        assert(buf.length >= 118, 'Buffer is too small')
        assert(buf.readUInt16BE(16, true) === SECP256K1_TYPE, 'Bad curve type')
        assert(buf.readUInt16BE(18, true) === 32, 'Bad Rx length')
        assert(buf.readUInt16BE(52, true) === 32, 'Bad Ry length')

        const iv = new Buffer(16)
        buf.copy(iv, 0, 0, 16)

        const ephemPublicKey = new Buffer(65)
        ephemPublicKey[0] = 0x04
        buf.copy(ephemPublicKey, 1, 20, 52)
        buf.copy(ephemPublicKey, 33, 54, 86)

        // NOTE(Kagami): We do copy instead of slice to protect against
        // possible source buffer modification by user.
        const ciphertext = new Buffer(buf.length - 118)
        buf.copy(ciphertext, 0, 86, buf.length - 32)

        const mac = new Buffer(32)
        buf.copy(mac, 0, buf.length - 32)

        return { iv, ephemPublicKey, ciphertext, mac }
    },

    encode: function(opts) {
        assert(opts.iv.length === 16, 'Bad IV')
        assert(opts.ephemPublicKey.length === 65, 'Bad public key')
        assert(opts.mac.length === 32, 'Bad MAC')

        // 16 + 2 + 2 + 32 + 2 + 32 + ? + 32
        const buf = new Buffer(118 + opts.ciphertext.length)

        opts.iv.copy(buf)
        buf.writeUInt16BE(SECP256K1_TYPE, 16, true)  // Curve type
        buf.writeUInt16BE(32, 18, true)  // Rx length
        opts.ephemPublicKey.copy(buf, 20, 1, 33)  // Rx
        buf.writeUInt16BE(32, 52, true)  // Ry length
        opts.ephemPublicKey.copy(buf, 54, 33)  // Ry
        opts.ciphertext.copy(buf, 86)
        opts.mac.copy(buf, 86 + opts.ciphertext.length)

        return buf
    }
}

/**
 * Encrypt message for given recepient's public key.
 * @param {Buffer} publicKeyTo - Recipient's public key (65 bytes)
 * @param {Buffer} msg - The message being encrypted
 * @param {Object=} opts - You may also specify initialization vector
 * and ephemeral private key to get deterministic results
 * @param {Buffer} opts.iv - Initialization vector (16 bytes)
 * @param {Buffer} opts.ephemPrivateKey - Ephemeral private key (32
 * bytes)
 * @return {Promise.<Buffer>} A promise that resolves with the buffer in
 * `encrypted` format successful encryption and rejects on failure.
 */
exports.encrypt = function(publicKeyTo, msg, opts) {
    return eccrypto.encrypt(publicKeyTo, msg, opts)
        .then(function(encObj) {
            return encrypted.encode(encObj)
        })
}

/**
 * Decrypt message using given private key.
 * @param {Buffer} privateKey - A 32-byte private key of recepient of
 * the mesage
 * @param {Buffer} buf - Encrypted data
 * @return {Promise.<Buffer>} A promise that resolves with the plaintext
 * on successful decryption and rejects on failure.
 */
exports.decrypt = function(privateKey, buf) {
    return new Promise(function(resolve) {
        const encObj = encrypted.decode(buf)
        resolve(eccrypto.decrypt(privateKey, encObj))
    })
}
