const {PAGE_NUMBER, PAGE_SIZE, SEARCH_STRING} = require("./CONSTANTS");
exports.cleanProjectName = function (projectName) {
    return projectName
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map(word => word[0].toLowerCase())
        .join('');
}

exports.cleanProjectKey = function (projectKey) {
    return projectKey.trim();
}

exports.validateAndGetPage = function (page) {
    if (page && page >= 1) {
        return page
    } else {
        return PAGE_NUMBER
    }
}

exports.validateAndGetPageSize = function (pageSize) {
    if (pageSize && pageSize >= 1) {
        return pageSize
    } else {
        return PAGE_SIZE
    }
}

exports.validateAndGetSearchString = function (searchString) {
    if (searchString === null || searchString === undefined || searchString.trim() === '') {
        return SEARCH_STRING
    } else {
        return searchString
    }
}

exports.getPaginationParams = function (query) {

    // take out query params
    let {search, page, pageSize} = query;

    search = exports.validateAndGetSearchString(search);
    page = exports.validateAndGetPage(parseInt(page));
    pageSize = exports.validateAndGetPageSize(parseInt(pageSize));

    return {page, pageSize, search}
}