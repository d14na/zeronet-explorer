import React from 'react';

import {Platform, StyleSheet, Text} from 'react-native';

class MonoText extends React.Component {
    render() {
        return <Text {...this.props} style={[this.props.style, styles.font]} />;
    }
}

const styles = StyleSheet.create({
    font: {
        fontFamily: Platform.OS === 'ios' ? 'Space Mono' : 'SpaceMono',
    },
});

export default MonoText;
