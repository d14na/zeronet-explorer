import '../../shim'

import React from 'react'

import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native'

import {
    Button,
    ButtonGroup,
    Icon,
    SearchBar
} from 'react-native-elements'

import { Navigation } from 'react-native-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Shared,
    Styles
} from '../constants'

import Peer0 from '../lib/peer0'
import net from 'net'

@observer
export default class StartupFrame extends React.Component {
    @observable searchVal = ''
    @observable selectedIndex = 1

    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('STARTUP_')

        this._handleSearchInput = this._handleSearchInput.bind(this)
        this._handleSearchSubmit = this._handleSearchSubmit.bind(this)
        this._openScanner = this._openScanner.bind(this)
        this._updateIndex = this._updateIndex.bind(this)

        this._initZite = this._initZite.bind(this)
        this._pex = this._pex.bind(this)
    }

    render() {
        const buttons = ['Recent', 'Favorites', 'Trending']

        return <ScrollView>
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Icon
                        name='qrcode'
                        type='font-awesome'
                        color='rgba(134, 147, 158, 1.0)'
                        underlayColor='rgba(57, 62, 66, 1.0)'
                        size={ 28 }
                        containerStyle={ styles.btnQrCode }
                        onPress={ this._openScanner } />

                    <SearchBar
                        ref={ search => this.search = search }
                        icon={{ type: 'font-awesome', name: 'hashtag' }}
                        clearIcon={{ color: 'rgba(220, 90, 90, 0.35)', type: 'font-awesome', name: 'times-circle', style: { marginRight: 5 } }}
                        containerStyle={ styles.searchInput }
                        inputStyle={ styles.searchInputText }
                        placeholder='Where will you explore next?'
                        onChangeText={ this._handleSearchInput }
                        onSubmitEditing={ this._handleSearchSubmit } />
                </View>

                <View style={ styles.contentContainer }>
                    <Image
                        source={ require('../../res/img/startup-banner.png') }
                        resizeMode='stretch'
                        style={ styles.mainBanner } />

                    <ButtonGroup
                          onPress={ this._updateIndex }
                          selectedIndex={ this.selectedIndex }
                          buttons={ buttons }
                          containerStyle={{ height: 30 }} />

                      { this._displayZites() }
                </View>
            </View>
        </ScrollView>
    }

    componentDidAppear() {
        console.log('RNN', 'CTB.componentDidAppear')
    }

    componentDidDisappear() {
        console.log('RNN', `CTB.componentDidDisappear`)
    }

    componentDidMount() {
        /* Localize this. */
        const self = this

        /* Handle registered app links. */
// FIXME Android bug prevents deep linking when app is in BACKGROUND
//       https://stackoverflow.com/a/47573863/514914
        Linking.getInitialURL().then((url) => {
            if (url) {
console.log('DEEP LINK DETECTED! Clicked url was: ' + url)

                /* Parse zite address. */
                if (url.slice(0, 23) === 'http://127.0.0.1:43110/') {
                    const target = url.slice(23)
                } else if (url.slice(0, 16) === 'https://0net.io/') {
                    const target = url.slice(16)
                } else if (url.slice(0, 15) === 'http://0net.io/') {
                    const target = url.slice(15)
                } else if (url.slice(0, 7) === '0net://') {
                    const target = url.slice(7)
                } else if (url.slice(0, 7) === 'zero://') {
                    const target = url.slice(7)
                }

                /* Initialize the deep linked zite. */
                self._initZite(target)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    componentWillUnmount() {
        console.log('RNN', `CTB.componentWillUnmount`)
    }

    _handleSearchInput(_val) {
        console.log('handle search', _val)
        this.searchVal = _val
    }

    _handleSearchSubmit() {
        // console.log('handle search', _val)
        const searchVal = this.searchVal

// FIXME We must validate this as an address, or else perform a search
        // this._initZite(searchVal)

        alert(`Oops! ${searchVal} cannot be found.`)
    }

    _openScanner() {
        /* Open the WebView. */
        Navigation.push('zeronet.Main', {
            component: {
                id: 'zeronet.Camera',
                name: 'zeronet.Camera',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    }
                },
                // passProps: { target }
            }
        })
    }

    _updateIndex(_selectedIndex) {
        this.selectedIndex = _selectedIndex
    }

    _displayZites() {
        if (this.selectedIndex == 0) {
            return <View style={ [Styles.centerView, styles.notFound] }>
                <Text style={ styles.notFoundText }>no recent zites</Text>
            </View>
        }

        if (this.selectedIndex == 1) {
            return <View>
                <Button
                    large
                    containerViewStyle={ styles.mainButtons }
                    borderRadius={ 3 }
                    onPress={ () => this._test() }
                    icon={{ name: 'support', type: 'font-awesome' }}
                    title='TEST' />

                <Button
                    large
                    containerViewStyle={ styles.mainButtons }
                    borderRadius={ 3 }
                    onPress={ () => this._initZite('1GUiDEr5E5XaFLBJBr78UTTZQgtC99Z8oa') }
                    icon={{ name: 'support', type: 'font-awesome' }}
                    title='USER GUIDE' />

                <Button
                    large
                    containerViewStyle={ styles.mainButtons }
                    borderRadius={ 3 }
                    onPress={ () => this._initZite('1ZTAGS56qz1zDDxW2Ky19pKzvnyqJDy6J') }
                    icon={{ name: 'hashtag', type: 'font-awesome' }}
                    title='ZITETAGS' />

                <Button
                    large
                    containerViewStyle={ styles.mainButtons }
                    borderRadius={ 3 }
                    onPress={ () => this._initZite('1D14naQY4s65YR6xrJDBHk9ufj2eLbK49C') }
                    icon={{ name: 'legal', type: 'font-awesome' }}
                    title='ABOUT D14NA' />
            </View>
        }

        if (this.selectedIndex == 2) {
            return <View style={ [Styles.centerView, styles.notFound] }>
                <Text style={ styles.notFoundText }>no trending zites</Text>
            </View>
        }
    }

    _test() {
        // alert(`let's request new peers from trackers`)
        // this._announce()

        alert(`let's get PEX working`)
        this._pex()
    }

    _getTrackers() {
        return [
            'zero://185.142.236.207', // Our TEST Server

            'zero://45.77.23.92',
            'zero://103.73.66.144',
            'zero://106.83.116.159',
            'zero://107.172.237.134',
            'zero://115.192.117.73',
            'zero://144.48.7.45',
            'zero://207.148.123.94',
            'zero://212.64.18.194'
        ]
    }

    async _pex() {
console.log('Peer0', Peer0)
console.log('net', net)

        /* Initailize Peer0. */
        const peer0 = new Peer0(net)
        console.log('peer0', peer0)

        const peers = await peer0.pex('1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F')
        console.log('RECEIVED PEERS', peers)
    }

    _initZite(_target, _path) {
        // FIXME If the tag is NOT an address then we need to do a
        //       ZeroName lookup to retrieve the address
        const address = _target

        // FIXME Handle the path
        const path = _path

        /* Set the zite address. */
        stores.Stage.initZite(address)

        /* Open the stage window. */
        Navigation.mergeOptions('zeronet.Stage', {
            sideMenu: {
                left: {
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
    contentContainer: {
        padding: 20
    },

    header: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 1.0)'
    },
    btnQrCode: {
        marginTop: 1,
        marginBottom: 1,
        paddingLeft: 8,
        backgroundColor: 'rgba(57, 62, 66, 1.0)'
    },
    searchInput: {
        flex: 1,
    },
    searchInputText: {
        paddingLeft: 40,
        paddingBottom: Platform.OS === 'ios' ? 0 : 9
    },

    mainBanner: {
        width: '100%',
        height: 160,

        marginTop: 25,
        marginBottom: 25
    },
    mainButtons: {
        marginTop: 10,
        borderRadius: 3
    },

    notFound: {
        height: 75
    },
    notFoundText: {
        fontStyle: 'italic'
    }
})
