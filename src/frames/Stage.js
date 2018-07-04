import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { Header } from 'react-native-elements'

import { MonoText } from '../components'

export default class Stage extends React.Component {
    constructor(props) {
        super(props)

        console.log('Stage received props', props)
    }

    render() {
        return <View style={ styles.container }>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }} />

            <MonoText style={{ color: 'rgba(255, 255, 255, 0.9)', fontFamily: 'MonoText' }}>
                WE WILL CALL THIS THE STAGE
            </MonoText>

            <Button title="Stage #1" onPress={ this._gotoIntro.bind(this) } />

            <View style={ styles.adSpace }>
                <Text style={ styles.adSpaceText }>
                    AD SPACE
                </Text>
            </View>

            <View>
                <Text style={ styles.recommendedStageText }>
                    Recommended Stage
                </Text>

                <Text style={ styles.recommendedStageText }>
                    - Media Gallery (photos, audio, videos)
                </Text>
            </View>
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
        backgroundColor: 'rgba(30, 30, 30, 0.95)'
    },
    adSpace: {
        width: '90%',
        height: 50,
        padding: 15,
        margin: 10,

        backgroundColor: 'rgba(220, 220, 220, 0.9)'
    },
    adSpaceText: {
        fontSize: 20
    },
    recommendedStageText: {
        /* Set text color to off-white. */
        color: 'rgba(220, 220, 220, 1.0)',
    }
})
