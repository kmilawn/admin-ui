import React, { useContext } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignIn from '../components/Fragments/FormSignIn';
import { loginService } from '../services/authService';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); 

  	const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
			
			login(refreshToken); 
    } catch (err) {
      console.error(err.msg);
    }
  };

  return (
    <>
      <AuthLayout>
        <FormSignIn onSubmit={handleLogin} />
      </AuthLayout>
    </>
  );
}

export default SignIn