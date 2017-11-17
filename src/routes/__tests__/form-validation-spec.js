const {isFormValid, isSpammingAttempt} = require('../form-validation');

describe('Form Validation Spec', () => {
    describe('Form data validation', () => {
        it('should return false if at least one field value is an empty string', () => {
            const formData = {
                name:    '',
                email:   'valid@email.add',
                message: 'test',
            };

            expect(isFormValid(formData)).toBe(false);
        });

        it('should only accept string values for form data fields', () => {
            const formData = {
                name:  {},
                email: null,
            };

            expect(isFormValid(formData)).toBe(false);
        });

        it('should only accept valid email addresses', () => {
            const formData = {
                name:    'Test',
                email:   'invalid email',
                message: 'test',
            };

            expect(isFormValid(formData)).toBe(false);
        });
    });

    describe('Spamming attempts', () => {
        it('should return true if form spam field is a truthy value', () => {
            const formData1 = {email2: 'spamming!'};
            const formData2 = {email2: {}};
            const formData3 = {email2: []};
            const cookieSaved = true;

            expect(isSpammingAttempt(formData1, cookieSaved)).toBe(true);
            expect(isSpammingAttempt(formData2, cookieSaved)).toBe(true);
            expect(isSpammingAttempt(formData3, cookieSaved)).toBe(true);
        });

        it('should return true if no cookie was saved', () => {
            const formData = {
                email2: '',
            };
            const cookieSaved = false;

            expect(isSpammingAttempt(formData, cookieSaved)).toBe(true);
        });
    });
});
