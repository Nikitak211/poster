const username = document.getElementById('username');
const password = document.getElementById('password');
const validation_password = document.getElementById('validation_password');
const email = document.getElementById('email');
const validation_email = document.getElementById('validation_email');
const register_btn = document.getElementById('register_btn');

document.getElementById('login-page').addEventListener('click', () => window.location = "/")

document.getElementById("register_form").addEventListener('submit', (event) => {
	event.preventDefault();
	checkUser();
})

async function checkUser() {
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	const validation_passwordValue = validation_password.value.trim();
	const emailValue = email.value.trim();
	const validation_emailValue = validation_email.value.trim();

	let success = [];

	const usernameValidation = (value,input) => {
    	if (value === "") {
			errorOn(input, "username cannot be blank")
		} else if (value.includes('@')) {
			errorOn(input, "username cannot be email")
		} else {
			successOn(input)
			success.push({ success: true })
		}
    }
	usernameValidation(usernameValue,username)
	
	const passwordValidation = (value,value2,input) => {
		if (value === "") {
			errorOn(input, "password cannot be blank")
		} else if (value.length < 8) {
			errorOn(input, "password must contain minimum of 8 charecters.")
		} else {
			successOn(input)
		 	success.push({ success: true })
		}
	}
	passwordValidation(passwordValue,validation_passwordValue,password)
	passwordValidation(validation_passwordValue,passwordValue,validation_password)

	const passwordMatch = (value,value2,input) => {
		if (value !== value2) {
			errorOn(input, "password is not matching...")
		}
	}
	passwordMatch(validation_passwordValue,passwordValue,validation_password)

	 const emailValidation = (value,input) => {
		 if (value === "") {
			errorOn(input, "email cannot be blank")
		} else if (!isEmail(value)) {
			errorOn(input, "need to enter email address")
		} else {
			successOn(input)
			success.push({ success: true })
		}
	}
	emailValidation(emailValue,email)
	emailValidation(validation_emailValue,validation_email)

	const emailMatch = (value,value2,input) => {
		if (value !== value2) {
			errorOn(input, "email is not matching...")
		}
	}
	emailMatch(emailValue,validation_emailValue,validation_email)

	if (success[0] && success[1] && success[2] && success[3] && success[4]) {

		const options = {
			username: usernameValue,
			password: passwordValue,
			email: emailValue
		}

		const response = await fetch('/api/auth/register', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(options),
		})
		const Data = await response.json()

		if(Data.error){
			errorOn(email, Data.message)
			errorOn(validation_email, Data.message)
		}
		if (Data.success) {
			window.location = "/";
		}
	}
}

function errorOn(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs error';
	small.innerText = message;
}

function successOn(input) {
	const formControl = input.parentElement;
	formControl.className = 'inputs success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}