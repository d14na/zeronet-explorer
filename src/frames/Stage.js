import React from 'react'

import {
    Platform,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import {
    Button,
    Header,
    Icon,
    SearchBar
} from 'react-native-elements'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Shared
} from '../constants'

function _calcWidth() {
    /* Initialize device width. */
    const width = Shared.deviceWidth

    if (width > 375) {
        // Large devices (eg tablets)
        return Shared.deviceWidth - 150 // NOTE iOS value
    } else if (width > 320) {
        // Standard devices (eg most phones)
        return Shared.deviceWidth - 85 // NOTE iOS value
    } else {
        // Small devices (eg compact phones)
        return Shared.deviceWidth - 40 // NOTE iOS value
    }
}

@observer
export default class Stage extends React.Component {
    constructor(props) {
        super(props)

        /* Initialize search bar holder. */
        this.search = null

        /* Set the tag. */
        this.tag = props.tag

    }

    render() {
        function StageMenu(props) {
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
                backgroundColor={ stores.Stage.topBarColor }
                outerContainerStyles={ styles.topBar }
                innerContainerStyles={ styles.topBarContent }
                leftComponent={{}}
                centerComponent={{ text: stores.Stage.ziteTitle, style: styles.topBarTitle }}
                rightComponent={<StageMenu parent={ this } />} />

{/*
            <SearchBar
                ref={ search => this.search = search }
                icon={{ type: 'font-awesome', name: 'search' }}
                clearIcon={{ color: 'rgba(220, 90, 90, 0.35)', type: 'font-awesome', name: 'times-circle', style: { marginRight: 5 } }}
                inputStyle={ styles.searchInput }
                placeholder={ 'Search #' + stores.Stage.ziteTitle } />
*/}

            <ScrollView style={{ flex: 1 }}>
                <View style={ styles.contentContainer }>

                    { this._displayAddress() }
                    { this._displayDescription() }
                    { this._displayLastUpdate() }

                    <Button
                        containerViewStyle={ styles.mainButtons }
                        borderRadius={ 3 }
                        onPress={ () => this._openZite() }
                        icon={{ name: 'university', type: 'font-awesome' }}
                        title='OPEN ZITE' />

                    { this._displayFileList() }

                    <Text style={{ fontStyle: 'italic' }}>
                        { stores.Stage.debugLog }
                    </Text>
                </View>
            </ScrollView>

            { this._adManager() }
        </View>
    }

    componentDidMount() {

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

    _adManager() {
        if (stores.Stage.displayAds) {
            return <View style={ styles.adSpace }>
                <Text style={ styles.adSpaceText }>
                    BLOCKCHAIN AD SPACE
                </Text>
            </View>
        }
    }

    _displayAddress() {
        if (stores.Stage.ziteAddress) {
            return <View style={ styles.ziteDetails }>
                <Text style={ styles.ziteDetailsHeader }>
                    Zer0̸net Address
                </Text>
                <Text style={ styles.ziteDetailsText }>
                    { stores.Stage.ziteAddress }
                </Text>
            </View>
        }
    }

    _displayDescription() {
        if (stores.Stage.ziteAddress) {
            return <View style={ styles.ziteDetails }>
                <Text style={ styles.ziteDetailsHeader }>
                    Description
                </Text>
                <Text style={ styles.ziteDetailsText }>
                    { stores.Stage.ziteDescription }
                </Text>
            </View>
        }
    }

    _displayLastUpdate() {
        if (stores.Stage.ziteAddress) {
            return <View style={ styles.ziteDetails }>
                <Text style={ styles.ziteDetailsHeader }>
                    Last Updated
                </Text>
                <Text style={ styles.ziteDetailsText }>
                    { stores.Stage.ziteLastUpdate }
                </Text>
            </View>
        }
    }

    _bundledFileList() {
        let list = []
        let index = 0

        for (let file of stores.Stage.ziteFiles) {
            list.push(
                <Text key={ file['sha512'] } style={ styles.ziteDirectoryText }>
                    { ++index }. { file['name'] }
                    {'\n    '}Size: { file['size'] } bytes
                    {'\n    '}Verified: { file['valid'] }
                </Text>
            )
        }

        return list
    }

    _displayFileList() {
        if (stores.Stage.ziteFiles.length > 0) {
            return <View style={ styles.ziteDetails }>
                <Text style={ styles.ziteDetailsHeader }>
                    File Directory
                </Text>
                { this._bundledFileList() }
            </View>
        }
    }

    _initZite(_tag) {
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
                },
                passProps: { tag: _tag }
            }
        })

        // FIXME For Debugging Purposes ONLY
        Navigation.mergeOptions('zeronet.Stage', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        })
    }

    _openZite() {
        /* Retrieve the address. */
        const address = stores.Stage.ziteAddress

        /* Initialize the path. */
        const path = 'index.html'

        /* Set the zite address. */
        stores.Stage.openZite(address, path)
    }

}

const styles = StyleSheet.create({
    container: {
        width: _calcWidth(),
        height: '100%',
        backgroundColor: stores.Stage.backgroundColor
    },
    contentContainer: {
        // margin: 20,
        padding: 15
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

    searchInput: {
        paddingLeft: 40,
        paddingBottom: Platform.OS === 'ios' ? 0 : 9
    },

    ziteDetails: {
        marginBottom: 10
    },
    ziteDetailsHeader: {
        color: 'rgba(180, 180, 180, 1.0)',
        fontSize: 20
    },
    ziteDetailsText: {
        color: 'rgba(235, 235, 235, 1.0)',
        fontSize: 12
    },
    ziteDirectoryText: {
        color: 'rgba(235, 235, 235, 0.7)',
        fontSize: 9,
        marginLeft: 20,
        marginBottom: 5
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
