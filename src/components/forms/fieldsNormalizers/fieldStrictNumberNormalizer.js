/**
 * @param {number|string} value
 * @return {number|string}
 */
export default function fieldStrictNumberNormalizer(value) {

    if (typeof value === 'number') {
        return value;
    }

    const parsedNumber = parseFloat(value);
    if (!isNaN(parsedNumber)) {
        return parsedNumber;
    }

    // undefined because redux-forms has problems with null as empty value
    return undefined;
}