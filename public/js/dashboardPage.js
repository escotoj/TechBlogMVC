// COULD RENAME DASHBOARD
const $newpostButton = document.getElementById('newpostBtn')

const $newpostSub = document.getElementById('newpostSub')
const $newpostBod = document.getElementById('newpostBod')

$newpostButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const data = {
      title: $newpostSub.value,
      content: $newpostBod.value
    }
    console.log(data);
    // if (data.value.trim() === '') {
    //   return alert('You must enter a something');
    // }
  
//   the data from this route should post to either the welcome page AND/OR home page
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        body: JSON.stringify(data),
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
