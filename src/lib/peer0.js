//import Timer from 'react-native-timer'

class Peer0 {
    constructor(_net) {
        this.net = _net
        this.peerId = '-0NET00-180814FFFFFF'
        // this.peerId = '-UT3530-FFFFFFFFFFFF'

        this.hostIp = '178.128.8.225' // OUR TEST SERVER
        this.hostPort = 13312
        this.host = {
            host: this.hostIp,
            port: this.hostPort
        }

        this.reqId = null
        this.requests = []
        this.payload = null
        this.client = null

        this.tag = null
        this.path = null
    }

    _addRequest = function (_request) {
        if (!this.reqId) {
            this.reqId = 0
        }

        /* Initialize request id (auto-increment). */
        this.reqId++

        this.requests[this.reqId] = _request

        /* Return the request id. */
        return this.reqId
    }

    _encode = function (_msg) {
        const msgpack = require('zeronet-msgpack')()
        const encode = msgpack.encode

        return encode(_msg)
    }

    _decode = function (_msg) {
        const msgpack = require('zeronet-msgpack')()
        const decode = msgpack.decode

        return decode(_msg)
    }

    _requestFile = function () {
        const cmd = 'getFile'
        const innerPath = this.path
        const site = this.tag
        const request = { cmd, innerPath, site }

        const req_id = this._addRequest(request) // eslint-disable-line camelcase

        const inner_path = innerPath // eslint-disable-line camelcase
        const location = 0
        const params = { site, inner_path, location }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        this.client.write(this._encode(pkg), function () {
            console.info('Client request for [ %s ]', inner_path)
        })
    }

    _handshakePkg = function () {
        const cmd = 'handshake'
        const request = { cmd }
        const req_id = this._addRequest(request)

        const crypt = null
        const crypt_supported = []
        // const crypt_supported = ['tls-rsa']
        const fileserver_port = 15441
        const protocol = 'v2'
        const port_opened = true
        const peer_id = this.peerId
        const rev = 2122
        const version = '0.5.6'
        const target_ip = this.hostIp

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

    // parseIp = function (_buf) {
    //     const ip = _buf.readUInt8(0) +
    //         '.' + _buf.readUInt8(1) +
    //         '.' + _buf.readUInt8(2) +
    //         '.' + _buf.readUInt8(3)
    //
    //     return ip
    // }

    // parsePort = function (_buf) {
    //     const port = (_buf.readUInt8(1) * 256) + _buf.readUInt8(0)
    //
    //     return port
    // }

    getFile = function (_tag, _path, _start, _length) {
        /* Localize this. */
        const self = this

        /* Assign global holders. */
        self.tag = _tag
        self.path = _path

        return new Promise((resolve, reject) => {
            self.client = self.net.createConnection(self.hostPort, self.hostIp, () => {
                console.info('Connected to peer!', self.hostPort, self.hostIp)

                /* Initialize handshake package. */
                const pkg = self._encode(self._handshakePkg())

                /* Send package. */
                self.client.write(pkg)
            })

            self.client.on('error', function (error) {
                console.error(error)

                reject(error)
            })

            let called = 0
            let hasHandshake = false

            self.client.on('data', function(_data) {
                try {
                    if (self.payload) {
                        self.payload = Buffer.concat([self.payload, _data])
                    } else {
                        self.payload = _data
                    }

                    /* Attempt to decode the data. */
                    const decoded = self._decode(self.payload)

                    // console.log('Message #%d was received [%d bytes]', ++called, _data.length, _data, decoded)

                    /* Handshake response. */
                    if (decoded.protocol === 'v2' && hasHandshake === false) {
                        /* Reset payload. */
                        self.payload = null

                        /* Set handshake flag. */
                        hasHandshake = true

                        console.info('Handshake complete. Request the file!')
                        self._requestFile()
                    }

                    /* Body parts. */
                    if (decoded.body) {
                        /* Reset payload. */
                        self.payload = null

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

            self.client.on('close', function () {
                console.info('Connection closed.')
            })
        })

    }

}

export default Peer0
