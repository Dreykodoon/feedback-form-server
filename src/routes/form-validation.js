const validator = require('validator');

/**
 * @param formData
 * @return {boolean} <b>true</b> if form data is valid, <b>false</b> otherwise
 */
function isFormValid(formData) {
    const {name, email, message} = formData;

    return name && email && validator.isEmail(email) && message;
}

module.exports = {
    isFormValid,
};
