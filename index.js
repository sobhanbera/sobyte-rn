/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : TyepscriptReact
 *
 * Purpose - app's root
 */
import {AppRegistry} from 'react-native'
import TrackPlayer from 'react-native-track-player'

import App from './App'
import AppData from './app.data.details'

import './src/i18n'
import playerServices from './src/services/playerservices'

AppRegistry.registerComponent(AppData.name, () => App)

/**
 * registering all the services (we want to provide to the user) in notification
 *
 * this services will be evaluated through the notificaions (phone/lock) of device only...
 *
 * these services should be registered just after registerComponent method or else it is providing the below warning
 * registerHeadlessTask or registerCancellableHeadlessTask called multiple times for same key 'TrackPlayer'
 */
TrackPlayer.registerPlaybackService(() => playerServices)
