import React from 'react'

import {
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

@observer
export default class Webview extends React.Component {
    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('WEBVIEW_')

        this._loadStarted = this._loadStarted.bind(this)
        this._loadEnded = this._loadEnded.bind(this)
        this._navStateChange = this._navStateChange.bind(this)
        this._onMessage = this._onMessage.bind(this)
        this._btnBack = this._btnBack.bind(this)
        this._btnClose = this._btnClose.bind(this)
        this._getSource = this._getSource.bind(this)

        /* Initialize a reference to the webview. */
        this._webview = null

        this.state = {
            // source: { uri: 'https://getbootstrap.com/docs/3.3/examples/blog/' }
            // source: { uri: 'http://185.142.236.207:43110/zitetags.bit' }
            source: { html: this.props.html }
        }
    }

    @observable _hasLoadEnded = false
    // FIXME How do we use the store without locking the observable??
    // @observable source = { html: '<h1>loading...</h1>' }

    render() {
        const SCRIPT = `
        const meta = document.createElement('meta');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
        `;

        return <View style={ styles.container }>
            <WebView
                ref={ ref => (this._webview = ref) }
                source={ this.state.source }
                scalesPageToFit={false}
                injectedJavaScript={SCRIPT}
                 />

            <View style={ styles.footer }>
                <Button
                    title='<'
                    style={ styles.footerButton }
                    onPress={ this._btnBack } />

                <Button
                    title='>'
                    style={ styles.footerButton } />

                <Button
                    title='Close'
                    style={ styles.footerButton }
                    onPress={ this._btnClose } />
            </View>
        </View>
    }

    componentWillUnmount() {
        Timer.clearTimeout(this)
    }

    componentDidMount() {

        const files = stores.Stage.ziteFiles
        console.log('*** FILES', files)

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
        console.log('pressed close button')

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
        // height: '100%'
    },
    footer: {
        flexDirection: 'row',
        width: 350,
        height: 50
    },
    footerButton: {
        flex: 1,
        width: 100
    }
})
