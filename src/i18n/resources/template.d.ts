/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - all modal related to language and internationalization feature
 */

/**
 * type of resource for each language
 */
export interface Resource {
    [language: string]: ResourceLanguage
}

export interface ResourceLanguage {
    [namespace: string]: ResourceKey
}

export type ResourceKey =
    | string
    | {
          [key: string]: any
      }

/**
 * modal for the common sentences and words in all languages
 */
export interface CommonLanguageResourceTags extends ResourceLanguage {
    appname: string
}

/**
 * langauge codes along with there sentence and words
 *
 * this is the main blueprint to have in each and every langauge data
 */
export interface LanguageResourceTags extends Resource {
    lang: {
        hello: string
        welcome: string
        // more will be added here
    }
    common: CommonLanguageResourceTags
}
