// check if isAuth.
// send current logged username and the form data to mongodb to be saved.
// then get current logged username, data.post.textare, data.post.title.
// create and add like & dislike function.
// create an comment to the created post , and so it will save to mongodb.
const postTitle = document.getElementById('titleInput');
const postTextArea = document.getElementById('post-body-form');

document.getElementById('postFormFill').addEventListener('submit', (e) => {
    // e.preventDefault();
    postForm();
})
let title = postTitle.value
let postContent = postTextArea.value

async function postForm() {
    const options = {
        title: title,
		postContent: postContent
    }
    const response = await fetch('/api/auth/post', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    })
    const Data = await response.json()

    if(Data.success){
        alert(Data.success)
    } else {
        console.log(Data.error)
    }
};