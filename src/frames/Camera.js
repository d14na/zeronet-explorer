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

        this._btnCancel = this._btnCancel.bind(this)
    }

    render() {
        return <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'} />

            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                <TouchableOpacity
                    onPress={ this._btnCancel }
                    style = { styles.close }>
                    <Text style={{ fontSize: 14 }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
      </View>
    }

    componentDidMount() {

    }

    _btnCancel() {
        /* Close the webview. */
        Navigation.popToRoot('zeronet.Main')
            .catch(console.log)
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
