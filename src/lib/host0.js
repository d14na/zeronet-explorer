// import Client from 'zeronet-tracker'

class Host0 {
    constructor(_fs) {
        this.fs = _fs
    }

    exists = async function (_tag, _path) {
        /* Check for file existence. */
        const exists = await this.fs.exists(_tag + '/' + _path)

        return exists
    }

    sha512 = function (_buf) {
        /* Initialize create hash. */
        const createHash = require('crypto').createHash

        /* Return the sha512 hash. */
        return createHash('sha512').update(_buf).digest()
    }

    getFile = async function (_tag, _path, _metaData) {
        /* Localize this. */
        const self = this

        const filePath = self.fs.DocumentDirectoryPath + '/' + _tag + '/' + _path

        return new Promise(async function (resolve, reject) {
            const exists = await self.fs.exists(filePath)
                .catch(reject)
// console.log('getPath EXISTS', exists)

            if (exists) {
                let contents = null

                if (_path.slice(-3) === 'png') {
                    contents = await self.fs.readFile(filePath, 'base64')
                        .catch(err => { throw err })

                    /* Convert to binary. */
                    contents = Buffer.from(contents, 'base64')
                } else {
                    contents = await self.fs.readFile(filePath, 'utf8')
                        .catch(err => { throw err })
                }

                return resolve(contents)
            } else {
                return resolve(null)
            }
        })
    }

    listFiles = async function (_tag) {
        /* Localize this. */
        const self = this

        const dirPath = self.fs.DocumentDirectoryPath + '/' + _tag + '/'

        // get a list of files and directories in the main bundle
        // On Android, use "this.fs.DocumentDirectoryPath" (MainBundlePath is not defined)
        return self.fs.readDir(dirPath)
            .then((result) => {
                // TODO We should perform a `STAT` for additional details
                return result
            })
            .catch((err) => {
                console.log(err.message, err.code)
            })
    }

    saveFile = async function (_tag, _path, _data, _metaData) {
        /* Localize this. */
        const self = this

        // console.log('saveFile', _tag, _path)

        const dirSplitPos = _path.lastIndexOf('/')
        if (dirSplitPos > -1) {
            /* Retrieve new directory name. */
            const newDir = _path.slice(0, dirSplitPos)

            /* Set new directory path. */
            const newDirPath = self.fs.DocumentDirectoryPath + '/' + _tag + '/' + newDir

            /* Create the new directory. */
            const created = await self.fs.mkdir(newDirPath)
        }

        const filePath = self.fs.DocumentDirectoryPath + '/' + _tag + '/' + _path
// console.log('filePath', filePath)

        return new Promise(async function (resolve, reject) {
            let success = null

            if (_path.slice(-3) === 'png') {
                const base64 = Buffer.from(_data).toString('base64')

                success = await self.fs.writeFile(filePath, base64, 'base64')
                    .catch(reject)
            } else {
                success = await self.fs.writeFile(filePath, _data, 'utf8')
                    .catch(reject)
            }

            // FIXME How do we verify, when this always returns `undefined`
            resolve(success)
        })
    }
}

const announce = function () {
    /* Localize this. */
    const self = this

    console.log('Announcing...')

    //
    // const crypto = require('crypto')
    // let shasum = crypto.createHash('sha1')
    // shasum.update('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D')
    // const infoHash = shasum.digest('hex')
    // console.log('Info hash', infoHash)
    //
    // var requiredOpts = {
    //     infoHash,
    //     // infoHash: Buffer.from('1HeLLo4uzjaLetFx6NH3PMwFP3qbRbTf3D'),
    //     // infoHash: Buffer.from('37826C0C2ECC81F06B39C124DDA88E00E9D559D1'),
    //     peerId: this.state.peerId,
    //     announce: [
    //         // 'udp://tracker.coppersurfer.tk:6969',
    //         'udp://tracker.leechers-paradise.org:6969'
    //     ],
    //     port: 6881
    // }

    // var optionalOpts = {
    //     getAnnounceOpts: function () {
    //         // Provide a callback that will be called whenever announce() is called
    //         // internally (on timer), or by the user
    //         return {
    //             uploaded: 0,
    //             downloaded: 0,
    //             left: 0,
    //             customParam: 'blah' // custom parameters supported
    //         }
    //     },
    //
    //     // RTCPeerConnection config object (only used in browser)
    //     rtcConfig: {},
    //
    //     // User-Agent header for http requests
    //     userAgent: '',
    //
    //     // Custom webrtc impl, useful in node to specify [wrtc](https://npmjs.com/package/wrtc)
    //     wrtc: {},
    // }

    var client = new Client(requiredOpts)

    client.on('error', function (err) {
        // fatal client error!
        console.log(err.message)
    })

    client.on('warning', function (err) {
        // a tracker was unavailable or sent bad data to the client. you can probably ignore it
        console.log(err.message)
    })

    // start getting peers from the tracker
    client.start()

    client.on('update', function (data) {
        console.log('got an announce response from tracker: ', data.announce)
        console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
    })

    client.once('peer', function (_address) {
        console.log('found a peer: ' + _address) // 85.10.239.191:48623

        const ipAddress = _address.split(':')[0]
        const port = _address.split(':')[1]

        const peer = { ipAddress, port }

        self.hostIp = ipAddress
        self.hostPort = port

        self._addPeerToDb(infoHash, peer)
    })

    // announce that download has completed (and you are now a seeder)
    // client.complete()

    // force a tracker announce. will trigger more 'update' events and maybe more 'peer' events
    // client.update()

    // provide parameters to the tracker
    // client.update({
    //     uploaded: 0,
    //     downloaded: 0,
    //     left: 0,
    //     customParam: 'blah' // custom parameters supported
    // })

    // stop getting peers from the tracker, gracefully leave the swarm
    // client.stop()

    // ungracefully leave the swarm (without sending final 'stop' message)
    // client.destroy()

    // scrape
    client.scrape()

    client.on('scrape', function (data) {
        console.log('got a scrape response from tracker: ', data.announce)
        console.log('number of seeders vs. leechers in the swarm: ', data.complete, data.incomplete)
        // console.log('number of total downloads of this torrent: ', data.downloaded)
    })
}

export default Host0
