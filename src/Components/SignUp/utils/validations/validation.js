export const Validations = {
    nameValid: function (name) {
        const re = /^[a-zA-Z]{3,}$/;
        const result = { isValid: re.test(name), message: '' };
        if (!result.isValid) {
            result.message = 'Name should contain only letters no numbers or special characters and at least 3 characters long and no spaces';
        }
        return result;
    },

    emailValid: function (email) {
        // should contain @ and .
        const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        const result = { isValid: re.test(email), message: '' };
        if (!result.isValid) {
            result.message = 'Email is not valid';
        }
        return result;
    },

    phoneValid: function (phone) {
        // should start with 010 or 011 or 012 or 015 and have 11 
        const re = /^(010|011|012|015)\d{8}$/;
        const result = { isValid: re.test(phone), message: '' };
        if (!result.isValid) {
            result.message = 'Phone number should start with 010 or 011 or 012 or 015 and have 11 digits';
        }

        return result;
    },

    passwordValid: function (password) {
        // one digit, one lower case, one upper case and at least 6 characters long
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        const result = { isValid: re.test(password), message: '' };
        if (!result.isValid) {
            result.message = 'Password should contain at least one digit, one lower case, one upper case and at least 6 characters long';
        }
        return result;
    },

    confirmPasswordValid: function (password, confirmPassword) {
        const result = { isValid: password === confirmPassword, message: '' };
        if (!result.isValid) {
            result.message = 'Password and confirm password should match';
        }
        return result;
    },

    ageValid: function (age) {
        const re = /^[0-9]+$/;
        const result = { isValid: true, message: '' };
    
        if (!re.test(age)) {
            result.isValid = false;
            result.message = 'Age should be a number';
        } else if (age < "18") {
            result.isValid = false;
            result.message = 'Age should be greater than or equal to 18';
        } else if (age > "100") {
            result.isValid = false;
            result.message = 'Age should be less than or equal to 100';
        }
    
        return result;
    }
}