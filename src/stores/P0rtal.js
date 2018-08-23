// @flow

import { Navigation } from 'react-native-navigation'

import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

import {
    Account
} from './models'

class Store {
    @persist('object', Account) @observable account = new Account
    @persist @observable authorized = false
    @observable title = 'P0rtal'

    @action setP0rtalTitle(_title) {
        this.title = _title
    }

    @action authorize() {
        /* Set authorization flag. */
        this.authorized = true

        /* Set the P0rtal title. */
        this.setP0rtalTitle('Welcome Back!')

        /* Load the P0rtal. */
        Navigation.popToRoot('zeronet.P0rtal')
    }

    @action exit() {
        this.authorized = false
        this.setP0rtalTitle('I\'m gone!')
    }

    @action login = (username: string, password: string) => {
        return new Promise((resolve, reject) => {
            if (username && password) {
                this.authorized = true
                this.account = { username, password }
                resolve({ message: 'success' })
            } else {
                reject({ message: 'Something is wrong with input data :(' })
            }
        })
    }

    @action logout = () => {
        return new Promise((resolve, reject) => {
            this.authorized = false
            this.account = {}

            resolve()
        });
    }
}

export default new Store()
