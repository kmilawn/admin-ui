import React, { useState } from 'react';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignUp from '../components/Fragments/FormSignUp';
import { registerService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import AppSnackbar from '../components/Elements/AppSnackbar';

function SignUp() {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await registerService(name, email, password);
      console.log('Register response:', response);
      
      setSnackbar({
        open: true,
        message: "Register Berhasil",
        severity: "success",
      });

      // Redirect setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Register error:', err);
      
      let message = err.msg || 'Registrasi gagal';
      if (err.msg === 'Email sudah terdaftar' || 
          err.msg === 'Email sudah pernah digunakan sebelumnya' ||
          err.msg === 'Email already registered') {
        message = 'Email sudah pernah digunakan sebelumnya';
      }
      
      setSnackbar({
        open: true,
        message: message,
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <FormSignUp onSubmit={handleRegister} />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
}

export default SignUp;