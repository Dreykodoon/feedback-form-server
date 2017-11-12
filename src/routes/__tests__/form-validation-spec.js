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
        it('should return false only if spam field is a falsy value', () => {
            const formData1 = {
                email2: '',
            };
            const formData2 = {
                email2: null,
            };
            const formData3 = {
                email2: 'spammer@email.address',
            };

            expect(isSpammingAttempt(formData1)).toBe(false);
            expect(isSpammingAttempt(formData2)).toBe(false);
            expect(isSpammingAttempt(formData3)).toBe(true);
        });
    });
});
