// @flow

import {
    AsyncStorage,
    Platform
} from 'react-native'

import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'

import * as Keychain from 'react-native-keychain'

import moment from 'moment'

import {
    Zite
} from './controllers'

class Store {
    /* Initialize debugging log. */
    @observable debugLog = ''

    /* Initialize preset values. */
    @observable topBarColor = 'rgba(210, 210, 30, 1.0)'
    @observable backgroundColor = 'rgba(30, 30, 30, 0.95)'

    /* Initialize zite details. */
    @observable ziteAddress = ''
    @observable ziteTitle = ''
    @observable ziteDescription = ''
    @observable ziteLastUpdate = ''
    @observable ziteModified = 0
    @observable ziteCachedConfig = {}
    @observable ziteFiles = []

    /* FIXME Will only display blockchain ads on Android devices to avoid
     * any issues with Apple's TOS.
     */
    @observable displayAds = Platform.OS === 'android'

    @computed get ziteCachedAge() {
        /* Calculate the time difference. */
        const diff = this.ziteModified - this.ziteCachedConfig.modified

        if (diff <= 0) {
            return `Your zite files are up-to-date!`
        } else {
            /* Format the difference. */
            const age = moment.duration(diff, 'seconds').humanize()

            return `Your zite files are outdated by ${age}`
        }
    }

    /* Add a debugging log entry. */
    @action addDebugLog(_tag, _entry) {
        if (!_tag) return

        if (_entry) {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag + '\n' + _entry
        } else {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag
        }
    }

    /* Set the background color. */
    @action setBackgroundColor(_color) {
        this.backgroundColor = _color
    }

    /* Set the zite address. */
    @action setZiteAddress(_address) {
        this.ziteAddress = _address
    }

    /* Set the zite title. */
    @action setZiteTitle(_title) {
        this.ziteTitle = _title
    }

    /* Set the zite description. */
    @action setZiteDescription(_description) {
        this.ziteDescription = _description
    }

    /* Set the zite last update. */
    @action setZiteLastUpdate(_lastUpdate) {
        this.ziteLastUpdate = _lastUpdate
    }

    /* Set the zite modified. */
    @action setZiteModified(_modified) {
        this.ziteModified = _modified
    }

    /* Set the zite modified. */
    @action setZiteCachedConfig(_cachedConfig) {
        this.ziteCachedConfig = _cachedConfig
    }

    /* Set the zite files list. */
    @action setZiteFiles(_files) {
        this.ziteFiles = _files
    }

    /* Set the zite files list. */
    @action initZite(_address) {
        /* Reset all holders. */
        this.ziteAddress = ''
        this.ziteTitle = ''
        this.ziteDescription = ''
        this.ziteLastUpdate = ''
        this.ziteModified = 0
        this.ziteCachedConfig = {}
        this.ziteFiles = []

        /* Preload the zite (content.json). */
        Zite.preload(_address)
    }

    /* Open the zite path. */
    @action openZite(_address, _path) {
        /* Open the zite specified path (default to index.html). */
        Zite.open(_address, _path)
    }

    /* Add a new peer to the secure data storage. */
    @action async addPeer(_peer) {
        console.log(`Adding new peer to secure data storage`, _peer)

        /* Initialize peer id. */
        const peerId = `${_peer.ip}:${_peer.port}`

        /* Retrieve list of all peers. */
        let peers = await getAllPeers()

        /* Verify, add, then save new peer to list. */
        if (!peers[peerId]) {
            /* Add new peers. */
            peers[peerId] = {
                success: 0,
                addedAt: moment().unix(),
                updatedAt: moment().unix()
            }

            /* Save updated peer list. */
            AsyncStorage.setItem('peers', peers)
        }
    }

    /* Remove a peer from the list of all peers. */
    @action async removePeer(_peerId) {
        /* Retrieve list of all peers. */
        let peers = await getAllPeers()

        /* Verify, delete, then save new peer to list. */
        if (peers[_peerId]) {
            /* Delete the peer from list. */
            delete peers[_peerId]

            /* Save updated peer list. */
            AsyncStorage.setItem('peers', peers)
        }
    }

    /* Retrieve a peer's details from the secure data storage. */
    @action async getPeer(_peerId) {
        console.log(`Retreiving [ peer: %s ] from 'insecure' data storage`, _peerId)

        /* Retrieve list of all peers. */
        let peers = await getAllPeers()

        if (peers[_peerId]) {
            return peers[_peerId]
        } else {
            return null
        }
    }

    /* List all peers from the secure data storage. */
    @action async getAllPeers() {
        /* Initialize peers list. */
        let peers = {}

        /* Retrieve list of all peers. */
        peers = await AsyncStorage.getItem('peers')

        console.log(`All saved peers`, peers)
    }

}

export default new Store()
