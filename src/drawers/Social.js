import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { MonoText } from '../components'

export default class Social extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={ styles.container }>
            <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                We should put chat here
            </Text>

            <Button title="Chat" onPress={ this._chat.bind(this) } />

            <MonoText style={{ color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'MonoText' }}>
                We should put forums here
            </MonoText>

            <Button title="Forums" onPress={ this._chat.bind(this) } />
        </View>
    }

    _chat() {
        console.log('goto intro')

        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.SecondTabScreen'
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.9)'
    }
})
