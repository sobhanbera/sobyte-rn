/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - utils for music api
 */

import Lodash from 'lodash'
import {SearchOptions} from '@/schemas'
import {
    LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED,
    MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE,
    MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE,
    PWA_INSTALLABILITY_STATUS_UNKNOWN,
} from '@/configs'

export const fv: any = (input: any, query: any, justOne: boolean = false) => {
    const iterate: any = (x: any, y: any) => {
        var r = []

        x.hasOwnProperty(y) && r.push(x[y])
        if (justOne && x.hasOwnProperty(y)) {
            return r.shift()
        }

        if (x instanceof Array) {
            for (let i = 0; i < x.length; i++) {
                r = r.concat(iterate(x[i], y))
            }
        } else if (x instanceof Object) {
            const c = Object.keys(x)
            if (c.length > 0) {
                for (let i = 0; i < c.length; i++) {
                    r = r.concat(iterate(x[c[i]], y))
                }
            }
        }
        return r.length == 1 ? r.shift() : r
    }

    let d = query.split(':'),
        v = input
    for (let i = 0; i < d.length; i++) {
        v = iterate(v, d[i])
    }
    return v
}

/**
 * HH:MM:ss to milliseconds/seconds...
 * @param v a time string in format of HH:MM:ss for example 3:45:29
 * @returns the number of milliseconds the time holds
 */
export const hms2ms = (v: any, returnInSecond: boolean = false) => {
    try {
        let p = v.split(':'),
            s = 0,
            f = 1
        while (p.length > 0) {
            s += f * parseInt(p.pop(), 10)
            f *= 60
        }

        // if second is provided then return the seconds counts
        if (returnInSecond) return s
        // else millisecond, the default option
        return s * 1e3
    } catch (e) {
        return 0
    }
}

export const createApiContext = (ytcfg: any) => {
    return {
        context: {
            capabilities: {},
            client: {
                clientName: ytcfg.INNERTUBE_CLIENT_NAME,
                clientVersion: ytcfg.INNERTUBE_CLIENT_VERSION,
                experimentIds: [],
                experimentsToken: '',
                gl: ytcfg.GL,
                hl: ytcfg.HL,
                locationInfo: {
                    locationPermissionAuthorizationStatus:
                        LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED,
                },
                musicAppInfo: {
                    musicActivityMasterSwitch:
                        MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE,
                    musicLocationMasterSwitch:
                        MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE,
                    pwaInstallabilityStatus: PWA_INSTALLABILITY_STATUS_UNKNOWN,
                },
                utcOffsetMinutes: -new Date().getTimezoneOffset(),
            },
            request: {
                internalExperimentFlags: [
                    {
                        key: 'force_music_enable_outertube_tastebuilder_browse',
                        value: 'true',
                    },
                    {
                        key: 'force_music_enable_outertube_playlist_detail_browse',
                        value: 'true',
                    },
                    {
                        key: 'force_music_enable_outertube_search_suggestions',
                        value: 'true',
                    },
                ],
                sessionIndex: {},
            },
            user: {
                enableSafetyMode: false,
            },
        },
    }
}

export const getCategoryURI = (categoryName: SearchOptions) => {
    var b64Key = ''
    switch (categoryName) {
        case 'SONG':
            b64Key = 'RAAGAAgACgA'
            break
        case 'VIDEO':
            b64Key = 'BABGAAgACgA'
            break
        case 'ALBUM':
            b64Key = 'BAAGAEgACgA'
            break
        case 'ARTIST':
            b64Key = 'BAAGAAgASgA'
            break
        case 'PLAYLIST':
            b64Key = 'BAAGAAgACgB'
            break
    }

    if (b64Key.length > 0) {
        return `Eg-KAQwIA${b64Key}MABqChAEEAMQCRAFEAo` // new b64 key for the fetching mechanism
        // return `Eg-KAQwIA${b64Key}MABqChAEEAMQCRAFEAo%3D` previously
    } else {
        return null
    }
}

export const buildEndpointContext = (
    typeName: SearchOptions,
    browseId: string,
) => {
    return {
        browseEndpointContextSupportedConfigs: {
            browseEndpointContextMusicConfig: {
                pageType: `MUSIC_PAGE_TYPE_${Lodash.upperCase(typeName)}`,
            },
        },
        browseId: browseId,
    }
}

const MusicUtils = {
    buildEndpointContext,
    createApiContext,
    fv,
    getCategoryURI,
    hms2ms,
}
export default MusicUtils
