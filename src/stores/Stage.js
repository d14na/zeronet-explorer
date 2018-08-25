// @flow

import { Platform } from 'react-native'
import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

import {
    Zite
} from './controllers'

class Store {
    /* Initialize debugging log. */
    @observable debugLog = ''

    /* Initialize preset values. */
    @observable topBarColor = 'rgba(210, 210, 30, 1.0)'
    @observable backgroundColor = 'rgba(30, 30, 30, 0.7)'

    /* Initialize zite details. */
    @observable ziteAddress = ''
    @observable ziteTitle = ''
    @observable ziteDescription = ''
    @observable ziteLastUpdate = ''
    @observable ziteFiles = []

    /* FIXME Will only display blockchain ads on Android devices to avoid
     * any issues with Apple's TOS.
     */
    @observable displayAds = Platform.OS === 'android'

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

    /* Set the zite files list. */
    @action setZiteFiles(_files) {
        this.ziteFiles = _files
    }

    /* Set the zite files list. */
    @action initZite(_address) {
        /* Preload the zite (content.json). */
        Zite.preload(_address)
    }

    /* Open the zite path. */
    @action openZite(_address, _path) {
        /* Open the zite specified path (default to index.html). */
        Zite.open(_address, _path)
    }

}

export default new Store()
