const { Navigation } = require('react-native-navigation')

const { Platform } = require('react-native')

const { registerScreens } = require('./screens')

if (Platform.OS === 'android') {
    alert = (title) => {
        Navigation.showOverlay({
            component: {
                name: 'navigation.playground.alert',
                passProps: {
                    title
                },
                options: {
                    overlay: {
                        interceptTouchOutside: true
                    }
                }
            }
        })
    }
}

function start() {
    registerScreens()

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

        // Navigation.setRoot({
        //     root: {
        //         stack: {
        //             id: 'TEST',
        //             children: [
        //                 {
        //                     component: {
        //                         name: 'zeronet.WelcomeScreen'
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // })

        Navigation.setRoot({
            root: {
                sideMenu: {
                    left: {
                        component: {
                            name: 'zeronet.SocialDrawer',
                            passProps: {
                                text: 'This are social props'
                            }
                        }
                    },
                    center: {
                        component: {
                            name: 'zeronet.WelcomeScreen'
                        },
                    },
                    right: {
                        component: {
                            name: 'zeronet.PluginsDrawer',
                            passProps: {
                                text: 'These are plugins props'
                            }
                        }
                    }
                }
            }
        })

    })
}

module.exports = {
    start
}
