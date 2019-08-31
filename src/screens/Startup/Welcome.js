import React from 'react';

import {StyleSheet, ScrollView, Text, View} from 'react-native';

import {Navigation} from 'react-native-navigation';

// import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
// import stores from '../../stores';

import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Shared, Styles} from '../../constants';

@observer
class Welcome extends React.Component {
    constructor(props) {
        super(props);

        /* Track event. */
        Shared.TrackEvent('WELCOME_');

        this._signin = this._signin.bind(this);
        this._signup = this._signup.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[Styles.centerView, styles.extraBottom]}>
                    <View>
                        <Icon name={'id-card-o'} style={styles.icon} />
                        <Text style={styles.heading}>WELCOME TO P0RTAL</Text>
                    </View>

                    <Button
                        title="SIGN IN"
                        buttonStyle={styles.welcomeButtons}
                        onPress={this._signin}
                    />

                    <Button
                        title="SIGN UP"
                        buttonStyle={styles.welcomeButtons}
                        onPress={this._signup}
                    />
                </View>
            </View>
        );
    }

    componentDidMount() {}

    _signin() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Signin',
                name: 'zeronet.P0rtal.Signin',
            },
        });
    }

    _signup() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Signup',
                name: 'zeronet.P0rtal.Signup',
            },
        });
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
        fontSize: 20,
        textAlign: 'center',
    },
    welcomeButtons: {
        width: 250,
        height: 50,
        marginTop: 15,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 64,
        textAlign: 'center',
        margin: 25,
    },
    extraBottom: {
        paddingBottom: 100,
    },
});

export default Welcome;
