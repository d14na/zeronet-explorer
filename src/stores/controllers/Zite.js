// @flow

import Host0 from '../../lib/host0'
import Peer0 from '../../lib/peer0'
// import Host0 from 'host0'
// import Peer0 from 'peer0'
import Stage from '../Stage'

import { Navigation } from 'react-native-navigation'

import moment from 'moment'
import net from 'net'
import RNFS from 'react-native-fs'

const Zite = {
    preload: async function(_address) {
        /* Initialize the address. */
        this.address = _address

        /* Initailize Host0. */
        this.host0 = new Host0(RNFS)

        /* Initailize Peer0. */
        this.peer0 = new Peer0(net)

        /* Initialize caching flag. */
        const noCache = false

        /* Retrieve content.json from remote. */
        let config = await this.loadFile(this.address, 'content.json', noCache)
            .catch(err => { throw err })

        /* Convert to string. */
        config = Buffer.from(config).toString('utf8')

        try {
            /* Parse the JSON. */
            this.config = JSON.parse(config)
            // console.log('CONFIG', this.config)

            /* Set the background color. */
            Stage.setBackgroundColor(this.config['background-color'])

            /* Update the stage info with config details. */
            Stage.setZiteTitle(this.config['title'])
            Stage.setZiteAddress(this.config['address'])
            Stage.setZiteDescription(this.config['description'])

            const lastUpdate = moment.unix(this.config['modified']).fromNow() +
                ' [ ' + moment.unix(this.config['modified']).format('ll') + ' ]'
            Stage.setZiteLastUpdate(lastUpdate)
        } catch (e) {
            /* Something has gone wrong if we cannot parse the content.json. */
            // FIXME Handle this better in the UI
            throw e
        }
    },

    loadFile: async function(_address, _path, _metaData=null) {
        /* Initialize contents holder. */
        let contents = null

        /* Retrieve the contents from host (if cached). */
        if (_metaData && _metaData.sha512 && _metaData.size) {
            contents = await this.host0.getFile(_address, _path, _metaData)
                .catch(err => { throw err })
        } else {
            contents = null
        }
// FIXME Check to content.json to flag files needing an update
contents = null
        /* Retrieve the contents from peer. */
        if (!contents) {
            contents = await this.peer0.getFile(_address, _path, 0, 89453)
                .catch(err => { throw err })

            /* Save the contents to disk. */
            if (_metaData && _metaData.sha512 && _metaData.size) {
                await this.host0.saveFile(_address, _path, contents, _metaData)
                    .catch(err => { throw err })
            }
        }

        /* Return a promise with the contents. */
        return new Promise(function (resolve, reject) {
            resolve(contents)
        })
    },

    open: async function(_address, _path) {
        /* Initialize files holder. */
        const files = this.config['files']

        /* Retrieve the file keys (filenames). */
        const fileList = Object.keys(files)

        /* Set file count. */
        const numFiles = fileList.length

        /* Initialize display list. */
        let displayList = []

        /* Initialize contents. */
        let fileContents = {}

        for (let filename of fileList) {
            console.info('Processing FILE', filename)

            /* Retrieve file details. */
            const file = files[filename]
            const sha512 = file['sha512']
            const size = file['size']
            // console.log('FILE DETAILS', filename, size, sha512)

            /* Retrieve file from remote. */
            contents = await this.loadFile(this.address, filename, file)
                .catch(err => { throw err })
            // console.log('READ %s [%d bytes]', filename, contents.length, contents)

            const hash = this.host0.sha512(contents)
            // NOTE Checksum uses 32 (50%) of the full 64 bytes from sha512
            const checksum = Buffer.from(hash.slice(0, 32)).toString('hex')

            if (sha512 === checksum) {
                /* Set verification flag. */
                file['valid'] = 'SUCCESS'
            } else {
                /* Set verification flag. */
                file['valid'] = 'FAILED'
            }

            /* Add filename to object. */
            file['name'] = filename

            /* Add file to display list. */
            displayList.push(file)

            /* Set zites's file list. */
            Stage.setZiteFiles(displayList)

            /* Add contents. */
            fileContents[filename] = contents

            /* Set zites contents. */
            Stage.setZiteContents(fileContents)
        }

        /* Start building the body. */
        let body = fileContents['index.html'].toString()

//         /* Build the css. */
//         let css = fileContents['css/bootstrap.min.css'].toString()
// console.log('CSS', css)
//
//         /* Build the graphics. */
//         let img = Buffer.from(fileContents['images/icon.png']).toString('base64')
//         imgData = 'data:' + 'image/png' + ';base64,' + img
// console.log('IMGDATA', img.length, imgData)
//         body = body.replace('images/icon.png', imgData)
//
// body = body.replace('<link href="css/bootstrap.min.css" rel="stylesheet">', `<style>${css}</style>`)
console.log('BODY', body)

// <link href="css/bootstrap.min.css" rel="stylesheet">

        /* Build html body. */
        const html = `<h1>${body}</h1>`

        Navigation.mergeOptions('zeronet.Stage', {
            sideMenu: { left: { visible: false } }
        })

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
                passProps: { html }
            }
        })

    }

}

export default Zite