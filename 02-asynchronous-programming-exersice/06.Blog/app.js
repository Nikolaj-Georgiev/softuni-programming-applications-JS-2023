function attachEvents() {

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    async function fetchData() {
        try {
            const postsRequest = fetch(postsUrl).then(res => {
                if (res.status !== 200){
                    throw new Error('Hujnja');
                }
                return res;
            });
            const commentsRequest = fetch(commentsUrl).then(res => {
                if (res.status !== 200){
                    throw new Error('Hujnja');
                }
                return res;
            });
            const [postsResponse, commentsResponse] = await Promise.all([postsRequest, commentsRequest]);
            const postsObj = await postsResponse.json();
            const commentsObj = await commentsResponse.json();
            return [postsObj, commentsObj];
            
        } catch (error) {
            console.log('Opaaa, ko stana?', error);
        }
    }

    fetchData()
        .then(results => {
            const [postsObj, commentsObj] = results;
            const loadPostsBtn = document.querySelector('#btnLoadPosts');
            loadPostsBtn.addEventListener('click', onPost);
            const selectPosts = document.querySelector('#posts');
            const viewPostBtn = document.querySelector('#btnViewPost');
            viewPostBtn.addEventListener('click', onView);
            const h1PostTitle = document.querySelector('#post-title');
            const pPostBody = document.querySelector('#post-body');
            const ulPostComments = document.querySelector('#post-comments');

            function onPost(e) {
                allPostsOption(postsObj, selectPosts);
            }

            function onView(e){
                ulPostComments.innerHTML = ''; 
                const selectedPost = selectPosts.value;
                h1PostTitle.textContent = postsObj[selectedPost].title.toUpperCase();
                pPostBody.textContent = postsObj[selectedPost].body;
                const commentsArr = Object.values(commentsObj);
                commentsArr.forEach(comment => {
                    if(comment.postId === selectedPost) {
                        const li = createElements('li', `${comment.text}`, {id:comment.id});
                        ulPostComments.appendChild(li);
                    }
                })
            }
        })
        .catch(err => console.log(err));

    function allPostsOption(obj, select) {
        const posts = Object.values(obj);
        select.innerHTML = '';
        posts.forEach(post => {
            const option = createElements('option', post.title.toUpperCase(), {value:`${post.id}`});
            select.appendChild(option);
        })
    }

    function createElements(type, content, attributes, src) {
        const element = document.createElement(type);
        content ? element.textContent = content : '';
        attributes ? addAttributes(element, attributes) : '';
        type === 'img' ? element.src = src : '';
        return element;

        function addAttributes(element, attributesObj) {
            let attributes = Object.entries(attributesObj || {});
            attributes.forEach(kvp => {
                element.setAttribute(kvp[0], kvp[1]);
            });
            return element;
        }
    }
}

attachEvents();