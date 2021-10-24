let logo = document.getElementById('avatarLogged');
let author = document.getElementById('authorLogged');

window.onload = async function exampleFunction() {
    const response = await fetch('/api/auth/logged')
    const Data = await response.json()
    
        logo.src = Data.avatar;
        author.innerText = Data.author
         
}
