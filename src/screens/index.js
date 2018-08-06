import { Navigation } from 'react-native-navigation'

/* MAIN */
import Main from '../frames/Main'

/* CANVAS */
import Canvas from '../frames/Canvas'

/* GAMEPAD */
import PlayerOne from '../frames/PlayerOne'

/* P0RTAL */
import P0rtal from '../frames/P0rtal'

import {
    Courier as P0rtalCourier,
    Help as P0rtalHelp,
    Influence as P0rtalInfluence,
    Profile as P0rtalProfile,
    Streams as P0rtalStreams
} from './P0rtal'

/* STAGE */
import Stage from '../frames/Stage'

/* STUDIO */
import Studio from '../frames/Studio'

/* WEBVIEW */
import Webview from '../frames/Webview'

/* COMPONENTS */
import { P0rtalTopBar } from '../components'

/* Register all screens of the app (including internal ones). */
export function registerScreens() {
    /* Main frame */
    Navigation.registerComponent('zeronet.Main', () => Main)

    /* Graphics art & (lottie-style) animation canvas */
    Navigation.registerComponent('zeronet.Canvas', () => Canvas)

    /* PlayerOne Gamepad Controller */
    Navigation.registerComponent('zeronet.PlayerOne', () => PlayerOne)

    /* Personalized user p0rtal */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal)
    Navigation.registerComponent('zeronet.P0rtal.Courier', () => P0rtalCourier)
    Navigation.registerComponent('zeronet.P0rtal.Help', () => P0rtalHelp)
    Navigation.registerComponent('zeronet.P0rtal.Influence', () => P0rtalInfluence)
    Navigation.registerComponent('zeronet.P0rtal.Profile', () => P0rtalProfile)
    Navigation.registerComponent('zeronet.P0rtal.Streams', () => P0rtalStreams)

    /* Contextual stage */
    Navigation.registerComponent('zeronet.Stage', () => Stage)

    /* Audio and visual media studio */
    Navigation.registerComponent('zeronet.Studio', () => Studio)

    /* Standard webview */
    Navigation.registerComponent('zeronet.Webview', () => Webview)

    /* Navigational Components */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar)
}
