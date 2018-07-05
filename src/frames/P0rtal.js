import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import {
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage
} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'

import { MonoText } from '../components'

export default class P0rtal extends React.Component {
    constructor(props) {
        super(props)

        console.log('P0rtal received props', props)

        this.state = {
            authorized: true
        }
    }

    render() {
        if (!this.state.authorized) {
            return <View style={ styles.container }>
                <View>
                    <Text style={ styles.heading }>
                        SIGN IN
                    </Text>
                </View>

                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={ this._someFunction }/>
                <FormValidationMessage>Error message</FormValidationMessage>

                <Button title="Sign In" onPress={ this._openAccount.bind(this) } />

                <Button title="Sign Up" onPress={ this._loadCourier.bind(this) } />

            </View>
        }

        return <View style={ styles.container }>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._openAccount.bind(this) }
                    icon={{name: 'globe', type: 'font-awesome'}}
                    title='Profile' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadCourier.bind(this) }
                    icon={{name: 'fire', type: 'font-awesome'}}
                    title='Courier' />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._openAccount.bind(this) }
                    icon={{name: 'globe', type: 'font-awesome'}}
                    title='Activity' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadCourier.bind(this) }
                    icon={{name: 'fire', type: 'font-awesome'}}
                    title='Chat' />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._openAccount.bind(this) }
                    icon={{name: 'globe', type: 'font-awesome'}}
                    title='Forum' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadCourier.bind(this) }
                    icon={{name: 'fire', type: 'font-awesome'}}
                    title='Blog' />
            </View>

        </View>
    }

    componentDidMount() {
        console.log('P0rtal did mount')

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: 'P0RTAL'
                },
                rightButtons: [
                    {
                        id: 'btnCloseP0rtal',
                        title: '[ X ]'
                    }
                ],
                visible: true,
                animate: true,
                drawBehind: false
            }
        })

        // Navigation.mergeOptions(this.props.componentId, {
        //     topBar: {
        //         title: {
        //             text: 'Pushed screen title'
        //         }
        //     }
        // })

    }

    onNavigationButtonPressed(_buttonId) {
        console.log('onNavigationButtonPressed', _buttonId)

        if (_buttonId === 'btnCloseP0rtal') {
            this._closeP0rtal()
        }
    }

    _loadCourier() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.P0rtal.Courier',
                options: {
                    topBar: {
                        title: {
                            text: 'COURIER'
                        }
                    }
                }
            }
        })
    }

    _openAccount() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.P0rtal.Account'
            }
        })
    }

    _someFunction() {

    }

    _loadScreen() {
        console.log('goto screen')

        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.Player',
                options: {
                    // topBar: {
                    //     title: {
                    //         text: 'Pushed screen title'
                    //     }
                    // },
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    },
                    rightButtons: [
                        {
                            id: 'buttonOne',
                            icon: require('../../img/one.png')
                        }
                    ]
                }
            }
        })
    }

    _closeP0rtal() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                right: {
                    visible: false
                }
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        width: 350,   // FIXME Retrieve device width and calculate static value
        height: '100%',

        backgroundColor: 'rgba(30, 30, 30, 0.95)',

        padding: 20
    },
    heading: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        flex: 1
    }
})
