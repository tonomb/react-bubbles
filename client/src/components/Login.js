import React, {useState} from "react";
import axios from 'axios'

const initialState={
  username:'Lambda School',
  password:'i<3Lambd4'
}


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) =>{
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const logIn = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', formValues)
      .then(res=>{
        //token is at res.data.payload
        console.log(res);
        window.localStorage.setItem('token', res.data.payload)
      })
      .catch(err =>{
        console.log(err);
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={logIn}>
        <input type='text' placeholder='username' name='username' value={formValues.username} onChange={handleChange}/>
        <input type='password'placeholder='password' name='password' value={formValues.password} onChange={handleChange}/>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
