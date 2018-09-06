//import Timer from 'react-native-timer'

class Peer0 {
    constructor(_net, _hostIp=null, _hostPort=null) {
        this.net = _net
        this.peerId = '-0NET00-180814FFFFFF'

        this.hostIp = _hostIp || '185.142.236.207' // SUPeer test server
        this.hostPort = _hostPort || 10443 // SUPeer default port
        this.host = {
            host: this.hostIp,
            port: this.hostPort
        }

        this.reqId = null
        this.requests = []
        this.payload = null
        this.client = null

        this.address = null
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

    _handshakePkg = function () {
        const cmd = 'handshake'
        const request = { cmd }
        const req_id = this._addRequest(request)

        const crypt = null
        const crypt_supported = []
        // const crypt_supported = ['tls-rsa']
        const fileserver_port = this.hostPort // 15441
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

    _parseIp = function (_buf) {
        const ip = _buf.readUInt8(0) +
            '.' + _buf.readUInt8(1) +
            '.' + _buf.readUInt8(2) +
            '.' + _buf.readUInt8(3)

        return ip
    }

    _parsePort = function (_buf) {
        const port = (_buf.readUInt8(5) * 256) + _buf.readUInt8(4)
        // const port = (_buf.readUInt8(1) * 256) + _buf.readUInt8(0)

        return port
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

    _requestPeers = function () {
        const cmd = 'pex'
        const site = this.address
        const peers = []
        const peers_onion = [] // eslint-disable-line camelcase
        const need = 10

        const request = { cmd, site, need }

        const req_id = this._addRequest(request) // eslint-disable-line camelcase

        const params = { site, peers, peers_onion, need }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        this.client.write(this._encode(pkg), function () {
            console.info('Client request for %d peers for [ %s ]', need, site)
        })
    }

    _requestFile = function () {
        const cmd = 'getFile'
        const innerPath = this.path
        const site = this.address
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

    pex = function (_address) {
        /* Localize this. */
        const self = this

        /* Assign global holders. */
        self.address = _address

        /* Initialize a NEW client connection/handshake (if needed). */
        const promise = new Promise((resolve, reject) => {
            /* Initialize promise holders. */
            self.resolve = resolve
            self.reject = reject
        })

        /* Initialize/verify our client connection. */
        if (self.client) {
            /* Request the file. */
            self._requestPeers()
        } else {
            /* Initialize the handshake. */
            self.hasHandshake = false

            self.client = self.net.createConnection(self.hostPort, self.hostIp, () => {
                console.info('Opened a new peer connection!', self.hostPort, self.hostIp)

                /* Initialize handshake package. */
                const pkg = self._encode(self._handshakePkg())

                /* Send package. */
                self.client.write(pkg)
            })

            self.client.on('error', function (error) {
                console.error('react-native-tcp', error)

                self.reject(error)
            })

            let numCalled = 0 // FOR DEBUGGING PURPOSES ONLY

            self.client.on('data', function(_data) {
                try {
                    if (self.payload) {
                        self.payload = Buffer.concat([self.payload, _data])
                    } else {
                        self.payload = _data
                    }

                    /* Attempt to decode the data. */
                    const decoded = self._decode(self.payload)

                    // console.log('Message #%d was received [%d bytes]', ++numCalled, _data.length, _data, decoded)

                    /* Handshake response. */
                    if (decoded.protocol === 'v2' && self.hasHandshake === false) {
                        /* Reset payload. */
                        self.payload = null

                        /* Set handshake flag. */
                        self.hasHandshake = true

                        console.info('Handshake complete. Request the peers!')
                        self._requestPeers()
                    }

                    /* Body parts. */
                    if (decoded.peers || decoded.peers_onion) {
                        /* Reset payload. */
                        self.payload = null

console.log('ALL PEERS', decoded.peers)
                        let peer1 = Buffer.from(decoded.peers[0], 'binary')
                        let peer2 = Buffer.from(decoded.peers[1], 'binary')
                        console.log('PEER 1 (binary)', peer1)
                        console.log('PEER 1 IP', self._parseIp(peer1))
                        console.log('PEER 1 PORT', self._parsePort(peer1))
                        console.log('PEER 2 (binary)', peer2)
                        console.log('PEER 2 IP', self._parseIp(peer2))
                        console.log('PEER 2 PORT', self._parsePort(peer2))

                        /* Build response. */
                        const pkg = {
                            peers: decoded.peers,
                            peersOnion: decoded.peers_onion
                        }

                        self.resolve(pkg)
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
        }

        /* Return the promise. */
        return promise
    }

    getFile = function (_address, _path, _start, _length) {
        /* Localize this. */
        const self = this

        /* Assign global holders. */
        self.address = _address
        self.path = _path

        /* Initialize a NEW client connection/handshake (if needed). */
        const promise = new Promise((resolve, reject) => {
            /* Initialize promise holders. */
            self.resolve = resolve
            self.reject = reject
        })

        /* Initialize/verify our client connection. */
        if (self.client) {
            /* Request the file. */
            self._requestFile()
        } else {
            /* Initialize the handshake. */
            self.hasHandshake = false

            self.client = self.net.createConnection(self.hostPort, self.hostIp, () => {
                console.info('Opened a new peer connection!', self.hostPort, self.hostIp)

                /* Initialize handshake package. */
                const pkg = self._encode(self._handshakePkg())

                /* Send package. */
                self.client.write(pkg)
            })

            self.client.on('error', function (error) {
                console.error('react-native-tcp', error)

                self.reject(error)
            })

            let numCalled = 0 // FOR DEBUGGING PURPOSES ONLY

            self.client.on('data', function(_data) {
                try {
                    if (self.payload) {
                        self.payload = Buffer.concat([self.payload, _data])
                    } else {
                        self.payload = _data
                    }

                    /* Attempt to decode the data. */
                    const decoded = self._decode(self.payload)

                    // console.log('Message #%d was received [%d bytes]', ++numCalled, _data.length, _data, decoded)

                    /* Handshake response. */
                    if (decoded.protocol === 'v2' && self.hasHandshake === false) {
                        /* Reset payload. */
                        self.payload = null

                        /* Set handshake flag. */
                        self.hasHandshake = true

                        console.info('Handshake complete. Request the file!')
                        self._requestFile()
                    }

                    /* Body parts. */
                    if (decoded.body) {
                        /* Reset payload. */
                        self.payload = null

                        self.resolve(decoded.body)
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
        }

        /* Return the promise. */
        return promise
    }

}

export default Peer0
