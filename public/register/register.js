const username = document.getElementById('username')
const password = document.getElementById('password')
const validation_password = document.getElementById('validation_password')
const email = document.getElementById('email')
const validation_email = document.getElementById('validation_email')

const register_form = document.getElementById('register-form')



register_form.addEventListener('submit', (e) => {
    e.preventDefault()

    form.elements['username'];


})

console.log(form.elements['username'])

function errorOn(input,message){
    const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'inputs error';
	small.innerText = message;
}
console.log(formControl)

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}



