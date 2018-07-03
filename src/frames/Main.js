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

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const source = {
            uri: 'https://github.com/d14na/zeronet-app/'
        }

        return <View style={ styles.container }>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>

            <WebView
                source={ source }
                style={ styles.webview } />

            <Button
                large
                onPress={ this._loadCanvas.bind(this) }
                icon={{name: 'envira', type: 'font-awesome'}}
                title='View Canvas' />

            <Button
                large
                onPress={ this._removeButton.bind(this) }
                icon={{name: 'fire', type: 'font-awesome'}}
                title='Remove' />
        </View>
    }

    componentDidMount() {
        console.log('Main Frame has loaded.')

        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: [
              {
                id: 'myDynamicButton',
                title: 'My Button'
              }
            ]
          }
        })
    }

    _loadCanvas() {
        console.log('open canvas')

        // Navigation.showModal({
        //   stack: {
        //     children: [{
        //       component: {
        //         name: 'zeronet.Canvas',
        //         passProps: {
        //           text: 'stack with one child'
        //         },
        //         options: {
        //             topBar: {
        //                 visible: false,
        //                 // animate: false,
        //                 drawBehind: true
        //             }
        //         }
        //       }
        //     }]
        //   }
        // })

        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.Canvas',
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

    _removeButton() {
        Navigation.mergeOptions(this.props.componentId, {
          topBar: {
            rightButtons: []
          }
        })
    }
}

const styles = StyleSheet.create({
    container: {},
    webview: {
        marginTop: 20,
        width: '100%',
        height: 200
    }
})

export default WelcomeScreen
