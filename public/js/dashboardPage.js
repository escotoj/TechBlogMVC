// COULD RENAME DASHBOARD
const $postBtn = document.getElementById('postBtn')
const $newpostSub = document.getElementById('newpostSub')
const $newpostBod = document.getElementById('newpostBod')

$postBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const newBlog = {
      title: $newpostSub.value,
      content: $newpostBod.value,
    }
    console.log(newBlog);
  
    try {
      const response = await fetch('/api/blog/dashboard', {
        method: 'POST',
        body: JSON.stringify({newBlog}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const data = await response.json();
      document.location.replace('/homepage')
      alert('New Blog Posted view in the Homepage', data)
  
    } catch (err) {
      console.log(err);
    }
  });


  