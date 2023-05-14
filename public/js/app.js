const $username = document.getElementById("username");
const $password = document.getElementById("password");
const $submitBtn = document.getElementById("submitBtn");

const $signupLink = document.getElementById('signupLink');

const $newpostSub = document.querySelector('#newpostSub');

// HANDLES THE LANDING PAGE 

// selecting elements by ID to handle events and data. here we handle password and username, NEED TO TEST

$submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = $username.value;
  const password = $password.value;

  if (!username || !password) {
    return alert(
      "You must provide a valid username and password to enter your account"
    );
  }
  console.log(username, password)
  try {
    const response = await fetch("/api/users/welcome", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    location.href = `/users/${data.id}`;
  } catch (err) {
    alert(err);
  }
});
