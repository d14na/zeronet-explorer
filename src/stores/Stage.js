// @flow

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class Store {
    @observable debugLog = ''
    @observable ziteTitle = ''

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

    @action updateZiteTitle(_title) {
        this.ziteTitle = _title
    }
}

export default new Store()
