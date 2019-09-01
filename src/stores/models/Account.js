// @flow

import {observable} from 'mobx';
import {persist} from 'mobx-persist';

class Account {
    @persist @observable username = 'guest';
    @persist @observable password = '';
}

export default Account;
