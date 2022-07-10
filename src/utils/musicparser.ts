/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - parser methods for music api
 */

import lodash from 'lodash'

import {MusicTrackAsVideoDetails} from '@/schemas'
import MusicUtils from './music'

export const parseSearchResult = (context: any) => {
    const result: any = {
        content: [],
    }

    var sectionList = MusicUtils.fv(context, 'musicResponsiveListItemRenderer')
    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                sectionContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        const type = lodash.nth(
            MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
            0,
        )
        switch (type) {
            case 'Song':
                result.content.push(
                    Object.freeze({
                        type: lodash.lowerCase(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                0,
                            ),
                        ),
                        musicId: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:videoId',
                        ),
                        playlistId: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:playlistId',
                        ),
                        title: MusicUtils.fv(
                            lodash.nth(flexColumn, 0),
                            'runs:text',
                        ),
                        artist: (function () {
                            var a = [],
                                c: any = lodash.nth(
                                    MusicUtils.fv(
                                        lodash.nth(flexColumn, 1),
                                        'runs',
                                    ),
                                    2,
                                )
                            if (Array.isArray(c)) {
                                c = lodash.filter(c, function (o: any) {
                                    return o.navigationEndpoint
                                })
                                for (var i = 0; i < c.length; i++) {
                                    a.push({
                                        name: MusicUtils.fv(c[i], 'text'),
                                        browseId: MusicUtils.fv(
                                            c[i],
                                            'browseEndpoint:browseId',
                                        ),
                                    })
                                }
                            } else {
                                a.push({
                                    name: MusicUtils.fv(c, 'text'),
                                    browseId: MusicUtils.fv(
                                        c,
                                        'browseEndpoint:browseId',
                                    ),
                                })
                            }
                            return 1 < a.length ? a : 0 < a.length ? a[0] : a
                        })(),
                        album: (function () {
                            var c = lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs',
                                ),
                                4,
                            )
                            if (!Array.isArray(c) && c instanceof Object)
                                return {
                                    name: MusicUtils.fv(c, 'text'),
                                    browseId: MusicUtils.fv(
                                        c,
                                        'browseEndpoint:browseId',
                                    ),
                                }
                            return {}
                        })(),
                        duration: MusicUtils.hms2ms(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                6,
                            ),
                        ),
                        artworks: MusicUtils.fv(
                            sectionContext,
                            'musicThumbnailRenderer:thumbnails',
                        ),
                        params: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:params',
                        ),
                    }),
                )
                break
            case 'Video':
                result.content.push(
                    Object.freeze({
                        type: lodash.lowerCase(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                0,
                            ),
                        ),
                        musicId: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:videoId',
                        ),
                        playlistId: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:playlistId',
                        ),
                        title: MusicUtils.fv(
                            lodash.nth(flexColumn, 0),
                            'runs:text',
                        ),
                        author: lodash.nth(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                            2,
                        ),
                        views: lodash.nth(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                            4,
                        ),
                        duration: MusicUtils.hms2ms(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                6,
                            ),
                        ),
                        artworks: MusicUtils.fv(
                            sectionContext,
                            'musicThumbnailRenderer:thumbnails',
                        ),
                        params: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:params',
                        ),
                    }),
                )
                break
            case 'Artist':
                result.content.push(
                    Object.freeze({
                        type: lodash.lowerCase(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                0,
                            ),
                        ),
                        browseId: MusicUtils.fv(
                            lodash.at(sectionContext, 'navigationEndpoint'),
                            'browseEndpoint:browseId',
                        ),
                        title: MusicUtils.fv(
                            lodash.nth(flexColumn, 0),
                            'runs:text',
                        ),
                        artworks: MusicUtils.fv(
                            sectionContext,
                            'musicThumbnailRenderer:thumbnails',
                        ),
                    }),
                )
                break
            case 'EP':
            case 'Single':
            case 'Album':
                result.content.push(
                    Object.freeze({
                        type: lodash.lowerCase(
                            lodash.nth(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                                0,
                            ),
                        ),
                        browseId: MusicUtils.fv(
                            lodash.at(sectionContext, 'navigationEndpoint'),
                            'browseEndpoint:browseId',
                        ),
                        playlistId: MusicUtils.fv(
                            sectionContext,
                            'playNavigationEndpoint:playlistId',
                        ),
                        title: MusicUtils.fv(
                            lodash.nth(flexColumn, 0),
                            'runs:text',
                        ),
                        artist: lodash.nth(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                            2,
                        ),
                        year: lodash.nth(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                            4,
                        ),
                        artworks: MusicUtils.fv(
                            sectionContext,
                            'musicThumbnailRenderer:thumbnails',
                        ),
                    }),
                )
                break
            case 'Playlist':
                result.content.push(
                    Object.freeze({
                        type: lodash.lowerCase(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                        ),
                        browseId: MusicUtils.fv(
                            lodash.at(sectionContext, 'navigationEndpoint'),
                            'browseEndpoint:browseId',
                        ),
                        title: MusicUtils.fv(
                            lodash.nth(flexColumn, 0),
                            'runs:text',
                        ),
                        author: lodash.nth(
                            MusicUtils.fv(
                                lodash.nth(flexColumn, 1),
                                'runs:text',
                            ),
                            3,
                        ),
                        count: lodash.toNumber(
                            lodash.nth(
                                lodash.words(
                                    lodash.nth(
                                        MusicUtils.fv(
                                            lodash.nth(flexColumn, 1),
                                            'runs:text',
                                        ),
                                        5,
                                    ),
                                ),
                                0,
                            ),
                        ),
                        artworks: MusicUtils.fv(
                            sectionContext,
                            'musicThumbnailRenderer:thumbnails',
                        ),
                    }),
                )
                break
            default:
                break
        }
    })
    return result
}

export const parseSongSearchResult = (context: any) => {
    const result: any = {
        content: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData', true),
    }

    var sectionList = MusicUtils.fv(
        context,
        'musicResponsiveListItemRenderer',
        true,
    )

    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = MusicUtils.fv(
            sectionContext,
            'musicResponsiveListItemFlexColumnRenderer',
            true,
        )

        result.content.push({
            type: 'song',
            musicId: MusicUtils.fv(
                sectionContext,
                'playNavigationEndpoint:videoId',
                true,
            ),
            playlistId: MusicUtils.fv(
                sectionContext,
                'playNavigationEndpoint:playlistId',
            ),
            title: MusicUtils.fv(flexColumn[0], 'runs:text', true),
            artists: (function () {
                var a = [],
                    c = MusicUtils.fv(flexColumn[1], 'runs')
                if (Array.isArray(c)) {
                    c = lodash.filter(c, function (o: any) {
                        return o.navigationEndpoint
                    })
                    for (var i = 0; i < c.length; i++) {
                        let browseId = MusicUtils.fv(
                            c[i],
                            'browseEndpoint:browseId',
                            true,
                        )
                        if (browseId.startsWith('UC')) {
                            a.push({
                                name: MusicUtils.fv(c[i], 'text', true),
                                browseId,
                            })
                        }
                    }
                } else {
                    let browseId = MusicUtils.fv(
                        c,
                        'browseEndpoint:browseId',
                        true,
                    )
                    if (browseId.startsWith('UC')) {
                        a.push({
                            name: MusicUtils.fv(c, 'text', true),
                            browseId,
                        })
                    }
                }
                // providing all artists data, instead of ambiguous Object | Array
                return a
                // return 1 < a.length ? a : 0 < a.length ? a[0] : a
            })(),
            album: (function () {
                var c = lodash.first(MusicUtils.fv(flexColumn[1], 'runs', true))
                if (!Array.isArray(c) && c instanceof Object)
                    return {
                        name: MusicUtils.fv(c, 'text'),
                        browseId: MusicUtils.fv(
                            c,
                            'browseEndpoint:browseId',
                            true,
                        ),
                    }
                return c
            })(),
            // now in seconds...
            duration: MusicUtils.hms2ms(
                lodash.last(MusicUtils.fv(flexColumn[1], 'runs:text', true)),
                true,
            ),
            artworks: MusicUtils.fv(
                sectionContext,
                'musicThumbnailRenderer:thumbnails',
                true,
            ),
            params: MusicUtils.fv(
                sectionContext,
                'playNavigationEndpoint:params',
            ),
        })
    })
    return result
}

export const parseVideoSearchResult = (context: any) => {
    const result: any = {
        content: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData'),
    }

    var sectionList = MusicUtils.fv(context, 'musicResponsiveListItemRenderer')
    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                sectionContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        result.content.push(
            Object.freeze({
                type: 'video',
                musicId: MusicUtils.fv(
                    sectionContext,
                    'playNavigationEndpoint:videoId',
                ),
                playlistId: MusicUtils.fv(
                    sectionContext,
                    'playNavigationEndpoint:playlistId',
                ),
                title: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
                author: lodash.nth(
                    MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                    0,
                ),
                views: lodash.nth(
                    MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                    2,
                ),
                duration: MusicUtils.hms2ms(
                    lodash.last(
                        MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                    ),
                ),
                artworks: MusicUtils.fv(
                    sectionContext,
                    'musicThumbnailRenderer:thumbnails',
                ),
                params: MusicUtils.fv(
                    sectionContext,
                    'playNavigationEndpoint:params',
                ),
            }),
        )
    })
    return result
}

export const parseAlbumSearchResult = (context: any) => {
    const result: any = {
        content: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData'),
    }

    var sectionList = MusicUtils.fv(context, 'musicResponsiveListItemRenderer')
    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                sectionContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        result.content.push(
            Object.freeze({
                type: lodash.lowerCase(
                    lodash.first(
                        MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                    ),
                ),
                browseId: MusicUtils.fv(
                    lodash.at(sectionContext, 'navigationEndpoint'),
                    'browseEndpoint:browseId',
                ),
                playlistId: MusicUtils.fv(
                    sectionContext,
                    'toggledServiceEndpoint:playlistId',
                    true,
                ),
                title: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
                artist: lodash.join(
                    lodash.filter(
                        MusicUtils.fv(
                            lodash.nth(flexColumn, 1),
                            'runs:text',
                        ).slice(1, -1),
                        (v: any) => ' • ' != v && true,
                    ),
                    '',
                ),
                year: lodash.last(
                    MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                ),
                artworks: MusicUtils.fv(
                    sectionContext,
                    'musicThumbnailRenderer:thumbnails',
                ),
            }),
        )
    })
    return result
}

export const parseArtistSearchResult = (context: any) => {
    const result: any = {
        content: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData'),
    }

    var sectionList = MusicUtils.fv(
        context,
        'sectionListRenderer:musicResponsiveListItemRenderer',
    )
    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                sectionContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        result.content.push(
            Object.freeze({
                type: lodash.lowerCase(
                    lodash.first(
                        MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                    ),
                ),
                browseId: MusicUtils.fv(
                    lodash.at(sectionContext, 'navigationEndpoint'),
                    'browseEndpoint:browseId',
                ),
                title: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
                artworks: MusicUtils.fv(
                    sectionContext,
                    'musicThumbnailRenderer:thumbnails',
                ),
            }),
        )
    })
    return result
}

export const parsePlaylistSearchResult = (context: any) => {
    const result: any = {
        content: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData'),
    }

    var sectionList = MusicUtils.fv(context, 'musicResponsiveListItemRenderer')
    if (!Array.isArray(sectionList)) {
        sectionList = [sectionList]
    }
    sectionList.forEach((sectionContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                sectionContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        result.content.push(
            Object.freeze({
                type: 'playlist',
                browseId: MusicUtils.fv(
                    lodash.at(sectionContext, 'navigationEndpoint'),
                    'browseEndpoint:browseId',
                ),
                title: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
                author: lodash.first(
                    MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs:text'),
                ),
                trackCount: lodash.toNumber(
                    lodash.nth(
                        lodash.words(
                            lodash.last(
                                MusicUtils.fv(
                                    lodash.nth(flexColumn, 1),
                                    'runs:text',
                                ),
                            ),
                        ),
                        0,
                    ),
                ),
                artworks: MusicUtils.fv(
                    sectionContext,
                    'musicThumbnailRenderer:thumbnails',
                ),
            }),
        )
    })
    return result
}

export const parseArtistPage = (context: any) => {
    const result: any = {
        name: '',
        description: '',
        views: '',
        products: {},
        thumbnails: [],
    }

    const headerContext = MusicUtils.fv(context, 'musicImmersiveHeaderRenderer')
    result.name = MusicUtils.fv(lodash.at(headerContext, 'title'), 'text')
    result.thumbnails = MusicUtils.fv(
        lodash.at(headerContext, 'thumbnail'),
        'musicThumbnailRenderer:thumbnails',
    )

    const descriptionContext = MusicUtils.fv(
        context,
        'musicDescriptionShelfRenderer',
    )
    if (!Array.isArray(descriptionContext)) {
        result.description = MusicUtils.fv(
            lodash.at(descriptionContext, 'description'),
            'text',
        )
        result.views = lodash.parseInt(
            lodash.replace(
                lodash.nth(
                    lodash.split(
                        MusicUtils.fv(
                            lodash.at(descriptionContext, 'subheader'),
                            'text',
                        ),
                        ' ',
                    ),
                    0,
                ),
                /,/g,
                '',
            ),
        )
    }

    const nextMusicNavigation = MusicUtils.fv(
        context,
        'musicShelfRenderer:bottomEndpoint:browseEndpoint',
    )
    if (!Array.isArray(nextMusicNavigation)) {
        result.products.songs = {
            content: [],
            browseId: nextMusicNavigation.browseId,
            params: nextMusicNavigation.params,
        }
    } else {
        result.products.songs = {
            content: [],
        }
    }
    MusicUtils.fv(
        context,
        'musicShelfRenderer:musicResponsiveListItemRenderer',
    ).forEach((itemContext: any) => {
        const flexColumn = lodash.concat(
            MusicUtils.fv(
                itemContext,
                'musicResponsiveListItemFlexColumnRenderer',
            ),
        )
        result.products.songs.content.push({
            name: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
            album: (function () {
                var c = MusicUtils.fv(lodash.nth(flexColumn, 2), 'runs')
                if (!Array.isArray(c) && c instanceof Object)
                    return {
                        name: MusicUtils.fv(c, 'text'),
                        browseId: MusicUtils.fv(c, 'browseEndpoint:browseId'),
                    }
                return {}
            })(),
            artist: (function () {
                var a = [],
                    c = MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs')
                if (Array.isArray(c)) {
                    c = lodash.filter(c, function (o: any) {
                        return o.navigationEndpoint
                    })
                    for (var i = 0; i < c.length; i++) {
                        a.push({
                            name: MusicUtils.fv(c[i], 'text'),
                            browseId: MusicUtils.fv(
                                c[i],
                                'browseEndpoint:browseId',
                            ),
                        })
                    }
                } else {
                    a.push({
                        name: MusicUtils.fv(c, 'text'),
                        browseId: MusicUtils.fv(c, 'browseEndpoint:browseId'),
                    })
                }
                return 1 < a.length ? a : 0 < a.length ? a[0] : a
            })(),
        })
    })
    MusicUtils.fv(context, 'musicCarouselShelfRenderer').forEach(
        (carouselContext: any) => {
            const carouselName = lodash.lowerCase(
                MusicUtils.fv(
                    carouselContext,
                    'musicCarouselShelfBasicHeaderRenderer:title:text',
                ),
            )

            if (['albums', 'singles', 'videos'].includes(carouselName)) {
                const nextCarouselNavigation = MusicUtils.fv(
                    carouselContext,
                    'musicCarouselShelfBasicHeaderRenderer:title:navigationEndpoint:browseEndpoint',
                )
                if (!Array.isArray(nextCarouselNavigation)) {
                    result.products[carouselName] = {
                        content: [],
                        browseId: nextCarouselNavigation.browseId,
                        params: nextCarouselNavigation.params,
                    }
                } else {
                    result.products[carouselName] = {
                        content: [],
                    }
                }

                const itemContext = MusicUtils.fv(
                    carouselContext,
                    'musicTwoRowItemRenderer',
                )
                if (Array.isArray(itemContext)) {
                    for (let i = 0; i < itemContext.length; i++) {
                        switch (carouselName) {
                            case 'singles':
                                result.products[carouselName].content.push({
                                    type: 'single',
                                    browseId: MusicUtils.fv(
                                        lodash.at(
                                            itemContext[i],
                                            'navigationEndpoint',
                                        ),
                                        'browseEndpoint:browseId',
                                    ),
                                    name: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'title'),
                                        'text',
                                    ),
                                    year: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'subtitle'),
                                        'text',
                                    ),
                                    thumbnails: MusicUtils.fv(
                                        itemContext[i],
                                        'musicThumbnailRenderer:thumbnails',
                                    ),
                                })
                                break
                            case 'albums':
                                result.products[carouselName].content.push({
                                    type: lodash.nth(
                                        MusicUtils.fv(
                                            lodash.at(
                                                itemContext[i],
                                                'subtitle',
                                            ),
                                            'text',
                                        ),
                                        0,
                                    ),
                                    browseId: MusicUtils.fv(
                                        lodash.at(
                                            itemContext[i],
                                            'navigationEndpoint',
                                        ),
                                        'browseEndpoint:browseId',
                                    ),
                                    name: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'title'),
                                        'text',
                                    ),
                                    year: lodash.nth(
                                        MusicUtils.fv(
                                            lodash.at(
                                                itemContext[i],
                                                'subtitle',
                                            ),
                                            'text',
                                        ),
                                        2,
                                    ),
                                    thumbnails: MusicUtils.fv(
                                        itemContext[i],
                                        'musicThumbnailRenderer:thumbnails',
                                    ),
                                })
                                break
                            case 'videos':
                                result.products[carouselName].content.push({
                                    type: 'video',
                                    musicId: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'title'),
                                        'watchEndpoint:videoId',
                                    ),
                                    playlistId: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'title'),
                                        'watchEndpoint:playlistId',
                                    ),
                                    name: MusicUtils.fv(
                                        lodash.at(itemContext[i], 'title'),
                                        'text',
                                    ),
                                    author: lodash.join(
                                        lodash.dropRight(
                                            MusicUtils.fv(
                                                lodash.at(
                                                    itemContext[i],
                                                    'subtitle',
                                                ),
                                                'text',
                                            ),
                                            2,
                                        ),
                                        '',
                                    ),
                                    views: lodash.nth(
                                        MusicUtils.fv(
                                            lodash.at(
                                                itemContext[i],
                                                'subtitle',
                                            ),
                                            'text',
                                        ),
                                        2,
                                    ),
                                    thumbnails: MusicUtils.fv(
                                        itemContext[i],
                                        'musicThumbnailRenderer:thumbnails',
                                    ),
                                })
                                break
                        }
                    }
                } else if (itemContext instanceof Object) {
                    switch (carouselName) {
                        case 'singles':
                            result.products[carouselName].content.push({
                                type: 'single',
                                browseId: MusicUtils.fv(
                                    lodash.at(
                                        itemContext,
                                        'navigationEndpoint',
                                    ),
                                    'browseEndpoint:browseId',
                                ),
                                name: MusicUtils.fv(
                                    lodash.at(itemContext, 'title'),
                                    'text',
                                ),
                                year: MusicUtils.fv(
                                    lodash.at(itemContext, 'subtitle'),
                                    'text',
                                ),
                                thumbnails: MusicUtils.fv(
                                    itemContext,
                                    'musicThumbnailRenderer:thumbnails',
                                ),
                            })
                            break
                        case 'albums':
                            result.products[carouselName].content.push({
                                type: lodash.nth(
                                    MusicUtils.fv(
                                        lodash.at(itemContext, 'subtitle'),
                                        'text',
                                    ),
                                    0,
                                ),
                                browseId: MusicUtils.fv(
                                    lodash.at(
                                        itemContext,
                                        'navigationEndpoint',
                                    ),
                                    'browseEndpoint:browseId',
                                ),
                                name: MusicUtils.fv(
                                    lodash.at(itemContext, 'title'),
                                    'text',
                                ),
                                year: lodash.nth(
                                    MusicUtils.fv(
                                        lodash.at(itemContext, 'subtitle'),
                                        'text',
                                    ),
                                    2,
                                ),
                                thumbnails: MusicUtils.fv(
                                    itemContext,
                                    'musicThumbnailRenderer:thumbnails',
                                ),
                            })
                            break
                        case 'videos':
                            result.products[carouselName].content.push({
                                type: 'video',
                                musicId: MusicUtils.fv(
                                    lodash.at(itemContext, 'title'),
                                    'watchEndpoint:videoId',
                                ),
                                playlistId: MusicUtils.fv(
                                    lodash.at(itemContext, 'title'),
                                    'watchEndpoint:playlistId',
                                ),
                                name: MusicUtils.fv(
                                    lodash.at(itemContext, 'title'),
                                    'text',
                                ),
                                author: lodash.join(
                                    lodash.dropRight(
                                        MusicUtils.fv(
                                            lodash.at(itemContext, 'subtitle'),
                                            'text',
                                        ),
                                        2,
                                    ),
                                    '',
                                ),
                                views: lodash.nth(
                                    MusicUtils.fv(
                                        lodash.at(itemContext, 'subtitle'),
                                        'text',
                                    ),
                                    2,
                                ),
                                thumbnails: MusicUtils.fv(
                                    itemContext,
                                    'musicThumbnailRenderer:thumbnails',
                                ),
                            })
                            break
                    }
                }
            }
        },
    )
    return result
}

export const parsePlaylistPage = (context: any) => {
    const result: any = {
        title: '',
        owner: '',
        trackCount: 0,
        dateYear: '',
        content: [],
        thumbnails: [],
        continuation: MusicUtils.fv(context, 'nextContinuationData', true),
    }

    if (!lodash.has(context, 'continuationContents')) {
        const pageHeader = MusicUtils.fv(context, 'musicDetailHeaderRenderer')
        result.title = MusicUtils.fv(
            lodash.at(pageHeader, 'title'),
            'runs:text',
        )
        result.owner = lodash.nth(
            MusicUtils.fv(lodash.at(pageHeader, 'subtitle'), 'runs:text'),
            2,
        )
        result.trackCount = parseInt(
            lodash.words(
                lodash.nth(
                    MusicUtils.fv(
                        lodash.at(pageHeader, 'secondSubtitle'),
                        'runs:text',
                    ),
                    0,
                ),
            ),
        )
        result.dateYear = lodash.nth(
            MusicUtils.fv(lodash.at(pageHeader, 'subtitle'), 'runs:text'),
            4,
        )
        result.thumbnails = MusicUtils.fv(
            pageHeader,
            'croppedSquareThumbnailRenderer:thumbnails',
        )
    }

    const itemContext = MusicUtils.fv(
        context,
        'musicResponsiveListItemRenderer',
    )
    if (Array.isArray(itemContext)) {
        for (let i = 0; i < itemContext.length; i++) {
            const flexColumn = MusicUtils.fv(
                itemContext[i],
                'musicResponsiveListItemFlexColumnRenderer',
                true,
            )
            result.content.push({
                musicId: MusicUtils.fv(
                    itemContext[i],
                    'playNavigationEndpoint:videoId',
                ),
                name: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
                author: (function () {
                    var a = [],
                        c = MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs')
                    if (Array.isArray(c)) {
                        c = lodash.filter(c, function (o: any) {
                            return o.navigationEndpoint
                        })
                        for (var i = 0; i < c.length; i++) {
                            a.push({
                                name: MusicUtils.fv(c[i], 'text'),
                                browseId: MusicUtils.fv(
                                    c[i],
                                    'browseEndpoint:browseId',
                                ),
                            })
                        }
                    } else {
                        a.push({
                            name: MusicUtils.fv(c, 'text'),
                            browseId: MusicUtils.fv(
                                c,
                                'browseEndpoint:browseId',
                            ),
                        })
                    }
                    return 1 < a.length ? a : 0 < a.length ? a[0] : a
                })(),
                duration: MusicUtils.hms2ms(
                    MusicUtils.fv(
                        itemContext[i],
                        'musicResponsiveListItemFixedColumnRenderer:runs:text',
                        true,
                    ),
                ),
                thumbnails: MusicUtils.fv(
                    itemContext[i],
                    'musicThumbnailRenderer:thumbnails',
                ),
            })
        }
    } else {
        const flexColumn = MusicUtils.fv(
            itemContext,
            'musicResponsiveListItemFlexColumnRenderer',
            true,
        )
        result.content.push({
            musicId: MusicUtils.fv(
                itemContext,
                'playNavigationEndpoint:videoId',
            ),
            name: MusicUtils.fv(lodash.nth(flexColumn, 0), 'runs:text'),
            author: (function () {
                var a = [],
                    c = MusicUtils.fv(lodash.nth(flexColumn, 1), 'runs')
                if (Array.isArray(c)) {
                    c = lodash.filter(c, function (o: any) {
                        return o.navigationEndpoint
                    })
                    for (var i = 0; i < c.length; i++) {
                        a.push({
                            name: MusicUtils.fv(c[i], 'text'),
                            browseId: MusicUtils.fv(
                                c[i],
                                'browseEndpoint:browseId',
                            ),
                        })
                    }
                } else {
                    a.push({
                        name: MusicUtils.fv(c, 'text'),
                        browseId: MusicUtils.fv(c, 'browseEndpoint:browseId'),
                    })
                }
                return 1 < a.length ? a : 0 < a.length ? a[0] : a
            })(),
            duration: MusicUtils.hms2ms(
                MusicUtils.fv(
                    itemContext,
                    'musicResponsiveListItemFixedColumnRenderer:runs:text',
                    true,
                ),
            ),
            thumbnails: MusicUtils.fv(
                itemContext,
                'musicThumbnailRenderer:thumbnails',
                true,
            ),
        })
    }
    return result
}

export const parseAlbumPage = (context: any) => {
    const result: any = {
        title: '',
        description: '',
        trackCount: 0,
        date: {
            year: 0,
            month: 0,
            day: 0,
        },
        duration: 0,
        artist: [],
        tracks: [],
        thumbnails: [],
    }

    const albumRelease = MusicUtils.fv(context, 'musicAlbumRelease')
    result.title = albumRelease.title
    result.trackCount = parseInt(albumRelease.trackCount)
    result.date = albumRelease.releaseDate
    result.duration = parseInt(albumRelease.durationMs)
    result.playlistId = albumRelease.audioPlaylistId
    result.thumbnails = MusicUtils.fv(
        albumRelease,
        'thumbnailDetails:thumbnails',
    )

    const albumReleaseDetail = MusicUtils.fv(context, 'musicAlbumReleaseDetail')
    result.description = albumReleaseDetail.description

    const albumArtist = MusicUtils.fv(context, 'musicArtist')
    if (albumArtist instanceof Array) {
        for (let i = 0; i < albumArtist.length; i++) {
            result.artist.push({
                name: albumArtist[i].name,
                browseId: albumArtist[i].externalChannelId,
                thumbnails: MusicUtils.fv(
                    albumArtist[i],
                    'thumbnailDetails:thumbnails',
                ),
            })
        }
    } else if (albumArtist instanceof Object) {
        result.artist.push({
            name: albumArtist.name,
            browseId: albumArtist.externalChannelId,
            thumbnails: MusicUtils.fv(
                albumArtist,
                'thumbnailDetails:thumbnails',
            ),
        })
    }

    const albumTrack = MusicUtils.fv(context, 'musicTrack')
    if (albumTrack instanceof Array) {
        for (let i = 0; i < albumTrack.length; i++) {
            result.tracks.push({
                name: albumTrack[i].title,
                musicId: albumTrack[i].videoId,
                artistNames: albumTrack[i].artistNames,
                duration: parseInt(albumTrack[i].lengthMs),
                thumbnails: MusicUtils.fv(
                    albumTrack[i],
                    'thumbnailDetails:thumbnails',
                ),
            })
        }
    } else if (albumTrack instanceof Object) {
        result.tracks.push({
            name: albumTrack.title,
            musicId: albumTrack.videoId,
            artistNames: albumTrack.artistNames,
            duration: parseInt(albumTrack.lengthMs),
            thumbnails: MusicUtils.fv(
                albumTrack,
                'thumbnailDetails:thumbnails',
            ),
        })
    }
    return result
}

export const parseNextPanel = (context: any) => {
    const result: any = {
        title: '',
        playlistId: '',
        content: [],
        currentIndex: 0,
        continuation: MusicUtils.fv(context, 'nextContinuationData'),
    }

    const panelContext = MusicUtils.fv(context, 'playlistPanelRenderer')
    result.title = panelContext.title
    result.playlistId = panelContext.playlistId
    result.currentIndex = panelContext.currentIndex

    MusicUtils.fv(panelContext, 'playlistPanelVideoRenderer').forEach(
        (itemContext: any) => {
            result.content.push({
                index: lodash.nth(
                    lodash.at(
                        itemContext,
                        'navigationEndpoint.watchEndpoint.index',
                    ),
                    0,
                ),
                selected: lodash.nth(lodash.at(itemContext, 'selected'), 0),
                musicId: lodash.nth(lodash.at(itemContext, 'videoId'), 0),
                playlistId: lodash.nth(
                    lodash.at(
                        itemContext,
                        'navigationEndpoint.watchEndpoint.playlistId',
                    ),
                    0,
                ),
                params: lodash.nth(
                    lodash.at(
                        itemContext,
                        'navigationEndpoint.watchEndpoint.params',
                    ),
                    0,
                ),
            })
        },
    )
    return result
}

export const parseSongDetailsPlayer = (
    data: MusicTrackAsVideoDetails,
    musicId: string,
    playlistId: string,
) => {
    // TODO: there are more fields in this videoDetails
    const {videoDetails} = data

    return {
        type: 'SONG',
        musicId: videoDetails.videoId,
        playlistId: playlistId,
        name: videoDetails.title,
        artist: videoDetails.author,
        album: {
            name: '', // not album is provided
            browseId: '', // this two properties must be handled by the player controller and music player UI
        },
        duration: Number(videoDetails.lengthSeconds) * 1000, // converting the duration from seconds to milliseconds
        artworks: [
            {
                height: 60,
                url: videoDetails.thumbnail.thumbnails[0].url,
            },
            {
                height: 120,
                url: videoDetails.thumbnail.thumbnails[1].url,
            },
        ],
        params: 'wAEB',
    }
}

const MusicParser = {
    parseAlbumPage,
    parseAlbumSearchResult,
    parseArtistPage,
    parseArtistSearchResult,
    parseNextPanel,
    parsePlaylistPage,
    parsePlaylistSearchResult,
    parseSearchResult,
    parseSongDetailsPlayer,
    parseSongSearchResult,
    parseVideoSearchResult,
}
export default MusicParser
