// @flow

import { Platform } from 'react-native'
import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class Store {
    @observable debugLog = ''

    @observable topBarColor = 'rgba(210, 210, 30, 1.0)'
    @observable backgroundColor = 'rgba(30, 30, 30, 0.7)'

    @observable ziteTitle = ''
    @observable ziteAddress = ''
    @observable ziteDescription = ''
    @observable ziteLastUpdate = ''
    @observable ziteFiles = []

    /* FIXME Will only display blockchain ads on Android devices to avoid
     * any issues with Apple's TOS.
     */
    @observable displayAds = Platform.OS === 'android'

    /**
     * Add a debugging log entry.
     */
    @action addDebugLog(_tag, _entry) {
        if (!_tag) return

        if (_entry) {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag + '\n' + _entry
        } else {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag
        }
    }

    @action setBackgroundColor(_color) {
        this.backgroundColor = _color
    }

    @action updateZiteTitle(_title) {
        this.ziteTitle = _title
    }
    @action updateZiteAddress(_address) {
        this.ziteAddress = _address
    }
    @action updateZiteDescription(_description) {
        this.ziteDescription = _description
    }
    @action updateZiteLastUpdate(_lastUpdate) {
        this.ziteLastUpdate = _lastUpdate
    }
    @action updateZiteFiles(_files) {
        this.ziteFiles = _files
    }

}

export default new Store()
