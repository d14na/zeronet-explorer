import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../../stores'

import Icon from 'react-native-vector-icons/FontAwesome'

@observer
export default class Courier extends React.Component {
    constructor(props) {
        super(props)

        this._authorize = this._authorize.bind(this)
        this._signup = this._signup.bind(this)
    }

    render() {
        return <View style={ styles.container }>
            <View>
                <Text style={ styles.heading }>
                    WELCOME TO YOUR P0RTAL
                </Text>
            </View>

            <Button title="SIGN IN" onPress={ this._authorize } />

            <Button title="SIGN UP" onPress={ this._signup } />

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
                            title: 'Welcome'
                        }
                    }
                },
                visible: true,
                drawBehind: false
            }
        })
    }

    _authorize() {
        stores.P0rtal.authorize()
    }

    _signup() {
        alert('show signup screen')
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
