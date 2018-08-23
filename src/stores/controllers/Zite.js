// @flow

import Host0 from '../../lib/host0'
import Peer0 from '../../lib/peer0'
// import Host0 from 'host0'
// import Peer0 from 'peer0'
import Stage from '../Stage'

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
        let content = await this.loadFile(this.address, 'content.json', noCache)
            .catch(err => { throw err })

        /* Convert to string. */
        content = Buffer.from(content).toString('utf8')

        try {
            /* Parse the JSON. */
            this.config = JSON.parse(content)
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

        /* Return a promise with the content. */
        // return new Promise(function (resolve, reject) {
        //     resolve(content)
        // })
    },

    loadFile: async function(_address, _path, _metaData=null) {
        /* Initialize content holder. */
        let content = null

        /* Retrieve the content from host (if cached). */
        if (_metaData && _metaData.sha512 && _metaData.size) {
            content = await this.host0.getFile(_address, _path, _metaData)
                .catch(err => { throw err })
        } else {
            content = null
        }

        /* Retrieve the content from peer. */
        if (!content) {
            content = await this.peer0.getFile(_address, _path, 0, 89453)
                .catch(err => { throw err })

            /* Save the content to disk. */
            if (_metaData && _metaData.sha512 && _metaData.size) {
                await this.host0.saveFile(_address, _path, content, _metaData)
                    .catch(err => { throw err })
            }
        }

        /* Return a promise with the content. */
        return new Promise(function (resolve, reject) {
            resolve(content)
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

        for (let filename of fileList) {
            console.info('Processing FILE', filename)

            /* Retrieve file details. */
            const file = files[filename]
            const sha512 = file['sha512']
            const size = file['size']
            // console.log('FILE DETAILS', filename, size, sha512)

            /* Retrieve file from remote. */
            content = await this.loadFile(this.address, filename, file)
                .catch(err => { throw err })
            // console.log('READ %s [%d bytes]', filename, content.length, content)

            const hash = this.host0.sha512(content)
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

            /* Update stage's file list. */
            Stage.setZiteFiles(displayList)
        }
    }

}

export default Zite
