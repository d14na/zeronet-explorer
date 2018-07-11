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

    @observable _hasLoadEnded = false
    @observable source = { html: '<h1>loading...</h1>' }

    _authorize = () => {
        stores.Counter.authorize()
        // this.authorized = true

        const { Counter } = this.props
        stores.Counter.setP0rtalTitle('Authorized!')
    }

    render() {
        return <View style={ styles.container }>
            <WebView
                ref={ ref => (this._webview = ref) }
                source={ this.state.source }
                style={ styles.webview }
                javaScriptEnabled={ true }
                mixedContentMode='always'
                onLoadStart={ this._loadStarted.bind(this) }
                onLoadEnd={ this._loadEnded.bind(this) }
                onNavigationStateChange={ (navEvent) => console.log('onNavigationStateChange', navEvent.jsEvaluationValue) }
                onMessage={ this._onMessage.bind(this) } />

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
        // this._initJquery()

        // this._testDownload()
        this._getHtml()

        // this._listFiles()
        Timer.setInterval(this, 'test10Interval', () => {
            console.log('this is a 10sec Timer.setInterval, :)')
        }, 10000)

        // Timer.setTimeout(this, 'testPostMessage', () => {
        //     console.log('postMessage');
        //     self._webview.injectJavaScript(`window.postMessage('can anyone hear me?!?')`)
        // }, 8000)

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
                        console.info('jQuery successfully injected');
                        self._debugLog(self, `jQuery successfully injected`)

                        self._initIdenticon()

                        // Timer.setTimeout(self, 'testJquery', () => {
                        //     self._debugLog(self, `jQuery is STILL working after all this time [5sec]`)
                        //     self._testPastebin()
                        // }, 5000)
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
                        console.info('Identicon successfully injected');
                        // self._debugLog(self, `Identicon successfully injected`)
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
                        console.info('Marked successfully injected');
                        // self._debugLog(self, `Marked successfully injected`)
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
                        console.info('PngLib successfully injected');
                        // self._debugLog(self, `PngLib successfully injected`)
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
                        console.info('Class successfully injected');
                        // self._debugLog(self, `Class successfully injected`)
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
                        console.info('Text successfully injected');
                        // self._debugLog(self, `Text successfully injected`)
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
                        console.info('Time successfully injected');
                        // self._debugLog(self, `Time successfully injected`)
                        self._initZeroFrame()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initZeroFrame() {
        /* Localize this. */
        const self = this

        let val = `
        window.postMessage('hi, from OUTSIDE ZeroFrame');
        (function() {
          var ZeroFrame,
            __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
            __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
            __hasProp = {}.hasOwnProperty;

          ZeroFrame = (function(_super) {
            __extends(ZeroFrame, _super);

            function ZeroFrame(url) {
              this.onCloseWebsocket = __bind(this.onCloseWebsocket, this);
              this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
              this.onRequest = __bind(this.onRequest, this);
              this.onMessage = __bind(this.onMessage, this);
              this.url = url;
              this.waiting_cb = {};
              this.connect();
              this.next_message_id = 1;
              this.init();
            }

            ZeroFrame.prototype.init = function() {
              return this;
            };

            ZeroFrame.prototype.connect = function() {
              this.target = window;
              /* this.target = window.parent; */
              window.addEventListener("message", this.onMessage, false);
              return this.cmd("innerReady");
            };

            ZeroFrame.prototype.onMessage = function(e) {
              var cmd, message;
              message = e.data;
              cmd = message.cmd;
              if (cmd === "response") {
/* window.postMessage('WEBVIEW ONMESSAGE | ' + typeof(e) + ' | ' + JSON.stringify(e)); */
                if (this.waiting_cb[message.to] != null) {
                  return this.waiting_cb[message.to](message.result);
                } else {
                  return this.log("Websocket callback not found:", message);
                }
              } else if (cmd === "wrapperReady") {
                return this.cmd("innerReady");
              } else if (cmd === "ping") {
                return this.response(message.id, "pong");
              } else if (cmd === "wrapperOpenedWebsocket") {
                return this.onOpenWebsocket();
              } else if (cmd === "wrapperClosedWebsocket") {
                return this.onCloseWebsocket();
              } else {
                return this.onRequest(cmd, message);
              }
            };

            ZeroFrame.prototype.onRequest = function(cmd, message) {
              return this.log("Unknown request", message);
            };

            ZeroFrame.prototype.cmd = function(cmd, params, cb) {
              if (params == null) {
                params = {};
              }
              if (cb == null) {
                cb = null;
              }
              return this.send({
                "cmd": cmd,
                "params": params
              }, cb);
            };

            ZeroFrame.prototype.send = function(message, cb) {
              if (cb == null) {
                cb = null;
              }
              message.id = this.next_message_id;
              this.next_message_id += 1;

              window.postMessage(JSON.stringify(message));
              /* this.target.postMessage(message, "*"); */
              if (cb) {
                return this.waiting_cb[message.id] = cb;
              }
            };

            ZeroFrame.prototype.onOpenWebsocket = function() {
              return this.log("Websocket open");
            };

            ZeroFrame.prototype.onCloseWebsocket = function() {
              return this.log("Websocket close");
            };

            return ZeroFrame;

          })(Class);

          window.ZeroFrame = ZeroFrame;

        }).call(this);
        `
        self._webview.injectJavaScript(val)
        console.info('ZeroFrame successfully injected');
        // self._debugLog(self, `ZeroFrame successfully injected`)
        self._initZeroBlog()

        return

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/ZeroFrame.js'

        fetch('https://pastebin.com/raw/PWjUFVsA')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.info('ZeroFrame successfully injected');
                        // self._debugLog(self, `ZeroFrame successfully injected`)
                        self._initZeroBlog()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _initZeroBlog() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/ZeroBlog.js'

        fetch('https://pastebin.com/raw/WqYH9exp')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.info('ZeroBlog successfully injected');
                        self._debugLog(self, `ZeroBlog successfully injected`)
                        // self._initNext()
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            })
    }

    _testPastebin() {
        /* Localize this. */
        const self = this

        const RNFS = require('react-native-fs')
        var path = RNFS.DocumentDirectoryPath + '/Pastebin.js'

        fetch('https://pastebin.com/raw/AAmuGGXP')
            .then(result => result.text())
            .then(val => {
                RNFS.writeFile(path, val, 'utf8')
                    .then((success) => {
                        self._webview.injectJavaScript(val)
                        console.log('Pastebin successfully injected');
                        self._debugLog(self, `Pastebin successfully injected`)
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
    }

    _loadEnded() {
        console.log('_loadEnded');

        if (!this._hasLoadEnded) {
            this._hasLoadEnded = true

            this._initJquery()
        }

    }

    _navStateChange(_event) {
        console.log('_navStateChange event', _event.jsEvaluationValue)
    }

    _onMessage(_msg) {
        /* Localize this. */
        const self = this

        try {
            /* Initialize data. */
            let data = null

            if (_msg && _msg.nativeEvent && _msg.nativeEvent.data) {
                console.log('MESSAGE DATA', _msg.nativeEvent.data);
                this._debugLog(this, `MESSAGE DATA [ ${_msg.nativeEvent.data.slice(0, 30)} ]`)

                try {
                    /* Retrieve the data. */
                    data = JSON.parse(_msg.nativeEvent.data)
                    console.log('PARSED MESSAGE DATA', data);

                    if (data.cmd === 'innerReady') {
                        console.log('REQUEST FOR [innerReady]');

                        const js = `
                            let newEvent = null;
                            newEvent = document.createEvent('Event');
                            newEvent.initEvent('message', true, true);
                            newEvent.data = { cmd: 'wrapperOpenedWebsocket' };
                            setTimeout(() => window.dispatchEvent(newEvent), 0);
                        `

                        Timer.setTimeout(self, 'innerReady', () => {
                            self._webview.injectJavaScript(js)
                            console.log('injected innerReady response')
                            self._debugLog(self, `injected innerReady response`)
                        }, 0)
                    }

                    if (data.cmd === 'siteInfo') {
                        console.log('REQUEST FOR [siteInfo]');

                        const js = `
                            newEvent = document.createEvent('Event');
                            newEvent.initEvent('message', true, true);
                            newEvent.data = {
                                cmd: 'response',
                                id: ${data.id},
                                to: ${data.id},
                                result: {
                                    address: '1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8',
                                    auth_address: '1CD7LH9PUxncZCv3Z9Cga82GEDD3Kh46EZ',
                                    auth_key: '8545c1446c485b9a6878cb3e524a786a12841facaec2ccbf2bff3e5b945fc9c7',
                                    bad_files: 0,
                                    cert_user_id: null,
                                    content: {
                                        files: 70,
                                        domain: "Blog.ZeroNetwork.bit",
                                        description: "Blogging platform Demo",
                                        address: "1BLogC9LN4oPDcruNz3qo1ysa133E9AGg8",
                                        includes: 1,
                                        default_page: "index.html",
                                        cloneable: true,
                                        optional: "data/video/.*mp4",
                                        inner_path: "content.json",
                                        title: "ZeroBlog",
                                        files_optional: 2,
                                        signs_required: 1,
                                        modified: 1530620470,
                                        ignore: "((js|css|alloy-editor)/(?!all.(js|css))|data/.*db|data/users/.*)",
                                        zeronet_version: "0.6.3",
                                        postmessage_nonce_security: true,
                                        translate: [
                                            "index.html",
                                            "js/all.js",
                                            "alloy-editor/all.js"
                                        ],
                                        'background-color': "white"
                                    },
                                    content_updated: 1531089917.587738,
                                    feed_follow_num: 1,
                                    next_size_limit: 10,
                                    peers: 27,
                                    settings: {
                                        peers: 26,
                                        added: 1524461619,
                                        bytes_recv: 8431563,
                                        optional_downloaded: 0,
                                        ajax_key: "a5154a1ef1ca14144868d80582cd362338e89fdf11eb16254a65fca600c0d203",
                                        modified: 1531094577,
                                        cache: {},
                                        serving: true,
                                        domain: "Blog.ZeroNetwork.bit",
                                        own: false,
                                        permissions: [],
                                        size_optional: 7809889,
                                        size: 4176962
                                    },
                                    size_limit: 10,
                                    started_task_num: 0,
                                    tasks: 0,
                                    workers: 0
                                }
                            };
                            setTimeout(() => window.dispatchEvent(newEvent), 0);
                        `

                        Timer.setTimeout(self, 'siteInfo', () => {
                            // self._webview.injectJavaScript(js)
                            // console.log('injected siteInfo response')
                            // self._debugLog(self, `injected siteInfo response`)
                        }, 5)
                    }

                    if (data.cmd === 'dbQuery') {
                        // console.log('REQUEST FOR [dbQuery]');

                        if (data.params[0].slice(0, 10) === 'SELECT key') {
                            console.log('REQUEST FOR [dbQuery](SELECT key)');

                            const sql = data.params[0]
                            console.log('SQL', sql);

                            const js = `
                                newEvent = document.createEvent('Event');
                                newEvent.initEvent('message', true, true);

                                newEvent.data = {
                                    cmd: 'response',
                                    id: ${data.id},
                                    to: ${data.id},
                                    result: [
                                        {
                                            key: 'demo',
                                            value: 0
                                        },
                                        {
                                            key: 'description',
                                            value: 'Demo for decentralized, self publishing blogging platform.'
                                        },
                                        {
                                            key: 'links',
                                            value: '*   [Create new blog](?Post:3:How+to+have+a+blog+like+this)\n\n*   [How does ZeroNet work?](?Post:34:Slides+about+ZeroNet)\n\n*   [Site development tutorial](?Post:99:ZeroChat+tutorial+new)\n\n*   ​​​​​​​[ZeroNet documents](http://zeronet.readthedocs.org/)\n\n*   [Source code](https://github.com/HelloZeroNet)\n\n*   [Enhanced ZeroBlog](http://127.0.0.1:43110/19k2nhubaYsDJNPHL6iNs3D2K9Mgj66P4R)\n    by zeronetscript'
                                        },
                                        {
                                            key: 'modified',
                                            value: 1530015955
                                        },
                                        {
                                            key: 'next_post_id',
                                            value: 132
                                        },
                                        {
                                            key: 'title',
                                            value: 'ZeroBlog'
                                        }
                                    ]
                                };
                                setTimeout(() => window.dispatchEvent(newEvent), 0);
                            `

                            Timer.setTimeout(self, 'dbQuery[key]', () => {
                                self._webview.injectJavaScript(js)
                                console.log('injected dbQuery[key] response', js)
                                self._debugLog(self, `injected dbQuery[key] response`)
                            }, 0)
                        } else if (data.params[0].slice(0, 10) === 'SELECT\n	\'p') {
                            console.log('REQUEST FOR [dbQuery](SELECT p)');

                            const sql = data.params[0]
                            console.log('SQL', sql);

                            const js = `
                                newEvent = document.createEvent('Event');
                                newEvent.initEvent('message', true, true);

                                newEvent.data = {
                                    cmd: 'response',
                                    id: ${data.id},
                                    to: ${data.id},
                                    result: []
                                };
                                // window.dispatchEvent(newEvent);
                                setTimeout(() => window.dispatchEvent(newEvent), 0);
                            `

                            Timer.setTimeout(self, 'dbQuery[p]', () => {
                                self._webview.injectJavaScript(js)
                                console.log('injected dbQuery[p] response')
                                self._debugLog(self, `injected dbQuery[p] response`)
                            }, 2000)
                        } else if (data.params[0].slice(0, 10) === 'SELECT\n	po') {
                            console.log('REQUEST FOR [dbQuery](SELECT po)');

                            const sql = data.params[0]
                            console.log('SQL', sql);

                            const js = `
                                newEvent = document.createEvent('Event');
                                newEvent.initEvent('message', true, true);

                                newEvent.data = {
                                    cmd: 'response',
                                    id: ${data.id},
                                    to: ${data.id},
                                    result: [
                                        {
                                            body: "Back from vacation/inactive period (Japan plz never change) :)\n\nRev3495\n\n*   New plugin: ContentFilter (Replacing Mute) that allows to share and automatically sync site and user blocklist between clients.\n    [Sample site](http://127.0.0.1:43110/1FiLTerEAHp7UT8Aw2zQBypcm5T14kgZDa) that contains 2 blocklist (the format is same as data/filters.json):\n    ![blocklist.png (1115x562)](data/img/post_131_blocklist.png)\n    You can manage followed blocklists using ZeroHello > Manage muted users option. The site is cloneable, if you create a blocklist please share it in the comments.\n*   Switched to Azure meek proxy as the Amazon one became unavailable.\n*   SiteAdd admin API command\n*   More secure url sanitization\n*   Support downloading 2GB+ sites as .zip (Thx to Radtoo)\n*   Support ZeroNet as a transparent proxy (Thx to JeremyRand)\n*   Allow fileQuery as CORS command (Thx to imachug)\n*   Ignore newsfeed items with an invalid date value\n*   Fix sitePublish cli action\n*   Fix FireFox websocket disconnect on site download as zip\n*   Fix local peer discovery when running multiple clients on the same machine",
                                            votes: 20,
                                            date_published: 1530014363.778,
                                            title: "New version: 0.6.3",
                                            comments: 26,
                                            post_id: 131,
                                            json_id: 1
                                        },
                                        {
                                            body: "Rev3464\n\n*   Workaround for China's GFW tracker blocking by using Tor meek proxies: If the client detect many failing tracker connection it offers the user to use Tor meek proxies for tracker connection (does not slows down sync speed / file transfers)\n    To enable this feature you have to download the [Windows ZeroNet distribution](https://github.com/HelloZeroNet/ZeroNet-win/archive/dist/ZeroNet-win.zip) again as tor-meek bridges was not included earlier. (Linux & Mac coming later)\n\n*   Refactored and partly rewritten tracker connection handler part\n\n*   ZeroNet windows distribution now comes with Tor included (with meek proxies)\n*   Added site \"Download as .zip\" backup option to sidebar\n*   Better tracker compatibility by using uTorrent peerid and announcing port 1 in case of closed port\n*   Fix uploading small files with bigfile plugin (ajax post method)\n*   Fix peerPing CLI error reporting\n*   Fix CLI command shutdown with ctrl+c\n*   Fix high CPU/HDD usage when Multiuser plugin enabled\n*   Fix Firefox back button (wrapper_nonce in url)\n\nThe previously planned enhanced stats page is a bit delayed as I currently focusing on recent problems with GFW, but it's coming soon :)",
                                            votes: 22,
                                            date_published: 1525223935.973,
                                            title: "Changelog: May 1, 2018",
                                            comments: 52,
                                            post_id: 130,
                                            json_id: 1
                                        }
                                    ]
                                };
                                setTimeout(() => window.dispatchEvent(newEvent), 0);
                            `

                            Timer.setTimeout(self, 'dbQuery[po]', () => {
                                self._webview.injectJavaScript(js)
                                console.log('injected dbQuery[po] response')
                                self._debugLog(self, `injected dbQuery[po] response`)
                            }, 3000)
                        } else {
                            console.log('WTF IS THIS??', data);
                            this._debugLog(this, `WTF IS THIS??`)
                        }
                    }

                } catch (e2) {
                    console.log('FAILED: parsing json data', _msg.nativeEvent.data);
                    // this._debugLog(this, `FAILED: parsing json data`)
                }
            } else if (_msg && _msg.nativeEvent) {
                console.log('MESSAGE EVENT', _msg.nativeEvent);

                /* Retrieve the native event. */
                data = _msg.nativeEvent

                this._debugLog(this, `MESSAGE EVENT [ ${data} ]`)
            } else {
                console.log('MESSAGE RECEIVED', _msg);

                /* Retrieve the event. */
                data = _msg

                this._debugLog(this, `MESSAGE RECEIVED [ ${data} ]`)
            }
        } catch (e) {
            console.log('MESSAGE ERROR', _msg, e);
            this._debugLog(this, `MESSAGE ERROR [ ${e.toString()} ]`)
        }
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
                const source = { html }
                self.setState({ source }, () => {
                    console.log('HTML source has been updated!');

                    // self._initJquery()
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
