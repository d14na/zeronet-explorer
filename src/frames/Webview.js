import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    WebView
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import { Button } from 'react-native-elements'

import Timer from 'react-native-timer'

import Host0 from '../lib/host0'
import Peer0 from '../lib/peer0'
// import Host0 from 'host0'
// import Peer0 from 'peer0'

import net from 'net'
import RNFS from 'react-native-fs'

import {
    Shared,
    Styles
} from '../constants'

@observer
export default class Webview extends React.Component {
    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('WEBVIEW_')

        this._loadStarted = this._loadStarted.bind(this)
        this._loadEnded = this._loadEnded.bind(this)
        this._navStateChange = this._navStateChange.bind(this)
        this._onMessage = this._onMessage.bind(this)
        this._btnBack = this._btnBack.bind(this)
        this._btnClose = this._btnClose.bind(this)
        this._getSource = this._getSource.bind(this)
        this._loadZite = this._loadZite.bind(this)

        /* Initialize a reference to the webview. */
        this._webview = null

        /* Set the tag. */
        this.tag = props.tag

        this.state = {
            source: { html: '<h1>loading...</h1>' }
        }
    }

    @observable _hasLoadEnded = false
    // FIXME How do we use the store without locking the observable??
    // @observable source = { html: '<h1>loading...</h1>' }

    render() {
        return <View style={ styles.container }>
            <WebView
                ref={ ref => (this._webview = ref) }
                source={ this.state.source }
                style={ styles.webview }
                javaScriptEnabled={ true }
                mixedContentMode='always'
                onLoadStart={ this._loadStarted }
                onLoadEnd={ this._loadEnded }
                onNavigationStateChange={ this._navStateChange }
                onMessage={ this._onMessage } />

            <View style={ styles.footer }>
                <Button
                    title='<'
                    style={ styles.footerButton }
                    onPress={ this._btnBack } />

                <Button
                    title='>'
                    style={ styles.footerButton } />

                <Button
                    title='Close'
                    style={ styles.footerButton }
                    onPress={ this._btnClose } />
            </View>
        </View>
    }

    componentWillUnmount() {
        Timer.clearTimeout(this)
    }

    componentDidMount() {
        /* Initialize the zite. */
        // this._initZite()

        // this._loadZite()
        // this._getZiteInfo()

        // Timer.setInterval(this, 'test10Interval', () => {
        //     console.log('this is a 10sec Timer.setInterval, :)')
        // }, 10000)
    }

    _getSource() {
        // NOTE We need to clone this to avoid RN freezing the object
        // https://github.com/mobxjs/mobx/blob/master/CHANGELOG.md#known-issues
        return { ...this.source }
    }

    _btnClose() {
        console.log('pressed close button')

        /* Close the webview. */
        Navigation.popToRoot('zeronet.Startup')
            .catch(console.log)
    }

    _btnBack() {
        console.log('pressed Webview back button')

        /* Close the webview. */
        Navigation.popTo('zeronet.Startup')
            .catch(console.log)
    }

    _onMessage() {
        // TODO Update this stub
    }

    _injectTest() {
        console.log('_injectTest')

        this._webview.injectJavaScript(`alert('see me comin?')`)

        console.log('alert injected, did you see it?')
    }

    _loadStarted() {
        console.log('_loadStarted')
    }

    _loadEnded() {
        console.log('_loadEnded')
    }

    _navStateChange(_event) {
        // console.log('_navStateChange event', _event)

        // console.log('_navStateChange Page Title' , _event.title)

        if (_event.loading === false && _event.title === 'ZeroBlog Demo') {
            // if (!this._hasLoadEnded) {
                // this._hasLoadEnded = true

                // this._initJquery()
            // }
        }
    }

    async _initZite() {
        /* Initialize caching flag. */
        const noCache = false

        /* Retrieve content.json from remote. */
        let content = await this._loadFile(this.tag, 'content.json', noCache)
            .catch(err => { throw err })

        /* Convert to string. */
        content = Buffer.from(content).toString('utf8')

        try {
            /* Parse the JSON. */
            const config = JSON.parse(content)
            console.log('CONFIG', config)

            /* Update the stage title. */
            stores.Stage.updateZiteTitle(config.title)

            // TODO Nicely format config details
            stores.Stage.addDebugLog('Address', config['address'])

            stores.Stage.addDebugLog('Background Color', config['background-color'])
            stores.Stage.setBackgroundColor(config['background-color'])

            stores.Stage.addDebugLog('Description', config['description'])
            stores.Stage.addDebugLog('Modified', config['modified'])
            stores.Stage.addDebugLog('ZeroNet Version', config['zeronet_version'])

            /* Initialize files holder. */
            const files = config['files']

            /* Retrieve the file keys (filenames). */
            const fileList = Object.keys(files)

            stores.Stage.addDebugLog('# Files', fileList.length)
            stores.Stage.addDebugLog('Files', JSON.stringify(files, null, '  '))

            for (let file of fileList) {
                /* Retrieve file details. */
                const details = files[file]
                const sha512 = details['sha512']
                const size = details['size']
                console.log('DETAILS', details, sha512, size)

                /* Retrieve file from remote. */
                content = await this._loadFile(this.tag, file, details)
                    .catch(err => { throw err })
                console.log('READ %s [%d bytes]', file, content.length, content)

                const hash = this._sha512(content)
                const checksum = hash.slice(0, 32) // checksum uses 1/2 of sha512
                console.log('%s CHECKSUM', file, checksum.toString('hex'), checksum)
                stores.Stage.addDebugLog(file + ' checksum', checksum.toString('hex'))

                /* Convert to string. */
                // content = Buffer.from(content).toString('utf8')

                break
            }

        } catch (e) {
            /* Something has gone wrong if we cannot parse the content.json. */
            // FIXME Handle this better in the UI
            throw e
        }

        /* Return a promise with the content. */
        // return new Promise(function (resolve, reject) {
        //     resolve(content)
        // })
    }

    async _getZiteInfo(_tag) {
        /* Initailize Host0. */
        const host0 = new Host0(RNFS)
        console.log('host0', host0)

        let content = await host0.listFiles(_tag)
        console.log('host0 awaiting file list', content)

        /* Return a promise with the content. */
        // return new Promise(function (resolve, reject) {
        //     resolve(content)
        // })
    }

    async _loadFile(_tag, _path, _metaData=null) {
        /* Initailize Host0. */
        const host0 = new Host0(RNFS)

        /* Initailize Peer0. */
        const peer0 = new Peer0(net)

        /* Initialize content holder. */
        let content = null

        /* Retrieve the content from host (if cached). */
        if (_metaData && _metaData.sha512 && _metaData.size) {
            content = await host0.getFile(_tag, _path, _metaData)
        } else {
            content = null
        }

        /* Retrieve the content from peer. */
        if (!content) {
            content = await peer0.getFile(_tag, _path, 0, 89453)

            /* Save the content to disk. */
            if (_metaData && _metaData.sha512 && _metaData.size) {
                await host0.saveFile(_tag, _path, content, _metaData)
            }
        }

        /* Return a promise with the content. */
        return new Promise(function (resolve, reject) {
            resolve(content)
        })
    }

    async _loadZite() {
        /* Initailize Host0. */
        const host0 = new Host0(RNFS)
        console.log('host0', host0)

        /* Initailize Peer0. */
        // const peer0 = new Peer0(net)
        // console.log('peer0', peer0)

        // let content = await host0.listFiles(this.tag)
        // console.log('host0 awaiting file list', content)

        let content = await host0.getFile(this.tag, 'index.html')
        // console.log('host0 awaiting index.html', content)

        if (!content) {
            let content = await Peer0.getFile(net, this.tag, 'index.html')
            // let content = await peer0.getFile(this.tag, 'index.html')
            console.log('peer0 awaiting index.html', content)

            let saved = await host0.saveFile(this.tag, 'index.html', content)
            // console.log('peer0 awaiting SAVED index.html', saved)
        }

        try {
            /* Test for JSON. */
            const config = JSON.parse(content)

            let jsonDisplay = JSON.stringify(config, null, 4)
            display = content.replace(/(?:\r\n|\r|\n)/g, '<br />')
            source = { html: `<pre><code>${display}</code></pre>` }
            this.setState({ source })
        } catch (e) {
            // console.log('FAILED TO PARSE JSON', e)

            // let img = await this._loadFile(this.tag, 'images/project.png')
            let img = await this._loadFile(this.tag, 'images/icon.png')
            img = Buffer.from(img).toString('base64')
            let imgData = 'data:' + 'image/png' + ';base64,' + img
            // let imgData = 'data:' + 'image/png' + ';base64,' + new Buffer(img).toString('base64')
            console.log('IMGDATA', img.length, imgData.length)
            // content = content.replace('images/icon.png', 'data:image/gif;base64,R0lGOD lhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr 6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX 13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsB tKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoTh CKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0DkgcEIQA7')
            content = content.replace('images/icon.png', imgData)


            content = content.replace('/d14na.bit/privacy.html', 'index.html')


            const baseUrl = RNFS.DocumentDirectoryPath + '/' + this.tag + '/'
            // const baseUrl = RNFS.DocumentDirectoryPath + '/' + this.tag + '/'
            console.log('BASEURL', baseUrl, content)

            source = { html: content, baseUrl }
            // source = { html: content }
            this.setState({ source })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1,
        width: '100%',
        // height: '100%'
    },
    footer: {
        flexDirection: 'row',
        width: 350,
        height: 50
    },
    footerButton: {
        flex: 1,
        width: 100
    }
})
