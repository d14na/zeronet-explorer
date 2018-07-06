import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import {
    Avatar,
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

                <Button title="Sign In" onPress={ this._loadProfile.bind(this) } />

                <Button title="Sign Up" onPress={ this._loadCourier.bind(this) } />

            </View>
        }

        // title="ZN"
        // source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}

        return <View style={ styles.container }>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Avatar
                    xlarge
                    rounded
                    source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                    onPress={ this._loadProfile.bind(this) }
                    activeOpacity={ 0.7 } />

                <Button
                    onPress={ this._loadProfile.bind(this) }
                    icon={{name: 'user', type: 'font-awesome'}}
                    title='Edit Profile' />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadCourier.bind(this) }
                    icon={{name: 'at', type: 'font-awesome'}}
                    title='Courier' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadInfluence.bind(this) }
                    icon={{name: 'book', type: 'font-awesome'}}
                    title='Influence' />
            </View>

            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadStreams.bind(this) }
                    icon={{name: 'rss-square', type: 'font-awesome'}}
                    title='Streams' />
            </View>

        </View>
    }

    componentDidMount() {
        console.log('P0rtal did mount')

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        name: 'zeronet.P0rtalTopBar'
                    }
                },
                visible: true,
                drawBehind: false
            }
        })

        // Navigation.mergeOptions(this.props.componentId, {
        //     topBar: {
        //         title: {
        //             component: {
        //                 name: 'zeronet.P0rtalTopBar'
        //             }
        //         },
        //         visible: true,
        //         drawBehind: false
        //     }
        // })
        //
    }

    onNavigationButtonPressed(_buttonId) {
        console.log('onNavigationButtonPressed', _buttonId)

        if (_buttonId === 'btnCloseP0rtal') {
            this._closeP0rtal()
        }
    }

    _loadProfile() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.P0rtal.Profile'
            }
        })
    }

    _loadCourier() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Courier',
                name: 'zeronet.P0rtal.Courier',
                passProps: {
                    title: 'Courier'
                },
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

    _loadInfluence() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.P0rtal.Influence'
            }
        })
    }

    _loadStreams() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Streams',
                name: 'zeronet.P0rtal.Streams',
                passProps: {
                    title: 'Streams'
                },
                options: {
                    topBar: {
                        title: {
                            text: 'FEED'
                        }
                    }
                }
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
    // button: {
    //     flex: 1
    // },

    buttonContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
      },
      button: {
        backgroundColor: 'tomato',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      }
})
