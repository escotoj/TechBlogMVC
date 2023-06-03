
const $editBtn = document.getElementById('editBtn');
const $deleteBtn = document.getElementById('deleteBtn');

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
      inputElement.setAttribute("id", "myInput");
      var container = document.getElementById("container");
      container.appendChild(inputElement);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });


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
