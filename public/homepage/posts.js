let posts = [];
let filteredPosts = [];
const POSTS_TO_SHOW = 6;
let maxDisplayLimit = POSTS_TO_SHOW;
const postContainer = document.querySelector('.post-container');
const search = document.querySelector('[type="search"]');

// create cards and update the UI
function generatePost(post){
  const returnPostDate = (date) => `${
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  const article = document.createElement('article');
  article.classList.add('post');
  article.innerHTML = `
  <div class="post__meta">
    <div class="post__tag--container">
  <span class="post__tag">${post.title}</span>
    </div>
    <p class=" post__date">${returnPostDate(new Date(post.date))}</p>
  </div>
  <div class="post__author">
    <img class=" post__author--avatar" width="55" src="${post.avatar}" alt="${post.author}">
    <div>
      <p class=" post__author--name">${post.author}</p>
    </div>
  </div>
  <div class="post__body">
    ${post.content}
  </div>
  `;
  return article;
}

function loadPosts(){
  const frag = document.createDocumentFragment();
  filteredPosts.slice(0, maxDisplayLimit).map((post) => frag.appendChild(generatePost(post)));
  postContainer.innerHTML = '';
  postContainer.appendChild(frag);
}

function filterPosts() {
  const searchFilter = (post) => [post.title, post.content, post.author, post.title]
    .join('')
    .toLowerCase()
    .indexOf(search.value.toLowerCase()) !== -1;
  filteredPosts = posts.filter(searchFilter);
  loadPosts();
}

// fetch the data from json test
async function fetchPosts() {
    await fetch('/static/homepage/posts.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
          posts = data;
          filterPosts()
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
        
}

fetchPosts();

// filter for search
search.addEventListener('keyup', filterPosts);