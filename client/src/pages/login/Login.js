import React, { useState } from 'react';
import './Login.css';
import { SERVER_URL } from '../../config'
const EntryPage = () => {
  const [currentView, setCurrentView] = useState("logIn");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); 

    const email = event.target.email.value;
    const password = event.target.password.value;

    // Example POST request using fetch API
    console.log(SERVER_URL)
    fetch(SERVER_URL+'/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {response.json()})
      .then(data => {
        // Handle response data as needed
        // if(response.status==422)
        // {
        //   alert(data.message)
        // }
        // else if(response.status==200)
        // {
        //   alert("Login Token: "+data.token)
        // }
        // console.log(data);
      })
      .catch(error => {
        console.log("Error has occured")
        if(error.response.status == 422) {
          alert(error.response.data.message);
        }
        if(error.response.status == 401) {
          alert("Invalid email or password");
        }
        else if(error.response.status == 500) {
          alert("Server error. Please try again later.");
        }
        // Handle errors
        console.error('Error:', error);
      });
  };

  const currentViewContent = () => {
    switch (currentView) {
      case "logIn":
        return (
          <form onSubmit={handleLoginSubmit}>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="text" id="email" required />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
                <li>
                  <i />
                  <a onClick={() => changeView("PWReset")} href="#">Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button type="submit">Login</button>
          </form>
        );
      case "PWReset":
        return (
          <form>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => changeView("logIn")}>Go Back</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <section id="entry-page">
      {currentViewContent()}
    </section>
  );
};

export default EntryPage;
