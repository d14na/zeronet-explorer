import React from 'react';

import {Text} from 'react-native';

import {ethers} from 'ethers';
import numeral from 'numeral';

export default class MonoText extends React.Component {
    componentDidMount() {
        // alert('we are in ETHER TEXT!')

        let provider = ethers.getDefaultProvider('ropsten');

        let privateKey =
            '0x0123456789012345678901234567890123456789012345678901234567890123';
        let wallet = new ethers.Wallet(privateKey);
        let address = wallet.address;

        provider.getBlockNumber().then(blockNumber => {
            console.log('Current block number: ' + blockNumber);
            let currentBlockNumber = numeral(blockNumber).format('0,0');

            let testHash = ethers.utils.keccak256('0x42');

            this.setState({address, currentBlockNumber, testHash});
        });
    }

    state = {
        currentBlockNumber: 0,
    };

    render() {
        return (
            <Text>
                <Text>BN: {this.state.currentBlockNumber}</Text>
                <Text>aDDR: {this.state.address}</Text>
                <Text>HAsh: {this.state.testHash}</Text>
            </Text>
        );
    }
}
