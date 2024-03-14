import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProfile } from '../redux/actions/';
import Cookies from 'js-cookie';

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      // Send a request to the logout endpoint
      await axios.post(import.meta.env.VITE_BASE_URL + '/auth/logout');

      // Remove the user data from the Redux store
      dispatch(deleteProfile());

      // Delete the cookies
      Cookies.remove('token', { path: '' })
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return logout;
};
