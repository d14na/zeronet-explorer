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
export function registerScreens(store: {}, Provider: {}) {
    /* MAIN */
    Navigation.registerComponent('zeronet.Main', () => Main, store, Provider)

    /* CANVAS */
    Navigation.registerComponent('zeronet.Canvas', () => Canvas, store, Provider)

    /* MEDIA PLAYER */
    Navigation.registerComponent('zeronet.Player', () => MediaPlayer, store, Provider)

    /* PLAYBACK VIEWER */
    Navigation.registerComponent('zeronet.Playback', () => PlaybackViewer, store, Provider)

    /* P0RTAL */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal, store, Provider)
    Navigation.registerComponent('zeronet.P0rtal.Courier', () => P0rtalCourier, store, Provider)
    Navigation.registerComponent('zeronet.P0rtal.Help', () => P0rtalHelp, store, Provider)
    Navigation.registerComponent('zeronet.P0rtal.Influence', () => P0rtalInfluence, store, Provider)
    Navigation.registerComponent('zeronet.P0rtal.Profile', () => P0rtalProfile, store, Provider)
    Navigation.registerComponent('zeronet.P0rtal.Streams', () => P0rtalStreams, store, Provider)

    /* STAGE */
    Navigation.registerComponent('zeronet.Stage', () => Stage, store, Provider)

    /* WEBVIEW */
    Navigation.registerComponent('zeronet.Webview', () => Webview, store, Provider)

    /* COMPONENTS */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar, store, Provider)
}
