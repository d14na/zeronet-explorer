// @flow

import Host0 from '../../lib/host0';
import Peer0 from '../../lib/peer0';
// import Host0 from 'host0';
// import Peer0 from 'peer0';
import Stage from '../Stage';

import {Navigation} from 'react-native-navigation';

import moment from 'moment';
import net from 'react-native-tcp';
// import RNFS from 'react-native-fs';
import bitcoinMessage from 'bitcoinjs-message';

const Zite = {
    preload: async function(_address) {
        /* Initialize the address. */
        this.address = _address;

        /* Initailize Host0. */
        // this.host0 = new Host0(RNFS);

        /* Initailize Peer0. */
        this.peer0 = new Peer0(net);

        try {
            /* Check the config (if available) cached on disk. */
            let cachedConfig = await this.host0
                .getFile(this.address, 'content.json')
                .catch(err => {
                    throw err;
                });

            /* Decode the cache. */
            cachedConfig = JSON.parse(cachedConfig);
            // console.log('CACHED CONFIG', cachedConfig)

            /* Set cached config (if available). */
            if (cachedConfig) {
                /* Set the cached config.json. */
                Stage.setZiteCachedConfig(cachedConfig);
            }
        } catch (e) {
            /* Something has gone wrong if we cannot parse the content.json. */
            // FIXME Handle this better in the UI
            throw e;
        }

        /* Initialize caching flag. */
        const noCache = false;

        /* Retrieve content.json from remote. */
        let config = await this.loadFile(
            this.address,
            'content.json',
            noCache,
        ).catch(err => {
            throw err;
        });

        /* Convert to string. */
        config = Buffer.from(config).toString('utf8');

        try {
            /* Parse the JSON. */
            this.config = JSON.parse(config);
            // console.log('CONFIG', this.config)

            const verified = this.verifyConfig();

            if (!verified) {
                return alert('Oops! content.json could NOT be verified..');
            }

            /* Set the background color. */
            Stage.setBackgroundColor(this.config['background-color']);

            /* Update the stage info with config details. */
            Stage.setZiteTitle(this.config.title);
            Stage.setZiteAddress(this.config.address);
            Stage.setZiteDescription(this.config.description);
            Stage.setZiteModified(this.config.modified);

            const lastUpdate = moment.unix(this.config.modified).fromNow() +
                ' on ' +
                moment.unix(this.config.modified).format('ll');
            Stage.setZiteLastUpdate(lastUpdate);
        } catch (e) {
            /* Something has gone wrong if we cannot parse the content.json. */
            // FIXME Handle this better in the UI
            throw e;
        }
    },

    verifyConfig: async function() {
        /**
         * Escape unicode characters.
         * Converts to a string representation of the unicode.
         */
        const escapeUnicode = function(str) {
            return str.replace(/[^\0-~]/g, function(ch) {
                return '\\u' + ('000' + ch.charCodeAt().toString(16)).slice(-4);
            });
        };

        /* Localize config for `content.json` parsing & formatting. */
        let config = this.config;

        /* Retrieve the signature. */
        const signature = config.signs[this.address];
        console.info('content.json signature', signature);

        /* Delete signs (as we can't verify ourselves in the signature). */
        delete config.signs;

        /* Convert the JSON to a string. */
        // NOTE: This matches the functionality of Python's `json.dumps` spacing.
        config = JSON.stringify(config)
            .replace(/":/g, '": ')
            .replace(/,"/g, ', "');

        /* Escape all unicode characters. */
        // NOTE: This matches the functionality of Python's `unicode` handling.
        config = escapeUnicode(config);

        /* Verify the Bitcoin signature. */
        const isValid = bitcoinMessage.verify(config, this.address, signature);
        console.info('content.json isValid', isValid);

        return isValid;
    },

    loadFile: async function(_address, _path, _metaData = null) {
        /* Initialize contents holder. */
        let contents = null;

        /* Retrieve the contents from host (if cached). */
        if (_metaData && _metaData.sha512 && _metaData.size) {
            contents = await this.host0
                .getFile(_address, _path, _metaData)
                .catch(err => {
                    throw err;
                });
        } else {
            contents = null;
        }

        // FIXME Check to content.json to flag files needing an update
        contents = null;

        /* Retrieve the contents from peer. */
        if (!contents) {
            contents = await this.peer0
                .getFile(_address, _path, 0, 1234567890)
                .catch(err => {
                    throw err;
                });

            /* Save the contents to disk. */
            if (_metaData && _metaData.sha512 && _metaData.size) {
                await this.host0
                    .saveFile(_address, _path, contents, _metaData)
                    .catch(err => {
                        throw err;
                    });
            }
        }

        /* Return a promise with the contents. */
        return new Promise(function(resolve, reject) {
            resolve(contents);
        });
    },

    open: async function(_address, _path) {
        /* Retrieve and decode content.json. */
        const config = JSON.stringify(this.config);

        /* Save the latest content.json. */
        await this.host0
            .saveFile(_address, 'content.json', config)
            .catch(err => {
                throw err;
            });

        /* Initialize files holder. */
        const files = this.config.files;

        /* Retrieve the file keys (filenames). */
        const fileList = Object.keys(files);

        /* Set file count. */
        const numFiles = fileList.length;

        /* Initialize display list. */
        let displayList = [];

        let passedAllChecks = true;

        for (let filename of fileList) {
            console.info('Processing FILE', filename)

            /* Retrieve file details. */
            const file = files[filename];
            const sha512 = file.sha512;
            const size = file.size;
            // console.log('(CONFIG) FILE DETAILS', filename, size, sha512)

            /* Retrieve file from remote. */
            const contents = await this.loadFile(
                this.address,
                filename,
                file,
            ).catch(err => {
                throw err;
            });
            // console.log('(READ) FILE DETAILS %s [%d bytes]', filename, contents.length, contents)

            const hash = this.host0.sha512(contents);
            // NOTE Checksum uses 32 (50%) of the full 64 bytes from sha512
            const checksum = Buffer.from(hash.slice(0, 32)).toString('hex');
            // console.log('CALC CHECKSUM', checksum)

            if (sha512 === checksum) {
                /* Set verification flag. */
                file.valid = true;
            } else {
                /* Set verification flag. */
                file.valid = false;

                /* Set passed checks flag. */
                passedAllChecks = false;
            }

            /* Add filename to object. */
            file.name = filename;

            /* Add file to display list. */
            displayList.push(file);

            /* Set zites's file list. */
            Stage.setZiteFiles(displayList);

            if (!passedAllChecks) {
                // FIXME A custom alert will be much nicer.
                //       Even better create a descriptive error screen.
                alert(`Oops! ${filename} FAILED file verification!`);

                /* Stop processing files. */
                break;
            }
        }

        /* Once all checks are passed, close the Stage and load WebView. */
        if (passedAllChecks) {
            /* Close the Stage. */
            Navigation.mergeOptions('zeronet.Stage', {
                sideMenu: {left: {visible: false}},
            });

            /* Initialize starting target (filepath). */
            const target = `/${_address}/${_path}`;

            /* Open the WebView. */
            Navigation.push('zeronet.Main', {
                component: {
                    id: 'zeronet.Webview',
                    name: 'zeronet.Webview',
                    options: {
                        topBar: {
                            visible: false,
                            animate: false,
                            drawBehind: true,
                        },
                    },
                    passProps: {target},
                },
            });
        }
    },
};

export default Zite;
