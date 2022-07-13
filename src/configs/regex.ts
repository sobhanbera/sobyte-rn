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
/**
 * a second type of artwork, this contains a 's' between height and quality
 * for example:
 * https://lh3.googleusercontent.com/uLPqCCHxg__NEFfnTkzQOX95m6_vbzEx1aKKIarIyC5U4SnMMdVHIlAnIq2SPS8SrV8UY6tSUHIB9N0=w60-h60-s-l90-rj
 *
 * this URL string contains a part where:
 * w60-h60-s-l90-rj
 *
 * which again contains "-s" between height and the quality
 */
export const ARTWORK_HEIGHT_WIDTH_PART_WITH_SIZE =
    /w[0-9]{2,4}-h[0-9]{2,4}-s-l[0-9]{2,3}-rj/

/**
 * a second type of artwork, this contains a 'p' character is between height and quality
 * so now let's make a regex which can excepts any character between the height and the quality in the artwork url
 *
 * this regex has a group for single character between the height and the quality value
 * just execute (regex.exce()[1]) this will provide the character data
 *
 * link example:
 * https://lh3.googleusercontent.com/uLPqCCHxg__NEFfnTkzQOX95m6_vbzEx1aKKIarIyC5U4SnMMdVHIlAnIq2SPS8SrV8UY6tSUHIB9N0=w60-h60-p-l90-rj
 * contains "p"
 *
 * https://lh3.googleusercontent.com/uLPqCCHxg__NEFfnTkzQOX95m6_vbzEx1aKKIarIyC5U4SnMMdVHIlAnIq2SPS8SrV8UY6tSUHIB9N0=w60-h60-r-l90-rj
 * contains "r"
 *
 * these links are just some examples...
 */
export const ARTWORK_HEIGHT_WIDTH_PART_WITH_CHARACTER_IN_BETWEEN =
    /w[0-9]{2,4}-h[0-9]{2,4}-(\w)-l[0-9]{2,3}-rj/

// enclosures (brackets, parans, braces) surrounded text
export const BRACES_SURROUNDED_TEXT = /\{([^)]+)\}/
export const BRACKETS_SURROUNDED_TEXT = /\[([^)]+)\]/
export const PARATHESIS_SURROUNDED_TEXT = /\(([^)]+)\)/
