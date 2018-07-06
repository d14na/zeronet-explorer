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

import { MonoText } from '../../components'

export default class Account extends React.Component {
    constructor(props) {
        super(props)

        console.log('Feed received props', props)

        this.state = {}
    }

    render() {
        return <View style={ styles.container }>
            <FormLabel>Name</FormLabel>
            <FormInput onChangeText={ this._someFunction }/>
            <FormValidationMessage>Error message</FormValidationMessage>

            <Button title="FEED" onPress={ this._chat.bind(this) } />

        </View>
    }

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        id: 'zeronet.P0rtalTopBar',
                        name: 'zeronet.P0rtalTopBar',
                        passProps: {
                            title: 'Feed'
                        }
                    }
                },
                visible: true,
                drawBehind: false
            }
        })


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
