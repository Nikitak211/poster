const password = document.getElementById('password');
const email = document.getElementById('email');

document.getElementById('loginForm').addEventListener('submit',(e) => {
    e.preventDefault();
    login()
})


async function login() {
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();

    const options = {
        email: emailValue,
        password: passwordValue
    } 

    const response = await fetch('/api/auth/login' ,{
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options)
    })
    const json = await response.json()
    if(json.error){
        errorOn(email, json.login)
        errorOn(password, json.login)
        return alert(json.login)
    }
    if (json.isAuth) {
        window.location = "/";
    }
}

