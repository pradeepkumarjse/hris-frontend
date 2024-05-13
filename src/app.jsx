/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import {useState, useEffect,useCallback } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// export const LoginPage = lazy(() => import('src/pages/login'));

import LoginPage from 'src/pages/login';

import Cookies from 'js-cookie';
import { setLoggedIn, setAccessToken } from 'src/store/slices/authSlice';
import {setData} from 'src/store/slices/currentUserSlice';
import { apiPost } from 'src/utils/apiUtils';

import LoadingIndicator from 'src/components/LoadingIndicator'





// export default function App() {
//   useScrollToTop();
//   const dispatch = useDispatch();

//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   const getCurrentUserData = useCallback(async () => {
//     const username = Cookies.get('username');
//     const userResponse = await apiPost('/api/users/currentUser', { email: username });
//     console.log(" currentUserdata  ", userResponse);
//     dispatch(setData({ currentUser: userResponse }));
//   }, [dispatch]);

//   useEffect(() => {
//     // Check if the token is present in cookies
//     const accessToken = Cookies.get('accessToken');


//     if (accessToken) {
//       // Dispatch actions to set isLoggedIn to true and set the token
//       dispatch(setLoggedIn(true));
//       dispatch(setAccessToken(accessToken));

//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       getCurrentUserData();
//     }
//   }, [dispatch,getCurrentUserData]);

//   // const getCurrentUserData = async () =>{
    
//   //   const username = Cookies.get('username');

//   //   const userResponse = await apiPost('/api/users/currentUser', { email: username });

//   //   console.log(" currentUserdata  ",userResponse);

//   //   dispatch(setData({ currentUser: userResponse }));
//   // }



//   //   useEffect(() => {
//   //   // Check if the token is present in cookies


//   //   console.log("isLoggedin  ",isLoggedIn)
   
//   // },[isLoggedIn]);

//   return (
//     <ThemeProvider>
//      { isLoggedIn ? <Router /> : <LoginPage /> }

//      {/* <Router /> <LoginPage /> */}
//     </ThemeProvider>
//   );
// }

// ... (existing imports)

export default function App() {
  useScrollToTop();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // Added loading state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const getCurrentUserData = useCallback(async () => {
    try {
      const username = Cookies.get('username');
      const userResponse = await apiPost('/api/users/currentUser', { email: username });
      console.log(" currentUserdata  ", userResponse);
      dispatch(setData({ currentUser: userResponse }));
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, [dispatch]);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(accessToken));

      getCurrentUserData();
    } else {
      setLoading(false); // Set loading to false if there's no access token
    }
  }, [dispatch, getCurrentUserData]);

  if (loading) {
    return <LoadingIndicator/>;
  }

  return (
    <ThemeProvider>
      {isLoggedIn ? <Router /> : <LoginPage />}
    </ThemeProvider>
  );
}

