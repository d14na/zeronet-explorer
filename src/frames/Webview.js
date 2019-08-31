import React from 'react'

import {
    Platform,
    StyleSheet,
    ScrollView,
    Text,
    View,
    WebView
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Button,
    Icon
} from 'react-native-elements'

import {
    Shared,
    Styles
} from '../constants'

import Timer from 'react-native-timer'

// import RNFS from 'react-native-fs'

@observer
export default class Webview extends React.Component {
    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('WEBVIEW_')

        this._loadStarted = this._loadStarted.bind(this)
        this._loadEnded = this._loadEnded.bind(this)
        this._loadError = this._loadError.bind(this)
        this._navStateChange = this._navStateChange.bind(this)
        this._onMessage = this._onMessage.bind(this)
        this._getSource = this._getSource.bind(this)

        this._btnBack = this._btnBack.bind(this)
        this._btnForward = this._btnForward.bind(this)
        this._btnShare = this._btnShare.bind(this)
        this._btnTabs = this._btnTabs.bind(this)
        this._btnMenu = this._btnMenu.bind(this)

        /* Initialize a reference to the webview. */
        this._webview = null

        /* Initialize target. */
        let target = null

        // FIXME Problem with Android loading local files
        //       Temporarily use 0net proxy
        if (Platform.OS === 'android') {
            // target = 'file://' + RNFS.DocumentDirectoryPath + this.props.target
        } else {
            // target = RNFS.DocumentDirectoryPath + this.props.target
        }

        this.state = {
            source: { uri: target }
        }
    }

    @observable _hasLoadEnded = false
    // FIXME How do we use the store without locking the observable??
    // @observable source = { html: '<h1>loading...</h1>' }

    render() {

        return <View style={ styles.container }>
            <WebView
                ref={ ref => (this._webview = ref) }
                source={ this.state.source }
                style={ styles.webview }
                domStorageEnabled={ true }
                javaScriptEnabled={ true }
                startInLoadingState={ true }
                mixedContentMode={ 'always' }
                onLoadStart={ this._loadStarted }
                onLoadEnd={ this._loadEnded }
                onError={ this._loadError }
                onNavigationStateChange={ this._navStateChange }
                onMessage={ this._onMessage } />

            <View style={ styles.navBar }>
                <Icon
                    name='arrow-back'
                    containerStyle={ styles.navBarButtonContainer }
                    iconStyle={ styles.navBarButton }
                    onPress={ this._btnBack } />

                <Icon
                    name='arrow-forward'
                    containerStyle={ styles.navBarButtonContainer }
                    iconStyle={ styles.navBarButtonInactive }
                    onPress={ this._btnForward } />

                <Icon
                    name='screen-share'
                    containerStyle={ styles.navBarButtonContainer }
                    iconStyle={ styles.navBarButton }
                    onPress={ this._btnShare } />

                <Icon
                    name='view-carousel'
                    containerStyle={ styles.navBarButtonContainer }
                    iconStyle={ styles.navBarButtonInactive }
                    onPress={ this._btnTabs } />

                <Icon
                    name='more-horiz'
                    containerStyle={ styles.navBarButtonContainer }
                    iconStyle={ styles.navBarButton }
                    onPress={ this._btnMenu } />
            </View>
        </View>
    }

    componentWillUnmount() {
// FIXME Where do we control the data updates when viewing a Zite??
        // Timer.clearTimeout(this)
    }

    componentDidMount() {

    }

    _getSource() {
        // NOTE We need to clone this to avoid RN freezing the object
        // https://github.com/mobxjs/mobx/blob/master/CHANGELOG.md#known-issues
        return { ...this.source }
    }

    _btnClose() {
        /* Close the webview. */
        Navigation.popToRoot('zeronet.Main')
            .catch(console.log)
    }

    _btnBack() {
        console.log('pressed Webview back button')

        // /* Close the webview. */
        Navigation.popTo('zeronet.Main')
            .catch(console.log)
    }

    _btnForward() {
        console.log('pressed Webview forward button')
    }

    _btnShare() {
        console.log('pressed Share button')
    }

    _btnTabs() {
        console.log('pressed Tabs button')
    }

    _btnMenu() {
        console.log('pressed Menu button')
    }

    _onMessage() {
        // TODO Update this stub
    }

    _injectTest() {
        console.log('_injectTest')

        this._webview.injectJavaScript(`alert('see me comin?')`)

        console.log('alert injected, did you see it?')
    }

    _loadStarted() {
        console.log('_loadStarted')
    }

    _loadEnded() {
        console.log('_loadEnded')
    }

    _loadError(err) {
        console.log('_loadError', err)
    }

    _navStateChange(_event) {
        // console.log('_navStateChange event', _event)

        // console.log('_navStateChange Page Title' , _event.title)

        if (_event.loading === false && _event.title === 'ZeroBlog Demo') {
            // if (!this._hasLoadEnded) {
                // this._hasLoadEnded = true

                // this._initJquery()
            // }
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1,
        width: '100%',
        marginTop: 20
        // height: '100%'
    },
    navBar: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        justifyContent: 'space-around',
        // alignItems: 'center',
        backgroundColor: 'rgba(210, 210, 210, 0.85)'
    },
    navBarButton: {
        color: 'rgba(90, 90, 90, 0.9)'
    },
    navBarButtonInactive: {
        color: 'rgba(180, 180, 180, 0.9)'
    },
    navBarButtonContainer: {
        flex: 1
    }
})
