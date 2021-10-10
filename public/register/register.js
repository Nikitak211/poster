const username = document.getElementById('username');
const password = document.getElementById('password');
const validation_password = document.getElementById('validation_password');
const email = document.getElementById('email');
const validation_email = document.getElementById('validation_email');
const register_btn = document.getElementById('register_btn');

register_btn.addEventListener('click', (event) => {
	event.preventDefault();
	checkUser();
} )
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

	const options = {
		username: usernameValue,
		password: passwordValue,
		email: emailValue
	}

	if(usernameValue === "") {
		alert("error")
		errorOn(username,"cannot be blank")
	} else { success(username)}
}

function errorOn(input,message){
    const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs error';
	small.innerText = message;
}

function success(input){
	const formControl = input.parentElement;
	formControl.className = 'inputs success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



