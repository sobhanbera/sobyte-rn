/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - to export all the redux related codes
 */

export * from './store'
export * from './reducers'

import {ThemeState, MusicConfigState} from './reducers'

/**
 * a interface which is a blueprint for all the states combined
 * just add other state here as new and new states are being created...
 *
 * this modal could be used in useSelector for the type of state like below
 * const themeState = useSelector((state: SobyteState) => state.theme)
 *
 */
export interface SobyteState {
    theme: ThemeState
    musicconfig: MusicConfigState
}
