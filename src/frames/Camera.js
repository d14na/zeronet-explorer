import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { Button } from 'react-native-elements'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Shared,
    Styles
} from '../constants'

import { RNCamera } from 'react-native-camera'

@observer
export default class Camera extends React.Component {
    constructor(props) {
        super(props)

        /* Track event. */
        Shared.TrackEvent('CAMERA_')

        /* Initialize camera holder. */
        this.camera = null

        this._close = this._close.bind(this)
        this._onBarcodeRead = this._onBarcodeRead.bind(this)
    }

    render() {
        return <View style={styles.container}>
            <RNCamera
                ref={ ref => { this.camera = ref }}
                style={ styles.preview }
                type={ RNCamera.Constants.Type.back }
                flashMode={ RNCamera.Constants.FlashMode.on }
                onBarCodeRead={ this._onBarcodeRead }
                barCodeTypes={ [RNCamera.Constants.BarCodeType.qr] }
                permissionDialogTitle={ 'Camera Permission Request' }
                permissionDialogMessage={ 'We require permission to use your device\'s camera to continue.' } />

            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={ this._close }
                    style = { styles.close }>
                    <Text style={{ fontSize: 14 }}>CANCEL SCANNER</Text>
                </TouchableOpacity>
            </View>
      </View>
    }

    componentDidMount() {

    }

    _close() {
        /* Close the webview. */
        Navigation.popToRoot('zeronet.Main')
            .catch(console.log)
    }

    _onBarcodeRead(_event) {
        /* Retrieve the data from event. */
        const data = _event.data

        /* Validate the data. */
        const address = data

        if (address) {
            /* Close the camera. */
            this._close()
            
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    close: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
})
