import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { isLoggedInAtom } from '../recoil/atoms';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [type, setType] = useState('login'); // login or register
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        type === 'login'
          ? `${import.meta.env.VITE_API_URL}/api/auth/login`
          : `${import.meta.env.VITE_API_URL}/api/auth/register`;

      const res = await axios.post(endpoint, formData);

      if (type === 'login') {
        const token = res.data.token;
        localStorage.setItem('token', token);

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('userId', tokenPayload.id);
        localStorage.setItem('username', tokenPayload.username);

        setIsLoggedIn(true);
        toast.success('🎉 Logged in successfully!');
        navigate('/dashboard');
      } else {
        toast.success(res.data?.msg || '✅ Registered successfully!');
        setType('login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {type === 'login' ? 'Login to your account' : 'Create an account'}
        </h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          {type === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => setType('register')}
                className="text-blue-600 hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setType('login')}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
