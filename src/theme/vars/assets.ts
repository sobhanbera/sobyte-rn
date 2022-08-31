/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - animations and images exports / assets exports
 */

import {SobyteAssets} from '../theme'

export default function GetAssets(): SobyteAssets {
    return {
        animations: {
            dancing_logo: require('@/assets/anims/dancing_logo.json'),
            rythm: require('@/assets/anims/rythm.json'),
        },
        audios: {},
        fonts: {},
        images: {
            logos: {
                named: require('@/assets/images/logos/named.png'),
                sobyte_white: require('@/assets/images/logos/sobyte_white.png'),
            },
            icons: {
                backward: require('@/assets/images/icons/backward.png'),
                backwardb: require('@/assets/images/icons/backwardb.png'),
                forward: require('@/assets/images/icons/forward.png'),
                forwardb: require('@/assets/images/icons/forwardb.png'),
                pause: require('@/assets/images/icons/pause.png'),
                play: require('@/assets/images/icons/play.png'),
            },
        },
        videos: {},
    }
}
