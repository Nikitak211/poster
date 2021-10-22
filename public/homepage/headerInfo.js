const logo = document.getElementById('avatarLogged');
const author = document.getElementById('authorLogged');
fetch('/logged')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            
            logo.src = data.avatar;
            author.innerHTML = data.author;
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
            



