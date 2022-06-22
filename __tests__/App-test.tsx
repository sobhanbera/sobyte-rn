/**
 * @format
 */

import 'react-native'
import React from 'react'
import App from '../App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const response: any = {} // just a bare variable to reduce error in resolve statement below...
global.fetch = jest.fn(
    () => new Promise((resolve, _reject) => resolve(response)),
)
jest.mock('react-native-gesture-handler', () => {})

it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})
