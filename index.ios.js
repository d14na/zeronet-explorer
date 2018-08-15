// @flow

import { Client } from 'bugsnag-react-native'
const bugsnag = new Client('39cb0d55dbf7da980a54e646595be44a')

import App from './src/app'

// import { Navigation } from 'react-native-navigation'
// import App from './App'
//
// /* Silence 'unneeded' yellow box alerts. */
// console.ignoredYellowBox = [
//     'Remote debugger',
//     'Debugger and device times',
//     'Warning: componentWillMount is deprecated', // FIXME RN v.0.54.0
//     'Warning: componentWillReceiveProps is deprecated', // FIXME RN v.0.54.0
// ]
//
// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App)
//
// Navigation.events().registerAppLaunchedListener(() => {
//     Navigation.setRoot({
//         root: {
//             component: {
//                 name: 'navigation.playground.WelcomeScreen'
//             }
//         }
//     })
// })
