const $editBtn = document.getElementById('editBtn');
const $deleteBtn = document.getElementById('deleteBtn');

$editBtn.addEventListener('click', async (event) => {
    const newBlog = {
      title: $newpostSub.value,
      content: $newpostBod.value
    }
    console.log(newBlog);
    try {
      const response = await fetch('/api/blog/dashboard', {
        method: 'PUT',
        body: JSON.stringify({newBlog}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });

  $deleteBtn.addEventListener('click', async (event) => {
    try {
    const id = event.target.getAttribute('data-id')
      const response = await fetch(`/api/blog/dashboard/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });