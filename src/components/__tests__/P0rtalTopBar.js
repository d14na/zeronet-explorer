import React from 'react'
import Component from '../P0rtalTopBar'

import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<Component />).toJSON()
    expect(tree).toMatchSnapshot()
})
