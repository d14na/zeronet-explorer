import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {Navigation} from 'react-native-navigation';

// import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import stores from '../../stores';

import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Shared, Styles} from '../../constants';

@observer
class Signin extends React.Component {
    constructor(props) {
        super(props);

        /* Track event. */
        Shared.TrackEvent('SIGNIN_');

        this._authorize = this._authorize.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[Styles.centerView, styles.extraBottom]}>
                    <Icon name={'id-card-o'} style={styles.icon} />

                    <Text style={styles.heading}>
                        New User Registration
                        {'\n'}coming soon...
                    </Text>

                    <Button
                        large
                        raised
                        buttonStyle={styles.incognito}
                        onPress={this._authorize}
                        icon={{name: 'user-secret', type: 'font-awesome'}}
                        title="Go Incognito"
                    />
                </View>
            </View>
        );
    }

    componentDidMount() {
        stores.P0rtal.setP0rtalTitle('Signin');

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        id: 'zeronet.P0rtalTopBar',
                        name: 'zeronet.P0rtalTopBar',
                    },
                },
                visible: true,
                drawBehind: false,
            },
        });
    }

    _authorize() {
        stores.P0rtal.authorize();
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
    },
    heading: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 32,
        textAlign: 'center',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 64,
        textAlign: 'center',
        margin: 25,
    },
    incognito: {
        // width: 200,
        // height: 50,
        marginTop: 50,
    },
    extraBottom: {
        paddingBottom: 100,
    },
});

export default Signin;
