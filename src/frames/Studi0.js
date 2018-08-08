import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import { Button } from 'react-native-elements'

import {
    Shared,
    Styles
} from '../constants'

@observer
export default class Playback extends React.Component {
    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('STUDI0_')
    }

    render() {

        return <View style={ styles.container }>
            <Button
                onPress={ this._close.bind(this) }
                icon={{name: 'window-close', type: 'font-awesome'}}
                title='Close' />

            <View style={ styles.centerView }>
                <Text>MEDIA STUDIO</Text>
            </View>

        </View>
    }

    componentDidMount() {

    }

    _close() {
        Navigation.pop(this.props.componentId)
        // Navigation.dismissModal(this.props.componentId)
    }

    _hide() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                visible: true,
                animate: true,
                drawBehind: false
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row'
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
