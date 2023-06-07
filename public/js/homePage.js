const $updateBtn = document.getElementById("updateBtn");
const $deleteBtn = document.getElementById("deleteBtn");
const $commentBtn = document.getElementById("commentBtn");
const commentInput = document.getElementById("commentInput");
const commentContainer = document.getElementById("commentContainer");

// PUT GOOD
$updateBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("click", event);
  const title = document.querySelector("#updateTitle").value;
  const content = document.querySelector("#updateBody").value;
  try {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/blog/dashboard/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    alert("blog updated with Success! :)");
    // reoads page to see update
    location.href = location.href;
  } catch (err) {
    console.log(err);
  }
});

//DELETE GOOD
$deleteBtn.addEventListener("click", async (event) => {
  try {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    await fetch(`/api/blog/dashboard/${id}`, {
      method: "DELETE",
    });
    console.log("delete good");
    location.href = "/homepage";
  } catch (err) {
    console.log("BAD");
    res.status(500).json(err);
  }
});

$commentBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const id = location.pathname.slice(11);
  const comment = commentInput.value;
  // TRYING TO GET USERDATA
  const user = await fetch("/api/users/loggedinUser");
  const userData = await user.json();

  console.log("USERDATA LN:65 --- ", userData);
  console.log("API ", user);
  if (!comment) {
    return alert("No Comment Entered :(");
  }
  try {
    const response = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ comment, id }),
    });
    const commentData = await response.json();
    console.log("COMMENT DATA LN:80", commentData);

    const text = document.createElement("p");
    text.textContent = commentData.text;
    text.setAttribute("class", "comment-p");

    const commentor = document.createElement("p");
    const date = new Date(Date.parse(commentData.createdAt));
    // const timestamp = date;
    const timestamp = new Date(); // Replace this with your actual timestamp

const formattedTimestamp = timestamp.toLocaleString(); 
    
    // Date.fromJSDate(date).toFormat('ff');
    // const timestamp = luxon.DateTime.
    console.log("TIMESTAMP", timestamp);
    const newComment = document.createElement("i");
    newComment.textContent = "New Comment"
    commentor.textContent = `Posted by: ${userData.username} on ${formattedTimestamp}`;
    commentor.setAttribute("class", "italic");
    // newComment.setAttribute("class", "commentThread");
    const commentDiv = document.createElement("div");
    
    commentDiv.appendChild(newComment);
    commentDiv.appendChild(text);
    commentDiv.appendChild(commentor);
    console.log(commentDiv);

    commentContainer.insertBefore(commentDiv, commentContainer.firstChild);
    comment.value = "";
    // location.href = '/homepage';
  } catch (err) {
    console.log(err);
  }
});
