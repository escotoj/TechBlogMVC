const newusername = document.getElementById("newusername");
const newpassword = document.getElementById("newpassword");
const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async (event) => {
  event.preventDefault();
   const username = newusername.value
    const password = newpassword.value
  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log('GOOD', response);
      alert(`${username} was successfully registered, let's post our first Blog`)
      document.location.replace('/dashboard');
    } else {
      alert("Signup failed");
      console.log('BAD',response)
    }
  }
});
