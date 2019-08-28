_onMessage(_msg) {
    /* Localize this. */
    const self = this

    try {
        /* Initialize data. */
        let data = null

        if (_msg && _msg.nativeEvent && _msg.nativeEvent.data) {
            console.log('RN _onMessage (RAW)', _msg.nativeEvent.data);
            // this._debugLog(this, `MESSAGE DATA [ ${_msg.nativeEvent.data.slice(0, 30)} ]`)

            try {
                /* Retrieve the data. */
                data = JSON.parse(_msg.nativeEvent.data)
                console.log('RN _onMessage (PARSED)', data);

                if (data.cmd === 'innerReady') {
                    console.log('RN REQUEST FOR [innerReady]');

                    const js = `
                        /*window.addEventListener("message", (_msg) => {
                            window.postMessage('something came in *** ' + JSON.stringify(_msg).length + ' *** ' + JSON.stringify(_msg));
                        }, false);*/
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
                    console.log('RN REQUEST FOR [siteInfo]');

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
                        self._webview.injectJavaScript(js)
                        console.log('injected siteInfo response')
                        // self._debugLog(self, `injected siteInfo response`)
                    }, 0)
                }

                if (data.cmd === 'dbQuery') {
                    if (data.params[0].slice(0, 10) === 'SELECT key') {
                        console.log('RN REQUEST FOR [dbQuery](SELECT key)');

                        const sql = data.params[0]
                        console.log('SQL #1', sql);

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
                            console.log('injected dbQuery #1 response')
                            // self._debugLog(self, `injected dbQuery[key] response`)
                        }, 0)
                    } else if (data.params[0].slice(0, 10) === 'SELECT\'pos') {
                        // return
                        console.log('RN REQUEST FOR [dbQuery](SELECT p)');

                        const sql = data.params[0]
                        console.log('SQL #2', sql);

                        const js = `
                            newEvent = document.createEvent('Event');
                            newEvent.initEvent('message', true, true);

                            newEvent.data = {
                                cmd: 'response',
                                id: ${data.id},
                                to: ${data.id},
                                result: []
                            };
                            setTimeout(() => window.dispatchEvent(newEvent), 0);
                        `

                        Timer.setTimeout(self, 'dbQuery[p]', () => {
                            self._webview.injectJavaScript(js)
                            console.log('injected dbQuery #2 response')
                            // self._debugLog(self, `injected dbQuery[p] response`)
                        }, 1000)
                    } else if (data.params[0].slice(0, 10) === 'SELECTpost') {
                        console.log('RN REQUEST FOR [dbQuery](SELECT po)');

                        const sql = data.params[0]
                        console.log('SQL #3', sql);

                        const js = `
                            newEvent = document.createEvent('Event');
                            newEvent.initEvent('message', true, true);

                            newEvent.data = {
                                cmd: 'response',
                                id: ${data.id},
                                to: ${data.id},
                                result: [
                                    {
                                        body: \`Back from vacation/inactive period (Japan plz never change) :)\n\nRev3495\n\n*   New plugin: ContentFilter (Replacing Mute) that allows to share and automatically sync site and user blocklist between clients.\n    [Sample site](http://127.0.0.1:43110/1FiLTerEAHp7UT8Aw2zQBypcm5T14kgZDa) that contains 2 blocklist (the format is same as data/filters.json):\n    ![blocklist.png (1115x562)](data/img/post_131_blocklist.png)\n    You can manage followed blocklists using ZeroHello > Manage muted users option. The site is cloneable, if you create a blocklist please share it in the comments.\n*   Switched to Azure meek proxy as the Amazon one became unavailable.\n*   SiteAdd admin API command\n*   More secure url sanitization\n*   Support downloading 2GB+ sites as .zip (Thx to Radtoo)\n*   Support ZeroNet as a transparent proxy (Thx to JeremyRand)\n*   Allow fileQuery as CORS command (Thx to imachug)\n*   Ignore newsfeed items with an invalid date value\n*   Fix sitePublish cli action\n*   Fix FireFox websocket disconnect on site download as zip\n*   Fix local peer discovery when running multiple clients on the same machine\`,
                                        votes: 20,
                                        date_published: 1530014363.778,
                                        title: "New version: 0.6.3",
                                        comments: 26,
                                        post_id: 131,
                                        json_id: 1
                                    },
                                    {
                                        body: \`Rev3464\n\n*   Workaround for China's GFW tracker blocking by using Tor meek proxies: If the client detect many failing tracker connection it offers the user to use Tor meek proxies for tracker connection (does not slows down sync speed / file transfers)\n    To enable this feature you have to download the [Windows ZeroNet distribution](https://github.com/HelloZeroNet/ZeroNet-win/archive/dist/ZeroNet-win.zip) again as tor-meek bridges was not included earlier. (Linux & Mac coming later)\n\n*   Refactored and partly rewritten tracker connection handler part\n\n*   ZeroNet windows distribution now comes with Tor included (with meek proxies)\n*   Added site \"Download as .zip\" backup option to sidebar\n*   Better tracker compatibility by using uTorrent peerid and announcing port 1 in case of closed port\n*   Fix uploading small files with bigfile plugin (ajax post method)\n*   Fix peerPing CLI error reporting\n*   Fix CLI command shutdown with ctrl+c\n*   Fix high CPU/HDD usage when Multiuser plugin enabled\n*   Fix Firefox back button (wrapper_nonce in url)\n\nThe previously planned enhanced stats page is a bit delayed as I currently focusing on recent problems with GFW, but it's coming soon :)\`,
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
                            console.log('injected dbQuery #3 response')
                            self._debugLog(self, `injected dbQuery[po] response`)
                        }, 0)
                    } else {
                        console.log('WTF IS THIS?? [ %s ]', data.params[0].slice(0, 10), data);
                        this._debugLog(this, `WTF IS THIS??`)
                    }
                }

            } catch (e2) {
// console.log('FAILED: parsing json data', _msg.nativeEvent.data);
                // console.error('FAILED: parsing json data', _msg.nativeEvent.data);
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
