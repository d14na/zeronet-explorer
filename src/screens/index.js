import { Navigation } from 'react-native-navigation'

/* MAIN */
import Main from '../frames/Main'

/* CANVAS */
import Canvas from '../frames/Canvas'

/* MEDIA PLAYER */
import MediaPlayer from '../frames/Player'

/* P0RTAL */
import P0rtal from '../frames/P0rtal'
import P0rtalAccount from './P0rtal/Account'
import P0rtalChat from './P0rtal/Chat'
import P0rtalCourier from './P0rtal/Courier'
import P0rtalDiary from './P0rtal/Diary'
import P0rtalFeed from './P0rtal/Feed'
import P0rtalForum from './P0rtal/Forum'

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

    /* P0RTAL */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal)
    Navigation.registerComponent('zeronet.P0rtal.Account', () => P0rtalAccount)
    Navigation.registerComponent('zeronet.P0rtal.Chat', () => P0rtalChat)
    Navigation.registerComponent('zeronet.P0rtal.Courier', () => P0rtalCourier)
    Navigation.registerComponent('zeronet.P0rtal.Diary', () => P0rtalDiary)
    Navigation.registerComponent('zeronet.P0rtal.Feed', () => P0rtalFeed)
    Navigation.registerComponent('zeronet.P0rtal.Forum', () => P0rtalForum)

    /* STAGE */
    Navigation.registerComponent('zeronet.Stage', () => Stage)

    /* WEBVIEW */
    Navigation.registerComponent('zeronet.Webview', () => Webview)

    /* COMPONENTS */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar)
}
