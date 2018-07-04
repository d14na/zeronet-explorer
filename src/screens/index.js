import { Navigation } from 'react-native-navigation'

/* Initialize sliding drawers. */
import Main from '../frames/Main'
import MediaPlayer from '../frames/Player'
import Webview from '../frames/Webview'

import StageFrame from '../frames/Stage'

import P0rtalFrame from '../frames/P0rtal'
import P0rtalAccount from './P0rtal/Account'


import SecondTabScreen from './SecondTabScreen'

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('zeronet.Main', () => Main)
    Navigation.registerComponent('zeronet.Player', () => MediaPlayer)
    Navigation.registerComponent('zeronet.Webview', () => Webview)

    Navigation.registerComponent('zeronet.Stage', () => StageFrame)

    Navigation.registerComponent('zeronet.P0rtal', () => P0rtalFrame)
    Navigation.registerComponent('zeronet.P0rtal.Account', () => P0rtalAccount)


    Navigation.registerComponent('zeronet.SecondTabScreen', () => SecondTabScreen)
}
