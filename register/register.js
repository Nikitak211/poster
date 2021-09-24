const registerForm = document.getElementById('register_Form');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const username = document.getElementById('username');
const password = document.getElementById('password');
const validationPassword = document.getElementById('validation_password');
const email = document.getElementById('email');
const validationEmail = document.getElementById('validation_email');

document.getElementById('register_form_button').onclick = regiser = () => {

    const firstname = firstName.value
    const lastname = lastName.value
    const Username = username.value
    const Password = password.value
    const ValidationPassword = validationPassword.value
    const Email = email.value
    const ValidationEmail = validationEmail.value

    const options = {
        method: 'POST',
        headers: {},
        body: {
            firstname: firstName.value,
            lastname: lastName.value,
            username: username.value,
            password: password.value,
            email: email.value
        }
    }

    if ( firstname === null ){

    } else if ( firstname.includes('@') ) {

    } else if ( lastname === null ) {

    } else if ( lastname.includes('@') ) {

    } else if ( Username === null || username.length < 4 ){

    } else if ( Username.includes('@') ) {

    } else if ( Password === null ){

    } else if ( Password.length <= 8 || !Password.includes('@') && !Password.length >= 5 ) {

    } else if ( ValidationPassword === '') {

	} else if ( Password !== ValidationPassword ) {

	} else if ( ValidationPassword.length <= 8 || !ValidationPassword.includes('@') && !ValidationPassword.length >= 5 ) {

	} else if ( Password !== ValidationPassword ) {

    } else if( Email === '' ) {
		
	} else if (!isEmail(Email)) {

    } else if(ValidationEmail === '') {
		
	} else if (!isEmail(ValidationEmail)) {

    } else if ( Email !== ValidationEmail ) {

    } else {
        fetch
    }
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
