import { Navigation } from 'react-native-navigation'

/* MAIN */
import Main from '../frames/Main'

/* CANVAS */
import Canvas from '../frames/Canvas'

/* MEDIA PLAYER */
import MediaPlayer from '../frames/Player'

/* PLAYBACK */
import PlaybackViewer from '../frames/Playback'

/* P0RTAL */
import P0rtal from '../frames/P0rtal'
import P0rtalCourier from './P0rtal/Courier'
import P0rtalHelp from './P0rtal/Help'
import P0rtalInfluence from './P0rtal/Influence'
import P0rtalProfile from './P0rtal/Profile'
import P0rtalStreams from './P0rtal/Streams'

/* STAGE */
import Stage from '../frames/Stage'

/* WEBVIEW */
import Webview from '../frames/Webview'

/* COMPONENTS */
import { P0rtalTopBar } from '../components'

/* Register all screens of the app (including internal ones). */
export function registerScreens() {
    /* MAIN */
    Navigation.registerComponent('zeronet.Main', () => Main)

    /* CANVAS */
    Navigation.registerComponent('zeronet.Canvas', () => Canvas)

    /* MEDIA PLAYER */
    Navigation.registerComponent('zeronet.Player', () => MediaPlayer)

    /* PLAYBACK VIEWER */
    Navigation.registerComponent('zeronet.Playback', () => PlaybackViewer)

    /* P0RTAL */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal)
    Navigation.registerComponent('zeronet.P0rtal.Courier', () => P0rtalCourier)
    Navigation.registerComponent('zeronet.P0rtal.Help', () => P0rtalHelp)
    Navigation.registerComponent('zeronet.P0rtal.Influence', () => P0rtalInfluence)
    Navigation.registerComponent('zeronet.P0rtal.Profile', () => P0rtalProfile)
    Navigation.registerComponent('zeronet.P0rtal.Streams', () => P0rtalStreams)

    /* STAGE */
    Navigation.registerComponent('zeronet.Stage', () => Stage)

    /* WEBVIEW */
    Navigation.registerComponent('zeronet.Webview', () => Webview)

    /* COMPONENTS */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar)
}
