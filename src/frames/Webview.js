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
        /* Localize this. */
        const self = this

        this._loadZite()

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

    _injectHtml(_html) {
        const html = _html
        const source = { html }

        this.setState({ source }, () => {
            console.log('HTML source has been injected by PEER!')

            // self._initJquery()
        })
    }

    _getHtml() {
        /* Localize this. */
        const self = this


        var path = RNFS.DocumentDirectoryPath + '/NEW_SAMPLE.html'

        // get a list of files and directories in the main bundle
        RNFS.readFile(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
            .then((html) => {
                const source = { html }
                self.setState({ source }, () => {
                    console.log('HTML source has been updated!')

                    // self._initJquery()
                })
            })
            .catch(error => {
                console.log('error', error)
            })
    }

    _testDownload() {
        const self = this
        // console.log('SAMPLE', require('../../SAMPLE.html'))

                const RNFS = require('react-native-fs')
        console.log('RNFS.DocumentDirectoryPath', RNFS.DocumentDirectoryPath)
                var path = RNFS.DocumentDirectoryPath + '/NEW_SAMPLE.html'

                // let options = {
                //     fromUrl: 'https://pastebin.com/raw/8zsMP4n4',
                //     toFile: path
                // }
                // console.log('options', options)
                // let result = RNFS.downloadFile(options)
                // // console.log('download result', result)
                // // console.log('Job Id', result.jobId)
                // result.promise.then(result => {
                //     console.log('Promise result', result)
                // })
                // .catch((err) => {
                //     if(err.description === "cancelled") {
                //         // cancelled by user
                //     }
                //     console.log(err)
                // })

                fetch('https://pastebin.com/raw/Eug7CPb8')  // without JavaScript
                // fetch('https://pastebin.com/raw/90masgPQ')  // with comment
                // fetch('https://pastebin.com/raw/Z12ABkLq') // without comment
                    .then(result => {
                        // return result.blob()
                        return result.text()
                    }).then(val => {
                        // console.log('fetch result text', val)

                        RNFS.writeFile(path, val, 'utf8')
                            .then((success) => {
                                console.log('FILE WRITTEN!')

                                self._getHtml()
                            })
                            .catch((err) => {
                                console.log(err.message)
                            })
                    })


    }

    async _loadZite() {
        /* Initailize Host0. */
        const host0 = new Host0(RNFS)
        console.log('host0', host0)

        /* Initailize Peer0. */
        // const peer0 = new Peer0(net)
        // console.log('peer0', peer0)

        // let content = await host0.getFile(this.tag, 'content.json')
        // console.log('host0 awaiting content.json', content)

        // if (content) {
        //     console.log('WHERE IS IT!!!!!!!')
        // } else {
            // let content = Peer0.getFile(net, this.tag, 'content.json', function (body) {
            //     console.log('CAME BACK WITH THIS BODY', body)
            // })
            let content = await Peer0.getFile(net, this.tag, 'content.json')
            // let content = await peer0.getFile(this.tag, 'content.json')
            console.log('peer0 awaiting content.json', content)
        // }



        return


        try {
            const config = JSON.parse(response)

            let jsonDisplay = JSON.stringify(config, null, 4)
            display = response.replace(/(?:\r\n|\r|\n)/g, '<br />')
            console.log('peer0 pretty display', display)
            source = { html: `<pre><code>${display}</code></pre>` }
            this.setState({ source })

            stores.Stage.updateZiteTitle(config.title)
        } catch (e) {
            source = { html: response }
            this.setState({ source })
        }
    }

    _loadWebview() {
        console.log('open webview')

        // Navigation.showModal({
        //   stack: {
        //     children: [{
        //       component: {
        //         name: 'zeronet.Webview',
        //         passProps: {
        //           text: 'stack with one child'
        //         },
        //         options: {
        //             topBar: {
        //                 visible: false,
        //                 // animate: false,
        //                 drawBehind: true
        //             }
        //         }
        //       }
        //     }]
        //   }
        // })

        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.Webview',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    }
                }
            }
        })
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
