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

	const usernameValidation = (value, inputToggle) => {
		if (value === "") {
			errorOn(inputToggle, "username cannot be blank")
			return false;
		} else if (value.includes('@')) {
			errorOn(inputToggle, "username cannot be email")
			return false;
		} else {
			successOn(inputToggle)
			return true;
		}
	}
	if (!usernameValidation(usernameValue, username)) return

	const passwordValidation = (value, inputToggle) => {
		if (value === "") {
			errorOn(inputToggle, "password cannot be blank")
			return false;
		} else if (value.length < 8) {
			errorOn(inputToggle, "password must contain minimum of 8 charecters.")
			return false;
		} else {
			successOn(inputToggle)
			return true;
		}
	}
	if (!passwordValidation(passwordValue, password)) return;
	if (!passwordValidation(validation_passwordValue, validation_password)) return;

	const passwordMatch = (value, value2, inputToggle) => {
		if (value !== value2) {
			errorOn(inputToggle, "password is not matching...")
			return false;
		} else {
			return true;
		}
	}
	if (!passwordMatch(validation_passwordValue, passwordValue, validation_password)) return;

	const emailValidation = (value, inputToggle) => {
		if (value === "") {
			errorOn(inputToggle, "email cannot be blank")
			return false;
		} else if (!isEmail(value)) {
			errorOn(inputToggle, "need to enter email address")
			return false;
		} else {
			successOn(inputToggle)
			return true;
		}
	}
	if (!emailValidation(emailValue, email)) return;
	if (!emailValidation(validation_emailValue, validation_email)) return;

	const emailMatch = (value, value2, inputToggle) => {
		if (value !== value2) {
			errorOn(inputToggle, "email is not matching...")
			return false;
		} else {
			return true;
		}
	}
	if (!emailMatch(emailValue, validation_emailValue, validation_email)) return;

	const options = {
		author: usernameValue,
		password: passwordValue,
		email: emailValue,
		date: new Date()
	}
	const response = await fetch('/api/auth/register', {
		method: 'POST', // or 'PUT'
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(options),
	})
	const Data = await response.json()

	if (Data.error) {
		errorOn(email, Data.message)
		errorOn(validation_email, Data.message)
	}
	if (Data.success) {
		window.location = "/";
	}
}

function errorOn(inputToggle, message) {
	const formControl = inputToggle.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs error';
	small.innerText = message;
}

function successOn(inputToggle) {
	const formControl = inputToggle.parentElement;
	formControl.className = 'inputs success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}