import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgetSuccess from '../Pages/Login/ForgetSuccess';
import ForgotPassword from '../Pages/Login/ForgotPassword';
import VerifyOTP from '../Pages/Login/VerifyOTP';
import NewPassSet from '../Pages/Login/NewPassSet';
import Login from '../Pages/Login/Login';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #F2F3F6;
`;

const WithoutAuth = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/forgetsuccess' element={<ForgetSuccess/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/verifyOtp' element={<VerifyOTP/>}/>
          <Route path='/setNewPass' element={<NewPassSet/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default WithoutAuth