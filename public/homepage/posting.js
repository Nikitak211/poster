// check if isAuth.
// send current logged username and the form data to mongodb to be saved.
// then get current logged username, data.post.textare, data.post.title.
// create and add like & dislike function.
// create an comment to the created post , and so it will save to mongodb.
const postTitle = document.getElementById('titleInput');
const postTextArea = document.getElementById('postBodyForm');

document.getElementById('postFormFill').addEventListener('submit', (e) => {
    e.preventDefault();
    postForm();
})

async function postForm() {
  
  let titleValue = postTitle.value
  let postContentValue = postTextArea.value
    const options = {
        title: titleValue,
		content: postContentValue
    }
    const response = fetch('/api/auth/post', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
    })
    const Data = await response.json()

    if(Data.success){
        alert({success: true,
            username: Data.username,
            title: Data.title,
            content: Data.content,
            message: "post successfully created",})
    } else {
        console.log(Data.error)
    }
};