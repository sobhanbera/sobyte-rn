/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - all resources at one place
 */

import {BengaliLanguageResource as bn} from './bn'
import {EnglishLanguageResource as en} from './en'
import {HindiLanguageResource as hi} from './hi'
import {MarathiLanguageResource as mr} from './mr'

const AvailableLanguages = {
    en,
    hi,
    bn,
    mr,
}

export {bn, en, hi, mr, AvailableLanguages}

/**
 * all the available language options
 * these are the langauge code for them
 */
export type LanguageOptions = 'en' | 'hi' | 'bn' | 'mr'
