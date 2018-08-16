// @flow

import { Navigation } from 'react-native-navigation'

import { registerScreens } from './screens'
registerScreens()

/* Silence 'unneeded' yellow box alerts. */
console.ignoredYellowBox = [
    'Remote debugger',
    'Debugger and device times',
    'Warning: componentWillMount is deprecated', // FIXME RN v.0.54.0
    'Warning: componentWillReceiveProps is deprecated', // FIXME RN v.0.54.0
]

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        _animations: {
            startApp: {
                y: {
                    from: 1000,
                    to: 0,
                    duration: 500,
                    interpolation: 'accelerate',
                },
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 500,
                    interpolation: 'accelerate'
                }
            },
            push: {
                topBar: {
                    id: 'TEST',
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 500,
                        interpolation: 'accelerate'
                    }
                },
                bottomTabs: {
                    y: {
                        from: 1000,
                        to: 0,
                        duration: 500,
                        interpolation: 'decelerate',
                    },
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 500,
                        interpolation: 'decelerate'
                    }
                },
                content: {
                    y: {
                        from: 1000,
                        to: 0,
                        duration: 500,
                        interpolation: 'accelerate',
                    },
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 500,
                        interpolation: 'accelerate'
                    }
                }
            },
            pop: {
                topBar: {
                    id: 'TEST',
                    alpha: {
                        from: 1,
                        to: 0,
                        duration: 500,
                        interpolation: 'accelerate'
                    }
                },
                bottomTabs: {
                    y: {
                        from: 0,
                        to: 100,
                        duration: 500,
                        interpolation: 'accelerate',
                    },
                    alpha: {
                        from: 1,
                        to: 0,
                        duration: 500,
                        interpolation: 'accelerate'
                    }
                },
                bottomTabs: {
                    y: {
                        from: 0,
                        to: 100,
                        duration: 500,
                        interpolation: 'decelerate',
                    },
                    alpha: {
                        from: 1,
                        to: 0,
                        duration: 500,
                        interpolation: 'decelerate'
                    }
                },
                content: {
                    y: {
                        from: 0,
                        to: 1000,
                        duration: 500,
                        interpolation: 'decelerate',
                    },
                    alpha: {
                        from: 1,
                        to: 0,
                        duration: 500,
                        interpolation: 'decelerate'
                    }
                }
            }
        }
    })

    /* Initialize the (left-side) Stage sliding drawer. */
    const left = {
        component: {
            id: 'zeronet.Stage',
            name: 'zeronet.Stage',
            passProps: {
                text: 'The Main ZeroNet Stage for native content.'
            }
        }
    }

    /* Initialize the main frame stack. */
    const center = {
        stack: {
            children: [{
                component: {
                    id: 'zeronet.Startup',
                    name: 'zeronet.Startup',
                    options: {
                        topBar: {
                            visible: false,
                            animate: false,
                            drawBehind: true
                        }
                    }
                }
            }],
            options: {}
        }
    }

    /* Initialize side menu layout. */
    const sideMenu = { left, center }

    /* Initialize navigation root. */
    const root = { sideMenu }

    /* Set navigation root. */
    Navigation.setRoot({ root })
})
