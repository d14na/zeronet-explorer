// @flow

// import App from './src/app'

// import { AppRegistry } from 'react-native'
// import App from './App'
// import { name as appName } from './app.json'
//
// AppRegistry.registerComponent(appName, () => App)

import { Navigation } from 'react-native-navigation'
import App from './App'

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App)

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'navigation.playground.WelcomeScreen'
            }
        }
    })
})
