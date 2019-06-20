/**
 *
 * @param {string|number} value
 * @return {string}
 */
export default function fieldNumberNormalizer (value) {
    if (typeof value === 'number') {
        return value.toString();
    }

    // if contains more than 1 dots fix this
    if (value.indexOf('.') !== value.lastIndexOf('.')) {
        value = value.replace(/\.+/g, '.')
            .split('.')
            .reduce(
                (value, current) => {
                    if (!value) {
                        return current + '.';
                    }
                    return value + current;
                },
                ''
            );
    }

    const parsedNumber = parseFloat(value);

    if (!isNaN(parsedNumber)) {
        // it's fast fix (you can see problem https://github.com/erikras/redux-form/issues/1218)
        if (value.charAt(value.length - 1) === '.') {
            return value;
        }
        return parsedNumber.toString();
    }

    return '';
};