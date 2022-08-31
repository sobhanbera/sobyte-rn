/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - this file contains data about types of data we are getting from api requests
 */

/**
 * this interface provides data type about the dynamic
 * types of data we have to render in explore screen
 *
 * this data is fetched from the api from a GitHub file, in some repo maybe :) hehe
 */
export interface ExploreScreenDataResponseObject {
    id: string
    type: 'Tracks' | 'TrackChunks' | 'Artists' | 'Playlists' // this are the direct referece to components, see QueryDataRenderer component for reference
    title: string
    searchQueries: string[]
    combinedProps: {tracksPerColumn: number}
} // the data inside the array of data
export type ExploreScreenDataResponse = Array<ExploreScreenDataResponseObject> // the actual data
