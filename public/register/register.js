const username = document.getElementById('username');
const password = document.getElementById('password');
const validation_password = document.getElementById('validation_password');
const email = document.getElementById('email');
const validation_email = document.getElementById('validation_email');
const register_btn = document.getElementById('register_btn');

register_btn.addEventListener('click', (event) => {
	event.preventDefault();
	checkUser();
})
document.getElementById("register_form").addEventListener('submit', (event) => {
	event.preventDefault();
	checkUser();
})

function checkUser() {
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	const validation_passwordValue = validation_password.value.trim();
	const emailValue = email.value.trim();
	const validation_emailValue = validation_email.value.trim();

	let usernameValid;
	let passwordValid;
	let validation_passwordValid;
	let emailValid;
	let validation_emailValid;

		if (usernameValue === "") {
			errorOn(username, "username cannot be blank")
			 usernameValid = false;
		} else if (usernameValue.includes('@')) {
			errorOn(username, "username cannot be email")
			 usernameValid = false;
		} else { 
			success(username) 
			 usernameValid = true;
		}

		if (passwordValue === "") {
			errorOn(password, "password cannot be blank")
			passwordValid = false
		} else if (passwordValue.length < 8) {
			errorOn(password, "password must contain minimum of 8 charecters.")
			passwordValid = false
		} else { 
			success(password)
			passwordValid = true
		 }

		if (validation_passwordValue !== passwordValue) {
			errorOn(validation_password, "password is not matching...")
			validation_passwordValid = false
		} else if (validation_passwordValue === "") {
			errorOn(validation_password, "password cannot be blank")
			validation_passwordValid = false
		} else if (validation_passwordValue.length < 8) {
			errorOn(validation_password, "password must contain minimum of 8 charecters.")
			validation_passwordValid = false
		} else { 
			success(validation_password)
			validation_passwordValid =true	
		
		}

		if (emailValue === "") {
			errorOn(email, "email cannot be blank")
			emailValid = false
		} else if (!isEmail(emailValue)) {
			errorOn(email, "need to enter email address")
			emailValid = false
		} else { 
			success(email)
			emailValid = true
		 }

		if (validation_emailValue !== emailValue) {
			errorOn(validation_email, "email is not matching...")
			validation_emailValid = false
		}
		else if (validation_emailValue === "") {
			errorOn(validation_email, "email cannot be blank")
			validation_emailValid = false
		} else if (!isEmail(validation_emailValue)) {
			errorOn(validation_email, "need to enter email address")
			validation_emailValid = false		
		} else { 
			success(validation_email)
			validation_emailValid = true
		}

		
		if (usernameValid === true && passwordValid === true && validation_passwordValid === true && emailValid === true && validation_emailValid === true) {

			const options = {
				username: usernameValue,
				password: passwordValue,
				email: emailValue
			}
		
			fetch('/register', {
				method: 'POST', // or 'PUT'
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(options),
			})
				.then(response => response.json())
				.then(data => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		
			console.log(options)
		

	} else {

	
	}
	
}



function errorOn(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs error';
	small.innerText = message;
}

function success(input) {
	const formControl = input.parentElement;
	formControl.className = 'inputs success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



