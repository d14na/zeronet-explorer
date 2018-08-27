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

import { Button } from 'react-native-elements'

import {
    Shared,
    Styles
} from '../constants'

import Timer from 'react-native-timer'

import RNFS from 'react-native-fs'

/* Initialize Zer0net gateway for TEMPORARY use by Android. */
const ZERONET_TEMP_GATEWAY = 'http://185.142.236.207:43110'

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
        this._btnBack = this._btnBack.bind(this)
        this._btnClose = this._btnClose.bind(this)
        this._getSource = this._getSource.bind(this)

        /* Initialize a reference to the webview. */
        this._webview = null

        /* Initialize target. */
        let target = null

        // FIXME Problem with Android loading local files
        //       Temporarily use 0net proxy
        if (Platform.OS === 'android') {
            target = ZERONET_TEMP_GATEWAY + this.props.target
        } else {
            target = RNFS.DocumentDirectoryPath + this.props.target
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
                <Button
                    title='<'
                    style={ styles.navBarButton }
                    onPress={ this._btnBack } />

                <Button
                    title='CLOSE'
                    style={ styles.navBarButton }
                    onPress={ this._btnClose } />

                <Button
                    title='>'
                    style={ styles.navBarButton } />
            </View>
        </View>
    }

    componentWillUnmount() {
        Timer.clearTimeout(this)
    }

    componentDidMount() {

        // const files = stores.Stage.ziteFiles
        // console.log('*** FILES', files)

        // const url = 'file:///data/user/0/com.zer0net/files/1ZTAGS56qz1zDDxW2Ky19pKzvnyqJDy6J/index.html'

// console.log('***FORCE onLoadStart', url)
        // this._webview.source = this.state.source
        // this._webview.source = url

        // Timer.setInterval(this, 'test10Interval', () => {
        //     console.log('this is a 10sec Timer.setInterval, :)')
        // }, 10000)
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

        /* Close the webview. */
        Navigation.popTo('zeronet.Main')
            .catch(console.log)
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
        // width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(30, 30, 180, 0.2)'
    },
    navBarButton: {
        flex: 1
    }
})
