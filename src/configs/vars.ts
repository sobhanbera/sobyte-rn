/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - variables, objects, constants, etc.
 */

import {GenreData} from '@/schemas'

export const AppSearchSuggestions: string[] = [
    'Romantic tracks',
    'Arijit Singh',
    'Shreya Ghosal',
    'Bollywood Hits',
    'Hindi Lo-Fi',
    'Hindi Mashups',
]

/**
 * a list of genres to render on the screen
 * this contains some popular genre only
 * there are many other genre/sub-genre too..
 */
export const GenreList: Array<GenreData> = [
    {
        id: 0,
        title: 'Pop',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#203870',
        searchQuery: '',
    },
    {
        id: 1,
        title: 'Rock',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#2E6171',
        searchQuery: '',
    },
    {
        id: 2,
        title: 'Hip Hop',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#F4442E',
        searchQuery: '',
    },
    {
        id: 3,
        title: 'EDM',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#726E97',
        searchQuery: '',
    },
    {
        id: 4,
        title: 'R&B',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#A01800',
        searchQuery: '',
    },
    {
        id: 5,
        title: 'Country',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#02394A',
        searchQuery: '',
    },
    {
        id: 6,
        title: 'Folk',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#006494',
        searchQuery: '',
    },
    {
        id: 7,
        title: 'Classical',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0C73EC',
        searchQuery: '',
    },
    {
        id: 8,
        title: 'Romance',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#EB4B98',
        searchQuery: '',
    },
    {
        id: 9,
        title: 'K-Pop',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#B95D06',
        searchQuery: '',
    },
    {
        id: 10,
        title: 'Metal',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#604D53',
        searchQuery: '',
    },
    {
        id: 11,
        title: 'Jazz',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5AA0F6',
        searchQuery: '',
    },
    {
        id: 12,
        title: 'World',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#483868',
        searchQuery: '',
    },
    {
        id: 13,
        title: 'Latin',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#CC2936',
        searchQuery: '',
    },
    {
        id: 14,
        title: 'Dance',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#284878',
        searchQuery: '',
    },
    {
        id: 15,
        title: 'Orchestra',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#E8B848',
        searchQuery: '',
    },
    {
        id: 16,
        title: 'Indie',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#582820',
        searchQuery: '',
    },
    {
        id: 17,
        title: 'Soul',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0B3948',
        searchQuery: '',
    },
    {
        id: 18,
        title: 'Blues',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#385080',
        searchQuery: '',
    },
]

/**
 * this is the language data list
 * and also contains data about different music industries
 */
export const LanguagesList: Array<GenreData> = [
    {
        id: 0,
        title: 'Bollywood',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#BFA128',
        searchQuery: '',
    },
    {
        id: 1,
        title: 'Hindi',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#FA5844',
        searchQuery: '',
    },
    {
        id: 2,
        title: 'Punjabi',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#72D6BE',
        searchQuery: '',
    },
    {
        id: 3,
        title: 'Bengali',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#3888A0',
        searchQuery: '',
    },
    {
        id: 4,
        title: 'Bollywood Retro',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#F85A28',
        searchQuery: '',
    },
    {
        id: 5,
        title: 'Tamil',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#F59B23',
        searchQuery: '',
    },
    {
        id: 6,
        title: 'Telugu',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5AA0F6',
        searchQuery: '',
    },
    {
        id: 7,
        title: 'Marathi',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0C73EC',
        searchQuery: '',
    },
    {
        id: 8,
        title: 'Gujrati',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#8C67AC',
        searchQuery: '',
    },
    {
        id: 9,
        title: 'Kannada',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#A83000',
        searchQuery: '',
    },
    {
        id: 10,
        title: 'Haryanvi',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#681038',
        searchQuery: '',
    },
    {
        id: 11,
        title: 'Malayalam',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#206870',
        searchQuery: '',
    },
]

/**
 * list providing data about mood of the track/songs
 */
export const MoodsList: Array<GenreData> = [
    {
        id: 0,
        title: 'Romance',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#EB4B98',
        searchQuery: '',
    },
    {
        id: 1,
        title: 'Happy',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#1E3264',
        searchQuery: '',
    },
    {
        id: 2,
        title: 'Energetic',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5AA0F6',
        searchQuery: '',
    },
    {
        id: 3,
        title: 'Sad',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#784840',
        searchQuery: '',
    },
    {
        id: 4,
        title: 'Calm',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#A04008',
        searchQuery: '',
    },
    {
        id: 5,
        title: 'Relax',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#25302A',
        searchQuery: '',
    },
    {
        id: 6,
        title: 'Dark',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0C73EC',
        searchQuery: '',
    },
    {
        id: 7,
        title: 'Lo-Fi',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5AA0F6',
        searchQuery: '',
    },
    {
        id: 8,
        title: 'Devotional',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#7D161A',
        searchQuery: '',
    },
]

/**
 * different time and situation when the user could listen to songs
 * time/scene of the track...
 */
export const MusicTimesList: Array<GenreData> = [
    {
        id: 0,
        title: 'Party',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0C73EC',
        searchQuery: '',
    },
    {
        id: 1,
        title: 'Sleep',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#F59B23',
        searchQuery: '',
    },
    {
        id: 2,
        title: 'Workout',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#1E3264',
        searchQuery: '',
    },
    {
        id: 3,
        title: 'Drive',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#8C67AC',
        searchQuery: '',
    },
    {
        id: 4,
        title: 'Study',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#2D46BA',
        searchQuery: '',
    },
    {
        id: 5,
        title: 'Morning',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#477D95',
        searchQuery: '',
    },
    {
        id: 6,
        title: 'Friends',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#E8125C',
        searchQuery: '',
    },
    {
        id: 7,
        title: 'Alone',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#B95D06',
        searchQuery: '',
    },
    {
        id: 8,
        title: 'Gaming',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5AA0F6',
        searchQuery: '',
    },
]

export const ExtraMusicTypesList: Array<GenreData> = [
    {
        id: 0,
        title: 'New Releases',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#1E3264',
        searchQuery: '',
    },
    {
        id: 1,
        title: 'Eng x Hind',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#8B9A46',
        searchQuery: '',
    },
    {
        id: 2,
        title: 'Travel',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#C84B31',
        searchQuery: '',
    },
    {
        id: 4,
        title: 'Focus',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#2CA3B8',
        searchQuery: '',
    },
    {
        id: 5,
        title: 'Ambient',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#09578F',
        searchQuery: '',
    },
    {
        id: 6,
        title: 'Instrumental',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#E9724C',
        searchQuery: '',
    },
    {
        id: 7,
        title: 'Holidays',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#712B75',
        searchQuery: '',
    },
    {
        id: 8,
        title: '90s Times',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#0C73EC',
        searchQuery: '',
    },
    {
        id: 9,
        title: '80s Times',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#7D161A',
        searchQuery: '',
    },
    {
        id: 10,
        title: "Feelin' Good",
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#C5283D',
        searchQuery: '',
    },
    {
        id: 11,
        title: 'Kids',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#606D5D',
        searchQuery: '',
    },
    {
        id: 12,
        title: 'Good Vibes',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#255F85',
        searchQuery: '',
    },
    {
        id: 13,
        title: 'Slowed + Reverbed',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#B85C38',
        searchQuery: '',
    },
    {
        id: 14,
        title: 'Folk',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#6E85B7',
        searchQuery: '',
    },
    {
        id: 15,
        title: 'Indian Classical',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#FF9933',
        searchQuery: '',
    },
    {
        id: 16,
        title: 'DJs',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#F37878',
        searchQuery: '',
    },
    {
        id: 17,
        title: 'Remix',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#516BEB',
        searchQuery: '',
    },
    {
        id: 18,
        title: 'Mixtape',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#354259',
        searchQuery: '',
    },
    {
        id: 19,
        title: 'Chill',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#748DA6',
        searchQuery: '',
    },
    {
        id: 20,
        title: 'Top Hits',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#65C18C',
        searchQuery: '',
    },
    {
        id: 21,
        title: 'Remakes',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#5E454B',
        searchQuery: '',
    },
    {
        id: 22,
        title: 'T-Series',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#4C4C6D',
        searchQuery: '',
    },
    {
        id: 23,
        title: 'Today',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#1C6DD0',
        searchQuery: '',
    },
    {
        id: 23,
        title: 'Mashups',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#3797A4',
        searchQuery: '',
    },
    {
        id: 24,
        title: 'Random',
        artwork: require('@/assets/images/bgs/categories/romantic_roses.jpg'),
        color: '#7868E6',
        searchQuery: '',
    },
]

/**
 * this is a nothing array containing nothing
 * this array could be used when there is to render nothing
 * got it? fine!
 *
 * ok let's be serious, this array will be used when there is a need to render shimmer
 * and there are not sufficient number of components to render on temporary basis
 */
export const NothingArray: Array<{id: string}> = [
    {id: '15_15_1'},
    {id: '190_95_2'},
    {id: '96_32_3'},
    {id: '224_56_4'},
    {id: '295_59_5'},
    {id: '366_61_6'},
    {id: '644_92_7'},
    {id: '568_71_8'},
    {id: '729_81_9'},
    {id: '660_66_10'},
    {id: '187_17_11'},
    {id: '1080_90_12'},
    {id: '234_18_13'},
    {id: '1036_74_14'},
    {id: '525_35_15'},
    {id: '1488_93_16'},
    {id: '51_3_17'},
    {id: '180_10_18'},
    {id: '209_11_19'},
    {id: '300_15_20'},
]
