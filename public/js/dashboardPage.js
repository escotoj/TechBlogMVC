// COULD RENAME DASHBOARD
const $postBtn = document.getElementById('postBtn')
const $newpostSub = document.getElementById('newpostSub')
const $newpostBod = document.getElementById('newpostBod')

$postBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const newBlog = {
      title: $newpostSub.value,
      content: $newpostBod.value
    }
    console.log(newBlog);
    // if (data.value.trim() === '') {
    //   return alert('You must enter a something');
    // }
  
    try {
      const response = await fetch('/api/users/dashboard', {
        method: 'POST',
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


  