import './shim'
import React, { Component } from 'react'
import {
    Button,
    TextInput
} from 'react-native'
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

            <Button
              onPress={ this._test.bind(this) }
              title="Connect"
              color="#841584" />

            <Button
              onPress={ this._getFile.bind(this) }
              title="Get File"
              color="#841584" />

            <Button
              onPress={ this._ping.bind(this) }
              title="Ping"
              color="#841584" />

            <Button
              onPress={ this._pex.bind(this) }
              title="Peer Exchange"
              color="#841584" />
        </View>
    }

    componentDidMount() {
        // console.log('mounted')
        this.setState({ debug: 'mounted.' })

        this.client = null
        this.requests = []

        // this._test()
        // this._initPeer()
        // this._announce()
    }

    _test() {
        const self = this

        const net = require('net')
        console.log('net', net)
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

        this.client = net.createConnection(hostPort, hostIp, () => {
            // 'connect' listener
            console.log('Connected to peer!')
            self.setState({ debug: 'Connected to peer!' })

            const pkg = self._encode(this._handshakePkg())
            self.client.write(pkg)
        })

        // this.client.on('connect', function () {
        //     console.info('Connection opened.')
        //     self.setState({ debug: 'Connection opened.' })
        //
        //     /* Create encoded package. */
        //     // const pkg = self._encode(self._handshakePkg)
        //
        //     /* Send the handshake. */
        //     // self.client.write(pkg, function () {
        //     //     console.log('Sent handshake.')
        //     //     // console.log('sent handshake', pkg)
        //     // })
        // })

        this.client.on('error', function (error) {
            console.log(error)
            self.setState({ debug: error.toString() })
        })

        let called = 0
        this.client.on('data', function(_data) {
            try {
                /* Attempt to decode the data. */
                const decoded = self._decode(_data)

                console.log('Message #%d was received [%d bytes]', ++called, _data.length, _data, decoded)
                self.setState({ debug: 'received:\n' + _data.length + '\n\n' + JSON.stringify(decoded) })

                if (decoded.body) {
                    let body = decoded.body.toString()

                    console.log('check out my HTML body', body)
                }
            } catch (e) {
                console.log('Failed to decoded data', _data);
            }
        })

        this.client.on('close', function () {
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
        this.client.write(this._encode(pkg), function () {
            console.log('sent ping', pkg)
        })
    }

    _getFile() {
        const cmd = 'getFile'
        // const innerPath = 'index.html'
        const innerPath = 'content.json'
        // const site = '1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'
        const site = '1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F'

        const request = { cmd, innerPath, site }

        const req_id = this._addRequest(request)

        const inner_path = innerPath
        const location = 0
        const params = { site, inner_path, location }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        // const pkg = self._encode(this._handshakePkg())
        this.client.write(this._encode(pkg))

        // this.client.write(this._encode(pkg), function () {
        //     console.log('Sent request for [ %s ]', inner_path)
        // })
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
        this.client.write(this._encode(pkg), function () {
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
