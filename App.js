import './shim'
import React, { Component } from 'react'
import { AppRegistry, TextInput } from 'react-native'
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native'

const instructions = Platform.select({
    ios: 'I see you iOS',
    android: 'I see you Android'
})

type Props = {}

export default class App extends Component<Props> {
    constructor(props) {
        super(props)

        /* Localize store to class object. */
        // this.store = this.props.store

        /* Initialize default account settings. */
        // this.accounts = []

        this.state = {
            debug: 'loading...',

            peerId: '-UT3530-FFFFFFFFFFFF',
            hostIp: '178.128.8.225', // OUR TEST SERVER
            hostPort: 13312
        }
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.welcome}>
                Welcome to NEW ZeroNet
            </Text>
            <Text style={styles.instructions}>
                To get started, edit App.js
            </Text>
            <Text style={styles.instructions}>
                {instructions}
            </Text>
            <Text style={styles.instructions}>
                Debugging Results
            </Text>

            <View style={ styles.debug }>
                <Text style={ styles.debugText }>
                    { this.state.debug }
                </Text>
            </View>
        </View>
    }

    componentDidMount() {
        // console.log('mounted')
        this.setState({ debug: 'mounted.' })

        this.requests = []

        this._test()
        // this._initPeer()
        // this._announce()
    }

    _test() {
        const self = this

        var net = require('net')
        // OR, if not shimming via package.json "browser" field:
        // var net = require('react-native-tcp')

        const hostIp = '178.128.8.225'
        const hostPort = 13312
        // const hostIp = '82.217.119.49'
        // const hostPort = 16065

        // var server = net.createServer(function(socket) {
        //     socket.write('excellent!')
        // }).listen(12345)

        const host = {
            host: hostIp,
            port: hostPort
        }
        self.setState({ debug: JSON.stringify(host) })

        // const client = net.createConnection(hostPort, hostIp)
        // const client = net.createConnection(host, () => {
        const client = net.createConnection(hostPort, hostIp, () => {
            // 'connect' listener
            console.log('Connected to peer!')
            self.setState({ debug: 'Connected to peer!' })

            // const pkg = self._encode({cmd:'handshake', req_id:69, params:{fileserver_port:6969,protocol:'v1'}})
            const pkg = self._encode(this._handshakePkg())
            client.write(pkg)
        })

        // client.on('connect', function () {
        //     console.info('Connection opened.')
        //     self.setState({ debug: 'Connection opened.' })
        //
        //     /* Create encoded package. */
        //     // const pkg = self._encode(self._handshakePkg)
        //
        //     /* Send the handshake. */
        //     // self.client.send(pkg, function () {
        //     //     console.log('Sent handshake.')
        //     //     // console.log('sent handshake', pkg)
        //     // })
        // })

        client.on('error', function (error) {
            console.log(error)
            self.setState({ debug: error.toString() })
        })

        let called = 0
        client.on('data', function(_data) {
            try {
                /* Attempt to decode the data. */
                const decoded = self._decode(_data)

                console.log('Message was received', ++called, _data.length, _data, decoded)
                self.setState({ debug: 'received:\n' + _data.length + '\n\n' + JSON.stringify(decoded) })
            } catch (e) {
                console.error('Failed to decoded data', _data);
            }
        })

        client.on('close', function () {
            console.info('Connection closed.')
            self.setState({ debug: 'Connection closed.' })
        })
    }

    _handshakePkg() {
        const cmd = 'handshake'
        const request = { cmd }
        const req_id = this._addRequest(request)

        const crypt = null
        const crypt_supported = []
        // const crypt_supported = ['tls-rsa']
        const fileserver_port = 15441
        const protocol = 'v2'
        const port_opened = true
        const peer_id = this.state.peerId
        const rev = 2122
        const version = '0.5.6'
        const target_ip = this.state.hostIp

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

    _parseIp(_buf) {
        const ip = _buf.readUInt8(0) +
            '.' + _buf.readUInt8(1) +
            '.' + _buf.readUInt8(2) +
            '.' + _buf.readUInt8(3)

        return ip
    }

    _parsePort(_buf) {
        const port = (_buf.readUInt8(1) * 256) + _buf.readUInt8(0)

        return port
    }

    _handshake() {
        /* Initialize host port. */
        const hostPort = parseInt(this.hostPort)

        this.client.addr(this.hostIp).port(hostPort).connect()
    }

    _addRequest(_request) {
        if (!this.reqId)
            this.reqId = 0

        /* Initialize request id (auto-increment). */
        const reqId = this.reqId++

        this.requests[reqId] = _request

        /* Return the request id. */
        return reqId
    }

    _ping() {
        const cmd = 'ping'

        const request = { cmd }

        const req_id = this._addRequest(request)

        const pkg = {
            cmd,
            req_id,
            params: {}
        }

        /* Send request. */
        this.client.send(this._encode(pkg), function () {
            console.log('sent ping', pkg)
        })
    }

    _getFile() {
        const cmd = 'getFile'
        // const innerPath = 'index.html'
        const innerPath = 'content.json'
        const site = '1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'
        // const site = '1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F'

        const request = { cmd, innerPath, site }

        const req_id = this._addRequest(request)

        const inner_path = innerPath
        const location = 0
        const params = { site, inner_path, location }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        this.client.send(this._encode(pkg), function () {
            console.log('Sent request for [ %s ]', inner_path)
        })
    }

    _pex() {
        const cmd = 'pex'
        // const site = '1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'
        const site = '1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F'
        const peers = []
        const peers_onion = []
        const need = 5

        const request = { cmd, site, need }

        const req_id = this._addRequest(request)

        const params = { site, peers, peers_onion, need }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        this.client.send(this._encode(pkg), function () {
            console.log('Sent request for [ %s ]', cmd)
        })
    }

    _encode(msg) {
        const msgpack = require('zeronet-msgpack')()
        const encode = msgpack.encode

        return encode(msg)
    }

    _decode(msg) {
        const msgpack = require('zeronet-msgpack')()
        const decode = msgpack.decode

        return decode(msg)
    }

    _announce() {
        /* Localize this. */
        const self = this

        console.log('Announcing...')

        const Client = require('zeronet-tracker')

        const crypto = require('crypto')
        let shasum = crypto.createHash('sha1')
        shasum.update('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D')
        const infoHash = shasum.digest('hex')
        console.log('Info hash', infoHash)

        var requiredOpts = {
            infoHash,
            // infoHash: Buffer.from('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'),
            // infoHash: Buffer.from('37826C0C2ECC81F06B39C124DDA88E00E9D559D1'),
            peerId: this.peerId,
            announce: [
                // 'udp://tracker.coppersurfer.tk:6969',
                'udp://tracker.leechers-paradise.org:6969'
            ],
            port: 6881
        }

        // var optionalOpts = {
        //     getAnnounceOpts: function () {
        //         // Provide a callback that will be called whenever announce() is called
        //         // internally (on timer), or by the user
        //         return {
        //             uploaded: 0,
        //             downloaded: 0,
        //             left: 0,
        //             customParam: 'blah' // custom parameters supported
        //         }
        //     },
        //
        //     // RTCPeerConnection config object (only used in browser)
        //     rtcConfig: {},
        //
        //     // User-Agent header for http requests
        //     userAgent: '',
        //
        //     // Custom webrtc impl, useful in node to specify [wrtc](https://npmjs.com/package/wrtc)
        //     wrtc: {},
        // }

        var client = new Client(requiredOpts)

        client.on('error', function (err) {
            // fatal client error!
            console.log(err.message)
        })

        client.on('warning', function (err) {
            // a tracker was unavailable or sent bad data to the client. you can probably ignore it
            console.log(err.message)
        })

        // start getting peers from the tracker
        client.start()

        client.on('update', function (data) {
            console.log('got an announce response from tracker: ', data.announce)
            console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
        })

        client.once('peer', function (_address) {
            console.log('found a peer: ' + _address) // 85.10.239.191:48623

            const ipAddress = _address.split(':')[0]
            const port = _address.split(':')[1]

            const peer = { ipAddress, port }

            self.hostIp = ipAddress
            self.hostPort = port

            self._addPeerToDb(infoHash, peer)
        })

        // announce that download has completed (and you are now a seeder)
        // client.complete()

        // force a tracker announce. will trigger more 'update' events and maybe more 'peer' events
        // client.update()

        // provide parameters to the tracker
        // client.update({
        //     uploaded: 0,
        //     downloaded: 0,
        //     left: 0,
        //     customParam: 'blah' // custom parameters supported
        // })

        // stop getting peers from the tracker, gracefully leave the swarm
        // client.stop()

        // ungracefully leave the swarm (without sending final 'stop' message)
        // client.destroy()

        // scrape
        client.scrape()

        client.on('scrape', function (data) {
            console.log('got a scrape response from tracker: ', data.announce)
            console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
            // console.log('number of total downloads of this torrent: ', data.downloaded)
        })
    }

    // _initPeer() {
    //     /* Localize this. */
    //     const self = this
    //
    //     /* Initialize netcat client module. */
    //     const NetcatClient = require('netcat/client')
    //     this.client = new NetcatClient()
    //
    //     /* Initialize peer id. */
    //     const peerId = '-UT3530-FFFFFFFFFFFF'
    //     // const peerid = require('peerid')
    //     // this.peerId = peerid()
    //
    //     this.client.on('connect', function () {
    //         console.info('Connection opened.')
    //
    //         /* Create encoded package. */
    //         const pkg = self._encode(self._handshakePkg)
    //
    //         /* Send the handshake. */
    //         self.client.send(pkg, function () {
    //             console.log('Sent handshake.')
    //             // console.log('sent handshake', pkg)
    //         })
    //     })
    //
    //     this.client.on('close', function () {
    //         console.info('Connection closed.')
    //     })
    //
    //     this.client.on('error', function (err) {
    //         console.error('Error detected', err)
    //     })
    //
    //     // const parser = require('./ZeroNet/handleIncomingData').default
    //     this.client.on('data', function (data) {
    //         self.setState({ debug: data })
    //         // parser(self, data)
    //     })
    // }

    // _announce() {
    //     /* Localize this. */
    //     const self = this
    //
    //     // console.log('Announcing...')
    //     this.setState({ debug: 'Announcing...' })
    //
    //     const Client = require('zeronet-tracker')
    //
    //     const crypto = require('crypto')
    //     // const SHA = require('crypto-js/sha1')
    //     // console.log(SHA256("Message"))
    //
    //     let shasum = crypto.createHash('sha1')
    //     shasum.update('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D')
    //     // const infoHash = SHA('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D')
    //     const infoHash = shasum.digest('hex')
    //     console.log('Info hash', infoHash)
    //     this.setState({ debug: infoHash })
    //
    //     // return
    //
    //     /* Initialize peer id. */
    //     const peerId = '-UT3530-FFFFFFFFFFFF'
    //
    //     /* Initialize announce. */
    //     const announce = [
    //         // 'udp://tracker.coppersurfer.tk:6969',
    //         'udp://tracker.leechers-paradise.org:6969'
    //     ]
    //
    //     /* Initialize client port. */
    //     const port = 6881
    //
    //     var requiredOpts = {
    //         infoHash,
    //         peerId,
    //         announce,
    //         port
    //     }
    //
    //     // var optionalOpts = {
    //     //     getAnnounceOpts: function () {
    //     //         // Provide a callback that will be called whenever announce() is called
    //     //         // internally (on timer), or by the user
    //     //         return {
    //     //             uploaded: 0,
    //     //             downloaded: 0,
    //     //             left: 0,
    //     //             customParam: 'blah' // custom parameters supported
    //     //         }
    //     //     },
    //     //
    //     //     // RTCPeerConnection config object (only used in browser)
    //     //     rtcConfig: {},
    //     //
    //     //     // User-Agent header for http requests
    //     //     userAgent: '',
    //     //
    //     //     // Custom webrtc impl, useful in node to specify [wrtc](https://npmjs.com/package/wrtc)
    //     //     wrtc: {},
    //     // }
    //
    //     const client = new Client(requiredOpts)
    //
    //     client.on('error', function (err) {
    //         // fatal client error!
    //         console.log(err.message)
    //         return self.setState({ debug: err.message })
    //     })
    //
    //     client.on('warning', function (err) {
    //         // a tracker was unavailable or sent bad data to the client. you can probably ignore it
    //         console.log(err.message)
    //         return self.setState({ debug: err.message })
    //     })
    //
    //     // start getting peers from the tracker
    //     client.start()
    //
    //     client.on('update', function (data) {
    //         console.log('got an announce response from tracker: ', data.announce)
    //         console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
    //         return self.setState({ debug: 'number of seeders vs. leechers in the swarm: ' + data.complete + ' / ' + data.incomplete })
    //     })
    //
    //     client.once('peer', function (_address) {
    //         return self.setState({ debug: _address })
    //
    //         console.log('found a peer: ' + _address) // 85.10.239.191:48623
    //
    //         const ipAddress = _address.split(':')[0]
    //         const port = _address.split(':')[1]
    //
    //         const peer = { ipAddress, port }
    //
    //         self.hostIp = ipAddress
    //         self.hostPort = port
    //
    //         self._addPeerToDb(infoHash, peer)
    //     })
    //
    //     // announce that download has completed (and you are now a seeder)
    //     // client.complete()
    //
    //     // force a tracker announce. will trigger more 'update' events and maybe more 'peer' events
    //     // client.update()
    //
    //     // provide parameters to the tracker
    //     // client.update({
    //     //     uploaded: 0,
    //     //     downloaded: 0,
    //     //     left: 0,
    //     //     customParam: 'blah' // custom parameters supported
    //     // })
    //
    //     // stop getting peers from the tracker, gracefully leave the swarm
    //     // client.stop()
    //
    //     // ungracefully leave the swarm (without sending final 'stop' message)
    //     // client.destroy()
    //
    //     // scrape
    //     // client.scrape()
    //
    //     // client.on('scrape', function (data) {
    //     //     console.log('got a scrape response from tracker: ', data.announce)
    //     //     console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
    //     //     // console.log('number of total downloads of this torrent: ', data.downloaded)
    //     // })
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    debug: {
        padding: 15,
        backgroundColor: 'rgba(30, 30, 30, 0.2)'
    },
    debugText: {
        color: 'rgb(180, 30, 30)'
    }
})
