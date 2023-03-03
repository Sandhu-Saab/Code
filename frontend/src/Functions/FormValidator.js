/**
 * Checks if data is empty, undefined or null.
 * 
 * @param {Input Field value} data 
 * @returns True if empty, false if not.
 */
export function isEmpty(data) {
    let dataEmpty = false;

    if (data === null || data === "" || data === undefined) {
        dataEmpty = true;
    }

    return dataEmpty;
}