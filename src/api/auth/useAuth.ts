import { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        await axiosInstance.get('/auth/verify');
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();

    const handleStorageChange = () => {
      verifyAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;