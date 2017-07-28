//Grab input fields and button
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const register = document.querySelector('button');

//create a validity class
class CheckValidity {
    constructor(input, type) {
        this.input = input;
        this.type = type;
        this.errors = [];
    }
    
    addError(message) {
        this.errors.push(message);
    }
    
    getMessages() {
        const status = this.input.validity;
        
        if (status.typeMismatch) {
            this.addError(this.type.replace(/\b\w/g, s => s.toUpperCase()) + ': Entry contains invalid or missing characters for this field type!');
        }
        
        if (status.tooLong) {
            this.addError(this.type.replace(/\b\w/g, s => s.toUpperCase()) + ': Entry is too long!');
            alert(this.type.toString());
        }
        
        if (status.tooShort) {
            this.addError(this.type.replace(/\b\w/g, s => s.toUpperCase()) + ': Entry does not contain enough characters!');
        }
        
        //Validate Email
        if (this.type == "email") {
            if (!this.input.value.match(/[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/ig)) {
                this.addError('The Email you entered is invalid, please try again!');
            }
        }
        
        //Validate Password
        if (this.type == "password") {
            if (!this.input.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
                this.addError('Your password must contain at least 8 characters, one uppercase letter, and one number!');
            }
        }
        
        
        //Validate Phone
        if (this.type == "tel") {
            if (!this.input.value.match(/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/)) {
                this.addError('The phone number you enter is invalid. Your phone number must be 11-12 numbers long!');
            }
        }
        
        return this.errors;
    }
}


register.addEventListener('click', (event) => {
    event.preventDefault();
    
    let validateName = new CheckValidity(name, "text");
    let nameErrors = validateName.getMessages();
    
    let validateEmail = new CheckValidity(email, "email");
    let emailErrors = validateEmail.getMessages();
    
    let validatePassword = new CheckValidity(password, "password");
    let passwordErrors = validatePassword.getMessages();
    
    let validatePhone = new CheckValidity(phone, "tel");
    let phoneErrors = validatePhone.getMessages();
    
    console.log(nameErrors);
    console.log(emailErrors);
    console.log(passwordErrors);
    console.log(phoneErrors);
})