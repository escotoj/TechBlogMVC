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
  try {
    const response = await fetch("/api/users/signup", {
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


// clicking on the sign up link directs you to the signup page NEED TO CHECK 
$signupLink.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'GET',
      });
    } catch (err) {
      alert(err);
    }
  });



      // response.data.render();
      // location.href = '/views/signup.handlebars';
  //   } catch (err) {
  //     alert(err);
  //   }
  // });