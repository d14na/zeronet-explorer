import React from 'react';

import {Platform, Text} from 'react-native';

import {ethers} from 'ethers';
import numeral from 'numeral';

export default class MonoText extends React.Component {
    componentDidMount(){
        // alert('we are in ETHER TEXT!')

        let provider = ethers.getDefaultProvider('ropsten');

        provider.getBlockNumber().then(blockNumber => {
            console.log('Current block number: ' + blockNumber);
            let currentBlockNumber = numeral(blockNumber).format('0,0');

            this.setState({currentBlockNumber});
        });
    }

    state = {
        currentBlockNumber: 0,
    };

    render() {
        return (
            <Text>
                <Text>{this.state.currentBlockNumber}</Text>
            </Text>
        );
    }
}
