let counter = 0;

export default function generateUniqueIdForClientSession(prefix = '_unique_') {
    return `${prefix}_${(counter++).toString(16)}`;
}