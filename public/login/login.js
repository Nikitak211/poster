const password = document.getElementById('password');
const email = document.getElementById('email');

document.getElementById('register-page').addEventListener('click', () => window.location = '/register')

document.getElementById('loginForm').addEventListener('submit',(e) => {
    e.preventDefault();
    login()
})

async function login() {
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();

    const options = {
            password: passwordValue,
            email: emailValue
    }

    let success = [];

    const emptyField = (value,input) => {
        if (value === "") {
            errorOn(input,"cannot be blank")
        } else {
            success.push({ success: true })
        }
    }
    emptyField(passwordValue,password,"password")
    emptyField(emailValue, email,"email")
    
    if ( success[0]  && success[1] ) {

        const response = await fetch('/api/auth/login' ,{
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options)
        })
        const Data = await response.json()
        if (Data.success) {
            successOn(email)
            successOn(password)
            window.location = "/";
        }
         else if (Data.error) {
            errorOn(email, Data.message)
            errorOn(password, Data.message)
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
