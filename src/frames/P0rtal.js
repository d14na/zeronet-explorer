import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import {
    FormLabel,
    FormInput,
    FormValidationMessage
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

import { MonoText } from '../components'

export default class Decentral extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={ styles.container }>
            <View>
                <Text style={ styles.heading }>
                    P0RTAL
                </Text>
            </View>

            <FormLabel>Name</FormLabel>
            <FormInput onChangeText={ this._someFunction }/>
            <FormValidationMessage>Error message</FormValidationMessage>

            <Button title="Chat" onPress={ this._chat.bind(this) } />

            <MonoText style={{ color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'MonoText' }}>
                We should put forums here
            </MonoText>

            <Button title="Forums" onPress={ this._chat.bind(this) } />

            <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Discover Nearby Mesh Networks
            </Text>

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

    _someFunction() {

    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.9)'
    },
    heading: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        textAlign: 'center'
    }
})
