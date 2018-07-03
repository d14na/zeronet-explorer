const { Navigation } = require('react-native-navigation')

const { Platform } = require('react-native')

const { registerScreens } = require('./screens')

/* Remove yellow box alerts. */
console.ignoredYellowBox = ['Remote debugger']

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

        const left = {
            component: {
                name: 'zeronet.Stage',
                passProps: {
                    text: 'The Main ZeroNet Stage for native content.'
                }
            }
        }

        const right = {
            component: {
                name: 'zeronet.P0rtal',
                passProps: {
                    text: 'Suite of built-in decentralized features and services.'
                }
            }
        }

        const center = {
            stack: {
                children: [{
                    component: {
                        name: 'zeronet.Main'
                    }
                }, {
                    component: {
                        name: 'zeronet.Canvas'
                    }
                }],
                options: {}
            }
        }

        const sideMenu = { left, center, right }

        const root = { sideMenu }

        Navigation.setRoot({ root })
    })
}

module.exports = { start }
