import React from 'react'

import {
    // Button,
    StyleSheet,
    ScrollView,
    Text,
    View,
    WebView
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { Button } from 'react-native-elements'

/**
 * Main Frame
 *
 * Manages the initialization of the application.
 */
export default class MainFrame extends React.Component {
    constructor(props) {
        super(props)

        console.log('Main Frame received props', props)

        this.state = {
            debug: 'loading...'
        }
    }

    render() {
        const source = {
            uri: 'https://github.com/d14na/zeronet-explorer/'
        }

        return <View style={ styles.container }>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>

            <Text>
                { this.state.debug }
            </Text>

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadWebview.bind(this) }
                    icon={{name: 'globe', type: 'font-awesome'}}
                    title='GitHub' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadWebview.bind(this) }
                    icon={{name: 'fire', type: 'font-awesome'}}
                    title='Zer0net 101' />
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadWebview.bind(this) }
                    icon={{name: 'globe', type: 'font-awesome'}}
                    title='Play' />

                <Button
                    large
                    style={{ flex: 1, width: 150 }}
                    onPress={ this._loadWebview.bind(this) }
                    icon={{name: 'fire', type: 'font-awesome'}}
                    title='Work' />
            </View>
        </View>
    }

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: 'Zer0net Explorer'
                },
                rightButtons: [
                    {
                        id: 'btnP0rtal',
                        title: 'P0rtal'
                    }
                ]
            }
        })

        // Navigation.events().buttonPressed((_componentId, _buttonId) => {
        //     console.log('Navigation.events().buttonPressed', _componentId, _buttonId)
        // })

        // Navigation.events().onNavigationButtonPressed((_componentId, _buttonId) => {
        //     console.log('Navigation.events().onNavigationButtonPressed', _buttonId)
        // })
    }

    onNavigationButtonPressed(_buttonId) {
        console.log('onNavigationButtonPressed', _buttonId)

        if (_buttonId === 'btnP0rtal') {
            this._openP0rtal()
        }
    }

    async _goDownload() {
        const net = require('net')
        const peer0 = require('peer0')

        console.log('Making download request from Peer0')

        let response = await peer0.download(net)
        console.log('peer0 awaiting response', response)

        this.setState({ debug: response })

    }

    _loadWebview() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.Webview',
                name: 'zeronet.Webview',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    }
                }
            }
        })
    }

    _openP0rtal() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                right: {
                    visible: true
                }
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    webview: {
        marginTop: 20,
        width: '100%',
        height: 200
    }
})
