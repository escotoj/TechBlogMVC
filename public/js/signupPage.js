const $newusername = document.getElementById("newusername");
const $newpassword = document.getElementById("newpassword");
const $submitBtn = document.getElementById("submitBtn");



$submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const data = {
        username: $newusername.value,
        password: $newpassword.value
    }
    console.log(data);
if (data) {
    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(data.value),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
        console.log(response)
        // document.location.replace('/');
      } else {
        alert('Failed to register');
      }
}

})
