import React from 'react'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Shared,
    Styles
} from '../constants'

import {
    Dashboard,
    Welcome
} from '../screens/P0rtal'

@observer
export default class P0rtal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!stores.P0rtal.authorized) {
            return <Welcome componentId={ 'zeronet.P0rtal' } />
        }

        return <Dashboard componentId={ 'zeronet.P0rtal' } />
    }

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        id: 'zeronet.P0rtalTopBar',
                        name: 'zeronet.P0rtalTopBar'
                    }
                },
                visible: true,
                drawBehind: false
            }
        })
    }

    _cryptTest() {
        const self = this

        const bmCrypto = require("../lib/bitmessage/crypto")
        const Address = require('../lib/bitmessage/address')

        const testAddr = Address.fromPassphrase('LondynnLee')
        this._addLog('Deterministic Bitmessage address:', testAddr.encode())
        this._addLog('Deterministic Bitmessage tag:', testAddr.getTag())
        this._addLog('Deterministic Bitmessage tag (hex):', testAddr.getTag().toString('hex'))

        const signPrivateKey = testAddr.getEncPrivateKey()
        const signPublicKey = bmCrypto.getPublic(signPrivateKey)
        const encPrivateKey = testAddr.getEncPrivateKey()
        const encPublicKey = bmCrypto.getPublic(encPrivateKey)

        const pubkey = require("../lib/bitmessage/objects").pubkey
        const skipPow = true
        let ttl = 789
        let from = Address({ signPrivateKey, encPrivateKey })
        let to = from
        pubkey.encodeAsync({ ttl, from, to, skipPow })
            .then(function (_buf) {
                self._addLog('New Encoded Pubkey', _buf)
                self._bmApiCall('disseminatePubkey', _buf.toString('hex'))
                self._bmApiCall('getMessageDataByDestinationHash', testAddr.getTag().toString('hex'))
                self._bmApiCall('clientStatus')
            })

        const msg = require("../lib/bitmessage/objects").msg
        ttl = 111
        from = Address({ signPrivateKey, encPrivateKey })
        to = from
        // to = Address.decode('BM-2DB4fxbR62yJfDavZEy58b55C9E21mVY6k')
        const encoding = msg.SIMPLE
        const subject = 'ZE Message (toSelf) Test'
        const message = 'msg.encodeAsync({ ttl, from, to, encoding, subject, message, skipPow })'
        msg.encodeAsync({ ttl, from, to, encoding, subject, message, skipPow })
            .then(function (_buf) {
                self._addLog('New Encoded Message', _buf)
                self._bmApiCall('disseminatePreEncryptedMsg', _buf.toString('hex'))
            })
    }

    _bmApiCall(_method, _hexData) {
        /* Localize this. */
        const self = this

        const convert = require('xml-js')

        let params = []

        const _declaration = {
            _attributes: {
                version: '1.0',
                encoding: 'utf-8'
            }
        }

        const methodName = _method

        switch(methodName) {
            case 'add':
                params = [{
                    value: [{
                        int: 1000
                    }, {
                        int: 337
                    }]
                }]
                break
            case 'clientStatus':
                params = []
                break
            case 'disseminatePreEncryptedMsg':
                params = [{
                    value: [{
                        string: _hexData
                    }, {
                        int: 1000
                    }, {
                        int: 1000
                    }]
                }]
                break
            case 'disseminatePubkey':
                params = [{
                    value: [{
                        string: _hexData
                    }]
                }]
                break
            case 'getMessageDataByDestinationHash':
                params = [{
                    value: [{
                        string: _hexData
                    }]
                }]
                break
            case 'helloWorld':
                params = [{
                    value: [{
                        string: 'boogy'
                    }, {
                        string: 'woogy'
                    }]
                }]
                break
        }

        const methodCall = { methodName, params }

        const json = { _declaration, methodCall }

        const xml = convert.json2xml(json, { compact: true, spaces: 4 })

        const apiUsername = 'dev'
        const apiPassword = 'tester'
        const encoded = Buffer.from(`${apiUsername}:${apiPassword}`).toString('base64')

        const Authorization = `Basic ${encoded}`
        const Accept = 'text/xml'

        const method = 'POST'

        const headers = { Authorization, Accept, 'Content-Type': 'text/xml' }

        const body = xml

        const fetchTarget = 'http://159.65.111.48:8442'
        const fetchOptions = { method, headers, body }

        fetch(fetchTarget, fetchOptions)
            .then((response) => response.text())
            .then((xmlResponse) => {
                self._addLog('Fetched XML Response:', xmlResponse)
            })
            .catch((err) => {
                console.error(err)
            })
    }

}
