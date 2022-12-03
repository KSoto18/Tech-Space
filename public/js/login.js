
const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#login-username-input').value.trim();
  const password = document.querySelector('#login-password-input').value.trim();

  if (username && password) {

    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      loggedIn = true;
      document.location.replace('/dashboard');

    } else {
      alert('Failed to log in.');
      console.log(username, password);
    }
  }
};

const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-username-input').value.trim();
  const password = document.querySelector('#signup-password-input').value.trim();

  if (username && password) {

    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');

    } else {
      alert('Failed to sign up.');
    }
  }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginHandler);


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupHandler);




