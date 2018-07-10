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

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import { Button } from 'react-native-elements'

import Timer from 'react-native-timer'

@observer
class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)

        /* Initialize a reference to the webview. */
        this._webview = null

        console.log('Webview received props', props)

        const source = { html: '<h1>loading...</h1>' }
        this.state = {
            debug: 'loading...',
            source
        }

    }

    @observable source = { html: '<h1>loading...</h1>' }

    _authorize = () => {
        stores.Counter.authorize()
        // this.authorized = true

        const { Counter } = this.props
        stores.Counter.setP0rtalTitle('Authorized!')
    }

    render() {
        //onMessage={ this._onMessage.bind(this) }
        return <View style={ styles.container }>
            <WebView
                ref={ ref => (this._webview = ref) }
                source={ this.state.source }
                javaScriptEnabled={ true }
                injectedJavaScript={ this._injectedJs() }
                onLoadStart={ this._loadStarted }
                onNavigationStateChange={ (navEvent) => console.log('onNavigationStateChange', navEvent.jsEvaluationValue) }
                onMessage={ (event) => console.log('onMessage', event.nativeEvent.data) }
                style={ styles.webview } />

            <View style={ styles.footer }>
                <Button
                    title='<'
                    style={ styles.footerButton } />

                <Button
                    title='>'
                    style={ styles.footerButton } />

                <Button
                    title='History'
                    style={ styles.footerButton } />
            </View>
        </View>
    }

    componentWillUnmount() {
        Timer.clearTimeout(this)
    }

    componentDidMount() {
        /* Localize this. */
        const self = this

        console.info('Webview has loaded.')
        // this._goDownload()

        /* Initialize jQuery (and then subsequent libraries). */
        this._initJquery()

        // this._testDownload()
        this._getHtml()

        // this._listFiles()
        Timer.setInterval(this, 'test10Interval', () => {
            console.log('this is a 10sec Timer.setInterval, :)')
        }, 10000)

        Timer.setTimeout(this, 'testInjector', () => {
            console.log('testInjector');
                self._debugLog(self, `jquery is working!!`)
            // this._webview.injectJavaScript(`window.postMessage('anywhere hear me?!?')`)
        }, 5000)

        // console.log('triple 3', peer0.triple(3))
        // const net = require('net')
        // console.log('net', net)

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        id: 'myDynamicButton',
                        title: 'My Button'
                    }
                ]
            }
        })

    }

    _debugLog(_ctx, _entry) {
        _ctx._webview.injectJavaScript(`$("#debug_output").html($("#debug_output").html() + '<p>${_entry}</p>')`)
    }

    _initJquery() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/jquery.js'

        fetch('https://pastebin.com/raw/Cbx4VPD6')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('jQuery successfully injected');
                        try {
                            self._debugLog(self, `jQuery successfully injected`)
                        } catch (e) {
                            console.log(e);
                        }
                        self._initIdenticon()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initIdenticon() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/identicon.js'

        fetch('https://pastebin.com/raw/32x72c2K')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Identicon successfully injected');
                        self._debugLog(self, `Identicon successfully injected`)
                        self._initMarked()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initMarked() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/marked.js'

        fetch('https://pastebin.com/raw/C6Ln7Sp3')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Marked successfully injected');
                        self._debugLog(self, `Marked successfully injected`)
                        self._initPngLib()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initPngLib() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/pnglib.js'

        fetch('https://pastebin.com/raw/57FZ6thh')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('PngLib successfully injected');
                        self._debugLog(self, `PngLib successfully injected`)
                        self._initClass()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initClass() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/Class.js'

        fetch('https://pastebin.com/raw/BsQabK6M')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Class successfully injected');
                        self._debugLog(self, `Class successfully injected`)
                        self._initText()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initText() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/Text.js'

        fetch('https://pastebin.com/raw/0G8fgLn8')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Text successfully injected');
                        self._debugLog(self, `Text successfully injected`)
                        self._initTime()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initTime() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/Time.js'

        fetch('https://pastebin.com/raw/kfjK1VPU')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Time successfully injected');
                        self._debugLog(self, `Time successfully injected`)
                        // self._initNext()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _injectTest() {
        console.log('_injectTest');
        this._webview.injectJavaScript(`alert('see me comin?')`)
        console.log('alert injected, did you see it?');
    }

    _loadStarted() {
        console.log('_loadStarted');
        return `alert('loading started!')`
    }

    _navStateChange(_event) {
        console.log('_navStateChange event', _event.jsEvaluationValue)
    }

    _onMessage(_data) {
        console.log('ON MESSAGE RECEIVED', _data);
    }

    _injectedJs() {
        return ``
        // return `alert('this was injected')`
    }

    _getHtml() {
        /* Localize this. */
        const self = this

        // require the module
        var RNFS = require('react-native-fs');

        var path = RNFS.DocumentDirectoryPath + '/NEW_SAMPLE.html'

        // get a list of files and directories in the main bundle
        RNFS.readFile(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
          .then((html) => {
              // console.log('file html', html);
              // html = `<h3>hey you AGAIN!</h3>`
              const source = { html }
              self.setState({ source }, () => {
                  console.log('HTML source has been updated!');
              })
          })
          .catch(error => {
              console.log('error', error);
          })

    }

    async _listFiles() {
        // require the module
        var RNFS = require('react-native-fs');

        // get a list of files and directories in the main bundle
        RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
          .then((result) => {
            console.log('GOT RESULT', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
          })
          .then((statResult) => {
            if (statResult[0].isFile()) {
              // if we have a file, read it
              return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
          })
          .then((contents) => {
            // log the file contents
            console.log(contents);
          })
          .catch((err) => {
            console.log(err.message, err.code);
          })
    }

    _testDownload() {
        const self = this
        // console.log('SAMPLE', require('../../SAMPLE.html'));

                const RNFS = require('react-native-fs')
        console.log('RNFS.DocumentDirectoryPath', RNFS.DocumentDirectoryPath);
                var path = RNFS.DocumentDirectoryPath + '/NEW_SAMPLE.html'

                // let options = {
                //     fromUrl: 'https://pastebin.com/raw/8zsMP4n4',
                //     toFile: path
                // }
                // console.log('options', options);
                // let result = RNFS.downloadFile(options)
                // // console.log('download result', result);
                // // console.log('Job Id', result.jobId);
                // result.promise.then(result => {
                //     console.log('Promise result', result);
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
                        // console.log('fetch result text', val);

                        RNFS.writeFile(path, val, 'utf8')
                            .then((success) => {
                                console.log('FILE WRITTEN!');

                                self._getHtml()
                            })
                            .catch((err) => {
                                console.log(err.message);
                            })
                    })


    }

    async _goDownload() {
        const net = require('net')
        const peer0 = require('peer0')

        console.log('Making download request from Peer0')

        let response = await peer0.download(net)
        console.log('peer0 awaiting response', response)

        this.setState({ debug: response })

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

    _removeButton() {
        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: []
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

export default WelcomeScreen
