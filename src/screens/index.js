import { Navigation } from 'react-native-navigation'

/* Initialize sliding drawers. */
import MainFrame from '../frames/Main'

import StageFrame from '../frames/Stage'

import P0rtalFrame from '../frames/P0rtal'
import P0rtalAccount from './P0rtal/Account'

import Canvas from '../frames/Canvas'

import SecondTabScreen from './SecondTabScreen'

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('zeronet.Main', () => MainFrame)

    Navigation.registerComponent('zeronet.Stage', () => StageFrame)

    Navigation.registerComponent('zeronet.P0rtal', () => P0rtalFrame)
    Navigation.registerComponent('zeronet.P0rtal.Account', () => P0rtalAccount)

    Navigation.registerComponent('zeronet.Canvas', () => Canvas)

    Navigation.registerComponent('zeronet.SecondTabScreen', () => SecondTabScreen)
}
