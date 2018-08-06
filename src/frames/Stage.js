import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Button,
    Header,
    Icon,
    SearchBar
} from 'react-native-elements'

import { MonoText } from '../components'

export default class Stage extends React.Component {
    @observable debug = 'loading...'

    constructor(props) {
        super(props)

        console.log('Stage received props', props)
    }

    render() {
        function MyCustomRightComponent(props) {
            /* Retrieve the parent. */
            const parent = props.parent

            return <Icon
                name='window-close'
                type='font-awesome'
                color='#fff'
                onPress={ parent._closeStage.bind(parent) } />
        }

        return <View style={ styles.container }>
            <Header
                backgroundColor='#cccc33'
                outerContainerStyles={ styles.topBar }
                innerContainerStyles={ styles.topBarContent }
                leftComponent={{}}
                centerComponent={{ text: '[Z#] ZER0NET: GETTING STARTED GUIDE IN 5 MINUTES', style: styles.topBarTitle }}
                rightComponent={<MyCustomRightComponent parent={ this } />} />

            <SearchBar
                ref={ search => this.search = search }
                icon={{ type: 'font-awesome', name: 'search' }}
                clearIcon={{ color: 'rgba(220, 90, 90, 0.35)', type: 'font-awesome', name: 'times-circle', style: { marginRight: 5 } }}
                inputStyle={{ paddingLeft: 40, paddingBottom: 9 }}
                placeholder='Search #GettingStarted' />

            <ScrollView style={{ flex: 1 }}>
                <View style={{ margin: 20, padding: 20, backgroundColor: 'rgba(30, 120, 60, 0.2)'}}>
                    <Text style={{ fontStyle: 'italic' }}>
                        { this.debug }
                    </Text>
                </View>
            </ScrollView>


            <View style={ styles.adSpace }>
                <Text style={ styles.adSpaceText }>
                    AD SPACE
                </Text>
            </View>
        </View>
    }

    _closeStage() {
        /* Close the webview. */
        Navigation.popTo('zeronet.Main')
            .catch(console.log)

        console.log('closing id', this.props.componentId)

        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: false
                }
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
    topBar: {
        padding: 10,
        height: 56
    },
    topBarContent: {
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    topBarTitle: {
        width: '65%',
        color: '#fff',
        fontSize: 20
    },
    adSpace: {
        width: '100%',
        height: 50,
        padding: 15,
        // margin: 10,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(90, 220, 220, 0.9)'
    },
    adSpaceText: {
        fontSize: 20
    },
    recommendedStageText: {
        /* Set text color to off-white. */
        color: 'rgba(220, 220, 220, 1.0)',
    }
})
