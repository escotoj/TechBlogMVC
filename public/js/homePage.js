
const $editBtn = document.getElementById('editBtn');
const $deleteBtn = document.getElementById('deleteBtn');

const $commentBtn = document.getElementById('commentBtn');


const commentInput = document.getElementById('commentInput');

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
    const user = await fetch(`/dashboard/${id}`);

    // USED THIS TO HARD CODE AN ID
    // const userData = event.pointerId

    const userData = user.loggedin
    console.log(comment)
    console.log('Blog ID ', id)
    console.log('USERDATA LN:65 --- ', userData)

    console.log('event TEST --- ', event) 
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

      //         // Add new comment to the page
      //   // Create paragraph with comment text
      //   const text = document.createElement('p');
      //   text.textContent = commentData.text;
      //   text.setAttribute('class', 'comment-text');

      //   // Create paragraph 
      //   const authorPara = document.createElement('p');
      //   const date = new Date(Date.parse(commentData.createdAt));
      //   const timestamp = date
      //   // authorPara.textContent = `-${userData.username} on ${timestamp}`;
      //   authorPara.setAttribute('class', 'italic');

      //   // Create containing div and add paragraphs to it
      //   const commentDiv = document.createElement('div');
      //   commentDiv.appendChild($textPara);
      //   commentDiv.appendChild(authorPara);

      //   // Add new div to top of comments div
      //   // commentsDiv.insertBefore(commentDiv, commentsDiv.firstChild);
        
      //   // Clear out the comment input field
      //   comment.value = '';
      // // location.href = '/dashboard';
    } catch (err) {
      console.log(err)
    }
  });
