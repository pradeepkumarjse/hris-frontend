
import React, { useState } from 'react';

import { setData } from 'src/store/slices/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';

import { setLoggedIn, setAccessToken } from 'src/store/slices/authSlice';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { alpha, useTheme } from '@mui/material/styles';

import Cookies from 'js-cookie';

import { apiPost } from 'src/utils/apiUtils';

import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';



export default function LoginView() {
  const theme = useTheme();

  const dispatch = useDispatch();

  const currentData = useSelector((state) => state.currentUser.data);

  const updateData = (data) => {
    console.log(" RENDER  ",currentData)
    dispatch(setData({ currentUser: data }));
  };


  // const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);




  
  // const handleClick = async () => {
  //   // router.push('/');

  //   try {

  //     const data={        
  //         username: email,
  //         password,
  //         organizationId: 1
  //     }
  //     await  apiPost('/authenticate', data).then((res) =>{
  //         Cookies.set('accessToken', res.jwttoken, { expires: 15 }); // expires in 15 days
  //         dispatch(setAccessToken(res.jwttoken));
  //          apiPost('/api/users/currentUser',{email: res.username}).then((resp) => {
  //           updateData(resp);
  //           dispatch(setLoggedIn(true));
  //         }).catch((error) => console.error('/api/users/currentUser error:', error))     
  //     }
  //     )
  //     .catch((error) => console.error(password,'POST error:', error));

  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
   
  // };


  const handleClick = async () => {
    try {
      const data = {
        email,
        password,
        organizationId: 1
      };
  
      // Authenticate and get the JWT token
      const authResponse = await apiPost('/authenticate', data);
      const accessToken = authResponse.jwttoken;
  
      // Set the token in cookies
      Cookies.set('accessToken', accessToken, { expires: 15 }); // expires in 15 days
      Cookies.set('username', authResponse.username, { expires: 15 }); 
  
      // Dispatch action to set token in Redux store
      dispatch(setAccessToken(accessToken));
  
      // Fetch user data using the obtained token
      const userResponse = await apiPost('/api/users/currentUser', { email: authResponse.username });
  
      // Update user data in Redux store
      updateData(userResponse);
      
      // Dispatch action to set isLoggedIn to true
      dispatch(setLoggedIn(true));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"  onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
        <img
          src="/assets/logo-black.png"
          alt="logo"
          style={{ width: '100%', marginBottom: '20px' }}
        />

          <Typography variant="h4"  sx={{ mt: 2, mb: 5 }}>Sign in to your account</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
