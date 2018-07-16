import '../../shim'

import React from 'react'

import {
    // Button,
    StyleSheet,
    ScrollView,
    Text,
    View,
    WebView
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { Client } from 'bugsnag-react-native'

import Amplitude from 'amplitude'

import {
    Button,
    SearchBar
} from 'react-native-elements'

/**
 * Main Frame
 *
 * Manages the initialization of the application.
 */
export default class MainFrame extends React.Component {
    constructor(props) {
        super(props)

        console.log('Main Frame received props', props)

        const bugsnag = new Client()
        // bugsnag.notify(new Error("TEST: First error"))

        const amplitude = new Amplitude('beadb78ade3fd20e320417ed123488b4')

        var data = {
          event_type: 'APP_INIT',
          user_id: 'test-id'
        }
        amplitude.track(data)

        this.state = {
            debug: 'loading...'
        }
    }

    render() {
        const source = {
            uri: 'https://github.com/d14na/zeronet-explorer/'
        }

        return <ScrollView>
            <View style={ styles.container }>
                <SearchBar
                    ref={ search => this.search = search }
                    icon={{ type: 'font-awesome', name: 'search' }}
                    clearIcon={{ color: 'rgba(220, 90, 90, 0.35)', type: 'font-awesome', name: 'times-circle', style: { marginRight: 5 } }}
                    inputStyle={{ paddingLeft: 40, paddingBottom: 9 }}
                    placeholder='Looking for something interesting?' />

                <View style={ styles.contentContainer }>
                    <View style={{ flexDirection: 'row', height: 100 }}>
                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._loadZite.bind(this)('github') }
                            icon={{name: 'globe', type: 'font-awesome'}}
                            title='GitHub' />

                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._loadZite.bind(this)('guide') }
                            icon={{name: 'fire', type: 'font-awesome'}}
                            title='Zer0net 101' />
                    </View>

                    <View style={{ flexDirection: 'row', height: 100 }}>
                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._loadZite.bind(this)('zitetags') }
                            icon={{name: 'globe', type: 'font-awesome'}}
                            title='#Zitetags' />

                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._loadZite.bind(this)('blog') }
                            icon={{name: 'book', type: 'font-awesome'}}
                            title='Blog' />
                    </View>

                    <View style={{ flexDirection: 'row', height: 100 }}>
                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ this._pex.bind(this) }
                            icon={{name: 'globe', type: 'font-awesome'}}
                            title='Peer Exchange' />

                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._getFile.bind(this)('1ZTAGS56qz1zDDxW2Ky19pKzvnyqJDy6J') }
                            icon={{name: 'book', type: 'font-awesome'}}
                            title='Zitetags' />
                    </View>

                    <View style={{ flexDirection: 'row', height: 100 }}>
                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._getFile.bind(this)('1CHESSgbNoLEvQzdSW1yreen7VxvRDk3uA') }
                            icon={{name: 'globe', type: 'font-awesome'}}
                            title='Chess' />

                        <Button
                            large
                            style={{ flex: 1, width: 150 }}
                            onPress={ () => this._getFile.bind(this)('1HeLLoyevpjZTp3pPDWkhWUNtTszN9ZzkA') }
                            icon={{name: 'book', type: 'font-awesome'}}
                            title='Hello Zero' />
                    </View>

                    <View style={{ margin: 20, padding: 20, backgroundColor: 'rgba(30, 120, 60, 0.2)'}}>
                        <Text style={{ fontStyle: 'italic' }}>
                            { this.state.debug }
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    }

    componentDidMount() {
        this.client = null
        this.requests = []

        /* Initialize the payload. */
        // payload = null


        this._test()
    }

    _test() {
        const self = this

        const net = require('net')
        console.log('net', net)
        // OR, if not shimming via package.json "browser" field:
        // var net = require('react-native-tcp')

        const hostIp = '178.128.8.225'
        const hostPort = 13312

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
        let payload = null

        this.client.on('data', function(_data) {
            if (payload) {
                payload = Buffer.concat([payload, _data])
            } else {
                payload = _data
            }

            try {
                /* Attempt to decode the data. */
                const decoded = self._decode(payload)

                console.log('Message #%d was received [%d bytes]', ++called, _data.length, _data, decoded)
                self.setState({ debug: 'received:\n' + _data.length + '\n\n' + JSON.stringify(decoded) })

                /* Initialize request. */
                let request = null

                /* Retrieve the request id. */
                if (decoded.to !== null) {
                    const reqId = decoded.to
                    console.log('Decoded reqId', reqId)

                    /* Retrieve the request. */
                    request = self.requests[reqId]
                    console.log('Decoded request', request)
                }

                if (decoded.cmd === 'response' && decoded.error) {
                    console.error(decoded.error)

                    // clear the payload
                    payload = null

                    // delete the request cmd
                    delete request.cmd
                }

                if (decoded.cmd === 'response' && request.cmd === 'handshake') {
                    console.info('Handshake completed successfully!')
                    self.setState({ debug: 'Handshake completed successfully!' })

                    // clear the payload
                    payload = null
                }

                if (decoded.cmd === 'response' && request.cmd === 'ping') {
                    console.info('Ping completed successfully!')
                    self.setState({ debug: 'Ping completed successfully!' })

                    // clear the payload
                    payload = null
                }

                if (decoded.cmd === 'response' && request.cmd === 'getFile') {
                    /* Retrieve file type. */
                    const fileType = request.innerPath.split('.').pop()

                    if (fileType === 'json') {
                        let body = JSON.parse(decoded.body)

                        console.log('check out my JSON body', body)
                        self.setState({ debug: body })

                        let description = body.description
                        console.log('Description', description)
                    }

                    if (fileType === 'html') {
                        let body = decoded.body.toString()

                        console.log('check out my HTML body', body)
                        self.setState({ debug: body })

                        Navigation.push('zeronet.Main', {
                            component: {
                                id: 'zeronet.Webview',
                                name: 'zeronet.Webview',
                                options: {
                                    topBar: {
                                        visible: false,
                                        animate: false,
                                        drawBehind: true
                                    }
                                },
                                passProps: { html: body }
                            }
                        })

                    }

                    // clear the payload
                    payload = null
                }

                if (decoded.cmd === 'response' && request.cmd === 'pex') {
                    let peers = decoded.peers
                    // let peers = JSON.parse(decoded.peers)
                    console.log('check out my PEX peers', peers)

                    for (let i = 0; i < peers.length; i++) {
                        console.log('peer', peers[i].length, peers[i])

                        const ipBuffer = Buffer.from(peers[i])

                        if (ipBuffer.length === 6) {
                            console.log('#%d IP', i, ipBuffer.slice(0, 4))
                            console.log('#%d Port', i, ipBuffer.slice(-2))

                            const peer = {
                                ip: self._parseIp(ipBuffer.slice(0, 4)),
                                port: self._parsePort(ipBuffer.slice(-2))
                            }
                            console.log('PEX Peer (buffer)', peer)
                            self.setState({ debug: peer })

                            self.hostIp = peer.ip
                            self.hostPort = peer.port
                        }
                    }

                    // clear the payload
                    payload = null
                }

                if (decoded && payload !== null) {
                    console.error('FAILED TO RECOGNIZE -- clearing payload')
                    console.log('DECODED', decoded)
                    console.log('PAYLOAD', payload)
                    self.setState({ debug: 'FAILED TO RECOGNIZE -- clearing payload' })

                    // clear the payload
                    payload = null
                }

                // if (decoded.body) {
                //     let body = decoded.body.toString()
                //
                //     console.log('check out my HTML body', body)
                // }
                //
                // if (decoded.cmd === 'response' && decoded.peers) {
                // // if (decoded.cmd === 'response' && request.cmd === 'pex') {
                //     let peers = decoded.peers
                //     // let peers = JSON.parse(decoded.peers)
                //     console.log('check out my PEX peers', peers)
                //
                //     for (let i = 0; i < peers.length; i++) {
                //         const ipBuffer = Buffer.from(peers[i])
                //
                //         console.log('peer', ipBuffer.length, peers[i])
                //
                //         if (ipBuffer.length === 6) {
                //             console.log('#%d IP', i, ipBuffer.slice(0, 4))
                //             console.log('#%d Port', i, ipBuffer.slice(-2))
                //
                //             const peer = {
                //                 ip: self._parseIp(ipBuffer.slice(0, 4)),
                //                 port: self._parsePort(ipBuffer.slice(-2))
                //             }
                //             console.log('PEX Peer (buffer)', peer)
                //
                //             self.hostIp = peer.ip
                //             self.hostPort = peer.port
                //         } else {
                //             console.info('FAILED: buffer length <> 6')
                //             console.info('ip/port', self._parseIp(peers[i]), self._parsePort(peers[i]));
                //         }
                //     }
                //
                //     // clear the payload
                //     payload = null
                // }

            } catch (e) {
                console.log('Failed to decode data', _data, e);
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

    _parseIp(_peer) {
        const ipBuffer = Buffer.from(_peer)

        const buf = ipBuffer.slice(0, 4)
        console.log('_parseIp', buf)

        const ip = buf.readUInt8(0) +
            '.' + buf.readUInt8(1) +
            '.' + buf.readUInt8(2) +
            '.' + buf.readUInt8(3)

        return ip
    }

    _parsePort(_peer) {
        const ipBuffer = Buffer.from(_peer)

        const buf = ipBuffer.slice(4, 6)
        console.log('_parsePort', buf)

        const port = (buf.readUInt8(1) * 256) + buf.readUInt8(0)

        return port
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

    _getFile(_target) {
        const cmd = 'getFile'
        const innerPath = 'index.html'
        // const innerPath = 'content.json'
        // const site = '1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'
        // const site =
        // const site = ''
        const site = _target

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
        console.log('start PEX...');
        const cmd = 'pex'
        const site = '1ZTAGS56qz1zDDxW2Ky19pKzvnyqJDy6J'
        const peers = []
        const peers_onion = []
        const need = 10

        const request = { cmd, site, need }

        const req_id = this._addRequest(request)

        const params = { site, peers, peers_onion, need }

        const pkg = { cmd, req_id, params }

        /* Send request. */
        this.client.write(this._encode(pkg), function () {
            console.log('Sent request for [ %s ]', cmd)
        })
    }

    _encode(_msg) {
        const msgpack = require('zeronet-msgpack')()
        const encode = msgpack.encode

        return encode(_msg)
    }

    _decode(_msg) {
        const msgpack = require('zeronet-msgpack')()
        const decode = msgpack.decode

        return decode(_msg)
    }

    onNavigationButtonPressed(_buttonId) {
        console.log('onNavigationButtonPressed', _buttonId)

        if (_buttonId === 'btnP0rtal') {
            this._openP0rtal()
        }
    }

    async _goDownload() {
        const net = require('net')
        const peer0 = require('peer0')

        console.log('Making download request from Peer0')

        let response = await peer0.download(net)
        console.log('peer0 awaiting response', response)

        this.setState({ debug: response })

    }

    _loadZite(_target) {
        console.log('load webview with target', _target)

        this._findPeers()

        return

        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.Webview',
                name: 'zeronet.Webview',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    }
                },
                passProps: { ziteTag: _target }
            }
        })
    }

    _openP0rtal() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                right: {
                    visible: true
                }
            }
        })
    }

    _findPeers() {

    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        padding: 20
    }
})
