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
 * @param cookieSaved {boolean} - specifies if a cookie was created for this session
 * @returns {boolean} returns <b>true</b> if at least one condition is met:
 * - the 'email2' form field contains a truthy value,
 * - cookieSaved is <b>false</b>
 * <b>false</b> otherwise.
 */
function isSpammingAttempt(formData, cookieSaved) {
    return !!formData.email2 || !cookieSaved;
}

module.exports = {
    isFormValid,
    isSpammingAttempt,
};
