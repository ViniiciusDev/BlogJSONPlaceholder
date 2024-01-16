async function readPosts()  {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Loading...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    /* Verificação */
    if(json.length > 0) {
        postArea.innerHTML = '';

        for(let i in json)  {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}</hr></div>`;
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea.innerHTML = 'No posts to load.'
    }
}

async function addNewPost(title, body)  {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 2
            })
        }
    );

    document.querySelector('#title-field').value = '';
    document.querySelector('#body-field').value = '';

    readPosts();
};

document.querySelector('#send-post').addEventListener('click', ()   =>  {
    let title = document.querySelector('#title-field').value;
    let body = document.querySelector('#body-field').value;

    if(title && body)   {
        addNewPost(title, body);
    } else {
        alert('complete all the fields');
    }
});

readPosts();