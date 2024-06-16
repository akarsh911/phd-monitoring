import { useState } from "react";
import FrameComponent from "../../components/FrameComponent";
import "./Login.css";
import { SERVER_URL } from '../../config';


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
    .then(response => {
      if(response.status==200)
        return  response.json()
      else 
        throw response;      
    })
    .then(data => {
      // Handle response data as needed
      // if(response.status==422)
      // {
      //   alert(data.message)
      // }
      // else if(response.status==200)
      // {
        alert("Login Token: "+data.token)
        localStorage.setItem('token', data.token);
        console.log(data.user.role)
          if(data.user.role.role!='student')
            window.location.href='/dashboard/students'
          else
        window.location.href = '/dashboard';
      // }
      // console.log(data);
    })
    .catch(error => {
      if (error instanceof Response) {
        error.json().then(data => {
          if (error.status === 422) {
            alert(data.message);
          } else if (error.status === 401) {
            alert("Invalid email or password");
          } else if (error.status === 500) {
            alert("Server error. Please try again later.");
          }
        }).catch(jsonError => {
          console.error('Error parsing JSON:', jsonError);
        });
      } else {
        console.error('Unexpected error:', error);
      }
    });
    
};

const MacBookPro14 = () => {
  const [checkChecked, setCheckChecked] = useState(true);
  return (
    <div className="macbook-pro-14-1">
       <img className="image-1-icon" alt="" src="/image-1@2x.png" />
      <main className="rectangle-parent">
        <div className="frame-child" />
        <div className="frame-wrapper">
          <div className="account-label-parent">
            <div className="account-label">
              <h1 className="login-to-your">Login to your Account</h1>
            </div>
            <div className="frame-parent">
              <div className="frame-container">
                <button className="sign-in-google">
                  <img
                    className="image-2-icon"
                    loading="lazy"
                    alt=""
                    src="/image-2@2x.png"
                  />
                  <b className="continue-with-google">Continue with Thapar ID</b>
                </button>
              </div>
              <div className="or-sign-in-container">
                <span>-------------</span>
                <span className="or-sign-in">{` or Sign in with Email `}</span>
                <span>{`------------- `}</span>
              </div>
              <form className="frame-group" onSubmit={handleLoginSubmit}>
                <div className="frame-div">
                  <div className="email-parent">
                    <div className="email">Email</div>
                    <div className="mailabccom-wrapper">
                      <input
                        className="mailabccom"
                        placeholder="mail@abc.com"
                        type="text"
                        name="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="frame-parent1">
                    <div className="password-parent">
                      <div className="password">Password</div>
                      <div className="password-label">
                        <input
                          className="input"
                          placeholder="*****************"
                          type="password"
                          name="password"
                          required
                        />
                      </div>
                    </div>
                    <div className="checkbox-parent">
                      <div className="checkbox">
                        <input
                          className="check"
                          checked={checkChecked}
                          type="checkbox"
                          onChange={(event) =>
                            setCheckChecked(event.target.checked)
                          }
                        />
                        <div className="remember-me">Remember Me</div>
                      </div>
                      <div className="forgot-password">Forgot Password?</div>
                    </div>
                  </div>
                </div>
                <button className="login-wrapper">
                  <div className="login">Login</div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <FrameComponent />
      </main>
    </div>
  );
};

export default MacBookPro14;
