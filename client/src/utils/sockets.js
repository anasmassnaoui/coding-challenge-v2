/**
 * convert string to JSON object
 * @param {String} data a json string
 * @returns JSON Object
 */
const getMessage = (data) => {
    return JSON.parse(data)
}

export {
    getMessage
}