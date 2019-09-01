import {Navigation} from 'react-native-navigation';

/* STARTUP */
import Startup from '../frames/Startup';

/* CAMERA */
import Camera from '../frames/Camera';

/* CANVAS */
import Canvas from '../frames/Canvas';

/* GAMEPAD */
import Player0ne from '../frames/Player0ne';

/* P0RTAL */
import P0rtal from '../frames/P0rtal';

import {
    C0urier as P0rtalC0urier,
    Chans as P0rtalChans,
    Help as P0rtalHelp,
    Influence as P0rtalInfluence,
    Profile as P0rtalProfile,
    Signin as P0rtalSignin,
    Signup as P0rtalSignup,
} from './P0rtal';

/* STAGE */
import Stage from '../frames/Stage';

/* STUDIO */
import Studio from '../frames/Studio';

/* WEBVIEW */
import Webview from '../frames/Webview';

/* COMPONENTS */
import {P0rtalTopBar} from '../components';

/* Register all screens of the app (including internal ones). */
export function registerScreens() {
    /* Startup frame */
    Navigation.registerComponent('zeronet.Main', () => Startup);

    /* Photo and Video Camera */
    Navigation.registerComponent('zeronet.Camera', () => Camera);

    /* Graphics art & (lottie-style) animation canvas */
    Navigation.registerComponent('zeronet.Canvas', () => Canvas);

    /* Player0ne Gamepad Controller */
    Navigation.registerComponent('zeronet.Player0ne', () => Player0ne);

    /* Personalized user p0rtal */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal);
    Navigation.registerComponent('zeronet.P0rtal.C0urier', () => P0rtalC0urier);
    Navigation.registerComponent('zeronet.P0rtal.Chans', () => P0rtalChans);
    Navigation.registerComponent('zeronet.P0rtal.Help', () => P0rtalHelp);
    Navigation.registerComponent(
        'zeronet.P0rtal.Influence',
        () => P0rtalInfluence,
    );
    Navigation.registerComponent('zeronet.P0rtal.Profile', () => P0rtalProfile);
    Navigation.registerComponent('zeronet.P0rtal.Signin', () => P0rtalSignin);
    Navigation.registerComponent('zeronet.P0rtal.Signup', () => P0rtalSignup);

    /* Contextual stage */
    Navigation.registerComponent('zeronet.Stage', () => Stage);

    /* Audio and visual media studio */
    Navigation.registerComponent('zeronet.Studio', () => Studio);

    /* Standard webview */
    Navigation.registerComponent('zeronet.Webview', () => Webview);

    /* Navigational Components */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar);
}
