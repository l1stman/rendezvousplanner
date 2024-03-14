import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProfile } from '../redux/actions/';
import Cookies from 'js-cookie';

export const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      // Send a request to the logout endpoint
      await axios.post('http://localhost:4000/auth/logout');

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
