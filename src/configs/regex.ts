/**
 * © Sobyte
 *
 * @author : Sobhan Bera (sobhanbera)
 * @other_editors :
 * @file : Typescript
 *
 * Purpose - every type of regex...
 */

// regex for the part of link artwork url in every songObject
export const ARTWORK_HEIGHT_WIDTH_PART =
    /w[0-9]{2,4}-h[0-9]{2,4}-l[0-9]{2,3}-rj/
// a second type of artwork, this contains a 's' between height and quality
export const ARTWORK_HEIGHT_WIDTH_PART_WITH_SIZE =
    /w[0-9]{2,4}-h[0-9]{2,4}-s-l[0-9]{2,3}-rj/

// enclosures (brackets, parans, braces) surrounded text
export const BRACES_SURROUNDED_TEXT = /\{([^)]+)\}/
export const BRACKETS_SURROUNDED_TEXT = /\[([^)]+)\]/
export const PARATHESIS_SURROUNDED_TEXT = /\(([^)]+)\)/
