// @flow

import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

import Account from './Account'
import App     from './App'
import Counter from './Counter'

const hydrate = create({ storage: AsyncStorage })

// you can hydrate stores here with mobx-persist
// hydrate('Account', stores.Account)
hydrate('authorized', Counter)

module.exports = {
    Account,
    App,
    Counter
}
