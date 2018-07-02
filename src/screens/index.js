import { Navigation } from 'react-native-navigation'

/* Initialize sliding drawers. */
import SocialDrawer from '../drawers/Social'
import PluginsDrawer from '../drawers/Plugins'

import WelcomeScreen from './WelcomeScreen'
import SecondTabScreen from './SecondTabScreen'
import PushedScreen from './PushedScreen'

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('zeronet.SocialDrawer', () => SocialDrawer)
    Navigation.registerComponent('zeronet.PluginsDrawer', () => PluginsDrawer)

    Navigation.registerComponent('zeronet.WelcomeScreen', () => WelcomeScreen)
    Navigation.registerComponent('zeronet.SecondTabScreen', () => SecondTabScreen)
    Navigation.registerComponent('zeronet.PushedScreen', () => PushedScreen)
}
