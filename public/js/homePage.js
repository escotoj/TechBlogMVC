
const $editBtn = document.getElementById('editBtn');
const $deleteBtn = document.getElementById('deleteBtn');
const $commentBtn = document.getElementById('commentBtn');
const commentInput = document.getElementById('commentInput');
const commentContainer = document.getElementById('commentContainer');

// PUT BAD
$editBtn.addEventListener('click', async (event) => {
  console.log('click', event.target);
  // document.location.replace('/dashboard');
  // document.location.replace(`/dashboard/${id}`);
    try {
      const id = event.target.getAttribute('data-id')
      const response = await fetch(`/api/blog/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({newBlog}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();

// CONTAINER FOR edit 
      var inputElement = document.createElement("input");
      inputElement.setAttribute("type", "text");
      inputElement.setAttribute("id", "editSubmit");
      var container = document.querySelector(".container");
      container.appendChild(inputElement);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });

//DELETE GOOD
  $deleteBtn.addEventListener('click', async (event) => {
    try {
    const id = event.target.getAttribute('data-id')
    console.log(id);
      await fetch(`/api/blog/dashboard/${id}`, {
        method: 'DELETE',
      });
      console.log('delete good')
      location.href = '/homepage';
    } catch (err) {
      console.log('BAD')
      res.status(500).json(err)
    }
  });

  $commentBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const id = location.pathname.slice(11);
    const comment = commentInput.value;
    // TRYING TO GET USERDATA 
    const user = await fetch('/api/users/loggedinUser');
    const userData = await user.json()

    console.log('USERDATA LN:65 --- ', userData)
    console.log('API ', user)
    if (!comment) {
      return alert(
        "No Comment Entered :("
      );
    }
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ comment, id }),
      });
      const commentData = await response.json();
      console.log('COMMENT DATA LN:80', commentData)

        const text = document.createElement('p');
        text.textContent = commentData.text;
        text.setAttribute('class', 'comment-p');

        const commentor = document.createElement('p');
        const date = new Date(Date.parse(commentData.createdAt));
        const timestamp = date
        console.log('TIMESTAMP', timestamp)
        commentor.textContent = `-${userData.username} on ${timestamp}`;
        commentor.setAttribute('class', 'italic');

        const commentDiv = document.createElement('div');
        commentDiv.appendChild(text);
        commentDiv.appendChild(commentor);
        console.log(commentDiv)

        commentContainer.insertBefore(commentDiv, commentContainer.firstChild);
      comment.value = '';
      // location.href = '/homepage';

    } catch (err) {
      console.log(err)
    }
  });
