import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

export default class Plugins extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={ styles.container }>
            <Text>
                We should put plugins here
            </Text>

            <Button title="Intro" onPress={ this._gotoIntro.bind(this) } />
        </View>
    }

    _gotoIntro() {
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
