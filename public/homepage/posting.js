// create and add like & dislike function.
// create an comment to the created post , and so it will save to mongodb.
const postTitle = document.getElementById('titleInput');
const postTextArea = document.getElementById('postBodyForm');

document.getElementById('postFormFill').addEventListener('submit', (e) => {
    e.preventDefault()
    sendPost();
})

async function sendPost() {

    let titleValue = postTitle.value
    let postContentValue = postTextArea.value

    let titleValidate = postTitle.value.trim()
    let postContentValidate = postTextArea.value.trim()
    let success = [];

    

    if(titleValidate === ""){
        errorOnTitle(postTitle)
    } else {
        successOnTitle(postTitle)
        success.push({ success: true })}

    if(postContentValidate === ""){
        errorOnContent(postTextArea)
    } else {
        successOnContent(postTextArea)
        success.push({ success: true })}

    if( success[0] && success[1] ){

        const options = {
            title: titleValue,
            content: postContentValue
        }

        const response = await fetch('/api/auth/post', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(options),
        })
        const Data = await response.json()

		if (Data.success) {
			window.location = "/";
		}


    }
};

function errorOnTitle() {
	const formControl = document.getElementById('titleInput');
	formControl.className = 'post__tag error';
}

function errorOnContent() {
	const formControl = document.getElementById('postBodyForm');
	formControl.className = 'post__body error';
}
function successOnTitle() {
	const formControl = document.getElementById('titleInput');
	formControl.className = 'post__tag success';
}function successOnContent() {
	const formControl = document.getElementById('postBodyForm');
	formControl.className = 'post__body success';
}