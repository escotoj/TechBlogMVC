// COULD RENAME DASHBOARD
const $newpostButton = document.getElementById('newpostBtn')
const $postInput = document.getElementById('newpostBod')

$button.addEventListener('click', async (event) => {
    event.preventDefault();
  
    if ($postInput.value.trim() === '') {
      return alert('You must enter a something');
    }
  
//   the data from this route should post to either the welcome page AND/OR home page
    try {
      const response = await fetch('/api/home', {
        method: 'POST',
        body: JSON.stringify({post: $postInput.value}),
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
