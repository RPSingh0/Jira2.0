exports.cleanProjectName = function (projectName) {
    return projectName
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word[0].toUpperCase())
        .join('');
}

exports.validateDateFormat = function (date) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    return date.match(regex);

}