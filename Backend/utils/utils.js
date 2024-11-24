exports.cleanProjectName = function (projectName) {
    return projectName
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word[0].toLowerCase())
        .join('');
}

exports.validateDateFormat = function (date) {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    if (!isoRegex.test(date)) {
        return false;
    }

    const parsedDate = new Date(date);

    if (parsedDate.toString() === 'Invalid Date') {
        return false;
    }

    return parsedDate.toISOString() === date;
}

exports.formatISODate = function (isoDate) {
    const parsedDate = new Date(isoDate);
    const year = parsedDate.getUTCFullYear();
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}