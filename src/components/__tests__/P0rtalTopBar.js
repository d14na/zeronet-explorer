import React from 'react';
import renderer from 'react-test-renderer';

import Component from '../P0rtalTopBar';

// FIXME This is the only solution we have to fix this issue
//       https://github.com/itinance/react-native-fs/issues/404
jest.mock('react-native-fs', () => {});

test('renders correctly', () => {
    const tree = renderer.create(<Component />).toJSON();
    expect(tree).toMatchSnapshot();
});
