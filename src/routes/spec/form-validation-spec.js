const {isFormValid} = require('../form-validation');

describe('Form Validation Spec', () => {
    it('should return true if function exists', () => {
        expect(isFormValid).toBeDefined();
    });
});
