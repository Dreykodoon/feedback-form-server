const validator = require('validator');

/**
 * Checks that form field values comply with the following conditions:
 * - they are all strings;
 * - neither is empty;
 * - the 'email' value is valid.
 *
 * @param formData
 * @return {boolean} <b>true</b> if form data is valid, <b>false</b> otherwise.
 */
function isFormValid(formData) {
    const {name, email, message} = formData;

    if (typeof name !== 'string' && typeof email !== 'string' && typeof message !== 'string') {
        return false;
    }

    return name.length > 0 && email.length > 0 && validator.isEmail(email) && message.length > 0;
}

/**
 * @param formData
 * @returns {boolean} returns <b>true</b> if the 'email2' form field isn't filled with a truthy value, , <b>false</b> otherwise.
 */
function isSpammingAttempt(formData) {
    return !!formData.email2;
}

module.exports = {
    isFormValid,
    isSpammingAttempt,
};
