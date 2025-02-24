import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const instance = axios.create({
  baseURL: `https://flavors-server.vercel.app`,
  // baseURL: `https://flavors-server.vercel.app`
});

const useAxiosSecure = () => {
  const { logout } = useAuth() 
  const navigate = useNavigate()

  useEffect(() => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('flavors-access-token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logout();

        navigate('/login')
      }

      return Promise.reject(error);
    }
  );
  }, [logout, navigate, instance])
  

  return [instance];
};

export default useAxiosSecure;