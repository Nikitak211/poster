const password = document.getElementById('password');
const email = document.getElementById('email');

document.getElementById('loginForm').addEventListener('submit',(e) => {
    e.preventDefault();
    login()
})


function login() {
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();

    const options = {
        email: emailValue,
        password: passwordValue
    } 

    fetch('/api/' ,{
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options)
    })
    .then( response => response.json() )
    .then((data) => {
        data
        window.location = "/"
      })
}