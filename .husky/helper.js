const CHECK_FILE_FORMATING = 'CFF'
const FORMATING_FILE = 'FF'
const GIT_STATUS = 'GST'
const ADDING_FILES_TO_COMMIT = 'GAA'
const SUCCESS = 'SUCCESS'

const NORMAL_TEXT = '\033[0m'
const BOLD_TEXT = '\033[1m'
const RED_COLOR = '\x1b[31m'
const GREEN_COLOR = '\x1b[32m'
const YELLOW_COLOR = '\x1b[33m'
const BLUE_COLOR = '\x1b[34m'
const CYAN_COLOR = '\x1b[36m'

const PADDING_HORIZONTAL = 4

/**
 * @param {string} string any string
 * @returns {string} a string cover inside a box of string
 */
function printBoxWrappedString(string, color = BLUE_COLOR) {
    console.log('') // spacing
    console.log(`+${'-'.repeat(string.length + PADDING_HORIZONTAL)}+`) // first line
    console.log(`|  ${BOLD_TEXT}${color}${string}${NORMAL_TEXT}  |`) // 2nd line (the actual message)
    console.log(`+${'-'.repeat(string.length + PADDING_HORIZONTAL)}+`) // third line
    console.log('') // spacing
}

/**
 * since 0th index contains binary node file location
 * and 1st index contains the file which is being executed, in this case helper.js (this one)
 * all next arguments are input parameters
 */
const option = process.argv[2] // input parameters

if (option) {
    if (option === CHECK_FILE_FORMATING)
        printBoxWrappedString('-:- CHECKING FILE FORMAT -:-', BLUE_COLOR)
    else if (option === FORMATING_FILE)
        printBoxWrappedString('-:- FORMATTING FILES -:-', RED_COLOR)
    else if (option === GIT_STATUS)
        printBoxWrappedString('-:- GIT STATUS -:-', CYAN_COLOR)
    else if (option === ADDING_FILES_TO_COMMIT)
        printBoxWrappedString('-:- ADDING FILES TO COMMIT -:-', YELLOW_COLOR)
    else if (option === SUCCESS)
        printBoxWrappedString('-:- TASK SUCCESSFUL -:-', GREEN_COLOR)
}
