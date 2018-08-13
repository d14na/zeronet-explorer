//import Timer from 'react-native-timer'

let net = null
let peerId = '-UT3530-FFFFFFFFFFFF'

let hostIp = '178.128.8.225' // OUR TEST SERVER
let hostPort = 13312
let host = {
    host: hostIp,
    port: hostPort
}

let reqId = null
let requests = []
let payload = null
let client = null

let tag = null
let path = null

const _addRequest = function (_request) {
    if (!reqId) {
        reqId = 0
    }

    /* Initialize request id (auto-increment). */
    reqId++

    requests[reqId] = _request

    /* Return the request id. */
    return reqId
}

const _encode = function (_msg) {
    const msgpack = require('zeronet-msgpack')()
    const encode = msgpack.encode

    return encode(_msg)
}

const _decode = function (_msg) {
    const msgpack = require('zeronet-msgpack')()
    const decode = msgpack.decode

    return decode(_msg)
}

const parseIp = function (_buf) {
    const ip = _buf.readUInt8(0) +
        '.' + _buf.readUInt8(1) +
        '.' + _buf.readUInt8(2) +
        '.' + _buf.readUInt8(3)

    return ip
}

const parsePort = function (_buf) {
    const port = (_buf.readUInt8(1) * 256) + _buf.readUInt8(0)

    return port
}

const _requestFile = function () {
    const cmd = 'getFile'
    const innerPath = path
    const site = tag
    const request = { cmd, innerPath, site }

    const req_id = _addRequest(request) // eslint-disable-line camelcase

    const inner_path = innerPath // eslint-disable-line camelcase
    const location = 0
    const params = { site, inner_path, location }

    const pkg = { cmd, req_id, params }

    /* Send request. */
    client.write(_encode(pkg), function () {
        console.info('Client request for [ %s ]', inner_path)
    })
}

const getFile = function (_net, _tag, _path, _start, _length) {
    /* Assign global holders. */
    tag = _tag
    path = _path

    return new Promise((resolve, reject) => {
        client = _net.createConnection(hostPort, hostIp, () => {
            console.info('Connected to peer!', hostPort, hostIp)

            /* Initialize handshake package. */
            const pkg = _encode(handshakePkg())

            /* Send package. */
            client.write(pkg)
        })

        client.on('error', function (error) {
            console.error(error)

            reject(error)
        })

        let called = 0
        let hasHandshake = false

        client.on('data', function(_data) {
            try {
                if (payload) {
                    payload = Buffer.concat([payload, _data])
console.log('PAYLOAD [ %d of %d ]', payload.length, _length)
                } else {
                    payload = _data
                }

                /* Attempt to decode the data. */
                const decoded = _decode(payload)

                console.log('Message #%d was received [%d bytes]', ++called, _data.length, _data, decoded)

                /* Handshake response. */
                if (decoded.protocol === 'v2' && hasHandshake === false) {
                    /* Reset payload. */
                    payload = null

                    /* Set handshake flag. */
                    hasHandshake = true

                    console.info('Handshake complete. Request the file!')
                    _requestFile()
                }

                /* Body parts. */
                if (decoded.body) {
                    /* Reset payload. */
                    payload = null

                    resolve(decoded.body)
                }
            } catch (e) {
                // FIXME We should NOT attempt decoding until all data has
                //       been downloaded
                //       (must account for payload size in addition to body)
                // ignore the errors
                // console.log('Failed to decode data', e, _data)
            }
        })

        client.on('close', function () {
            console.info('Connection closed.')
        })
    })

}

const handshakePkg = function () {
    const cmd = 'handshake'
    const request = { cmd }
    const req_id = _addRequest(request)

    const crypt = null
    const crypt_supported = []
    // const crypt_supported = ['tls-rsa']
    const fileserver_port = 15441
    const protocol = 'v2'
    const port_opened = true
    const peer_id = peerId
    const rev = 2122
    const version = '0.5.6'
    const target_ip = hostIp

    /* Build parameters. */
    const params = {
        crypt,
        crypt_supported,
        fileserver_port,
        protocol,
        port_opened,
        peer_id,
        rev,
        version,
        target_ip
    }

    return { cmd, req_id, params }
}

export default {
    getFile
}
