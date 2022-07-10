/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - data and objects related modals...
 */

/**
 * genre and mood data
 */
export interface GenreData {
    id: string | number
    title: string
    artwork: string
    hqArtwork: string
    color: string
    searchQuery: string
}

export interface SearchHistory {
    query: string
    timestamp: string | number
}
