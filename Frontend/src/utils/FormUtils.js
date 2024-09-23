/**
 * Takes in a form and returns an object containing form data
 *
 * @param {HTMLElement} form
 * @returns {Object} A JS object containing form data as key-value pairs
 */
export function getFormData(form) {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
}