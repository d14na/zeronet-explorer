// @flow

// import { observable, computed } from 'mobx'
// import { persist } from 'mobx-persist'

// import { observable } from 'mobx'
// import { observer } from 'mobx-react/native'

import Host0 from '../../lib/host0'
import Peer0 from '../../lib/peer0'
// import Host0 from 'host0'
// import Peer0 from 'peer0'
import Stage from '../Stage'

import moment from 'moment'
import net from 'net'
import RNFS from 'react-native-fs'
import Timer from 'react-native-timer'

const Zite = {
    preload: async function(_address) {
        /* Initialize the address. */
        this.address = _address

        /* Initialize caching flag. */
        const noCache = false

        /* Retrieve content.json from remote. */
        let content = await this.loadFile(this.address, 'content.json', noCache)
            .catch(err => { throw err })

        /* Convert to string. */
        content = Buffer.from(content).toString('utf8')

        try {
            /* Parse the JSON. */
            const config = JSON.parse(content)
            console.log('CONFIG', config)
console.log('*** STAGE', Stage)
            /* Set the background color. */
            Stage.setBackgroundColor(config['background-color'])

            /* Update the stage info with config details. */
            Stage.setZiteTitle(config['title'])
            Stage.setZiteAddress(config['address'])
            Stage.setZiteDescription(config['description'])

            const lastUpdate = moment.unix(config['modified']).fromNow() +
                ' [ ' + moment.unix(config['modified']).format('ll') + ' ]'
            Stage.setZiteLastUpdate(lastUpdate)

    // TODO Nicely format config details

            /* Initialize files holder. */
            const files = config['files']

            /* Retrieve the file keys (filenames). */
            const fileList = Object.keys(files)

            /* Set file count. */
            const numFiles = fileList.length

            /* Initialize host. */
            const host0 = new Host0(RNFS)

            /* Initialize display list. */
            let displayList = []
    // let index = 0
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

                const hash = host0.sha512(content)
                // NOTE Checksum uses 32 (50%) of the full 64 bytes from sha512
                const checksum = Buffer.from(hash.slice(0, 32)).toString('hex')
                // console.log('%s CHECKSUM', file, checksum.toString('hex'), checksum)
                // Stage.addDebugLog(file + ' checksum', checksum.toString('hex'))

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

    // if (index++ === 2) break
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
    },

    loadFile: async function(_address, _path, _metaData=null) {
        /* Initailize Host0. */
        const host0 = new Host0(RNFS)

        /* Initailize Peer0. */
        const peer0 = new Peer0(net)

        /* Initialize content holder. */
        let content = null

        /* Retrieve the content from host (if cached). */
        if (_metaData && _metaData.sha512 && _metaData.size) {
            content = await host0.getFile(_address, _path, _metaData)
                .catch(err => { throw err })
        } else {
            content = null
        }

        /* Retrieve the content from peer. */
        if (!content) {
            content = await peer0.getFile(_address, _path, 0, 89453)
                .catch(err => { throw err })

            /* Save the content to disk. */
            if (_metaData && _metaData.sha512 && _metaData.size) {
                await host0.saveFile(_address, _path, content, _metaData)
                    .catch(err => { throw err })
            }
        }

        /* Return a promise with the content. */
        return new Promise(function (resolve, reject) {
            resolve(content)
        })
    },

    open: async function(_address, _path) {
        alert('opening ' + _address + ' | ' + _path)
    }

}

export default Zite
