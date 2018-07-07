// @flow

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class Store {
    @observable count = 0;
    @observable title = '(Counter) P0rtal'

    @observable authorized = false

    @action setP0rtalTitle(_title) {
        this.title = _title
    }

    @action onPlus() {
        this.count += 1
    }

    @action onMinus() {
        this.count -= 1
    }
}

export default new Store()
