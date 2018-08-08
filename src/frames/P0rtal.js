import React from 'react'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Shared,
    Styles
} from '../constants'

import {
    Dashboard,
    Welcome
} from '../screens/P0rtal'

@observer
export default class P0rtal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!stores.P0rtal.authorized) {
            return <Welcome componentId={ 'zeronet.P0rtal' } />
        }

        return <Dashboard componentId={ 'zeronet.P0rtal' } />
    }

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        id: 'zeronet.P0rtalTopBar',
                        name: 'zeronet.P0rtalTopBar'
                    }
                },
                visible: true,
                drawBehind: false
            }
        })
    }
}
