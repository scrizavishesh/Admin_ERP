import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { loginApi } from '../Utils/Apis';


const Container= styled.div`
.btnsubmitOwn{
    background-color: #008479 !important;
}

.imagearea{
    background: linear-gradient(#F0F8F7, white);
}

.formarea{
    background:linear-gradient(#F0F8F7, white);
}

.formcontrolinput{
    border: 1px solid #E4E7EB;
    border-radius: 6px;
    font-size: 16px;
}

.formcontrolinput::placeholder{
    color: #ADADBD;
    font-size: 14px;
}
`;


const Login = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const SubmitLogin= async() => {
        try {
            const data = {
              'email': email,
              'password': pass
            }
            var response = await loginApi(data)
            console.log(response);
      
            if (response?.status === 200) {
                if(response.data.status==='success')
                {
                    localStorage.setItem('token', response?.data?.token)
                    console.log('login success');
                    console.log('login token', response?.data?.token);
                    window.location.reload();
                }
                else
                {
                    console.log('login fail')
                }
            } 
            else 
            {
                toast.error(response?.error);
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    }
  
    return (
      <>
          <Container>
              <div className="conatiner-fluid loginmain">
                  <div className="row">
                      <div className="col-md-6 col-sm-12 p-5 imagearea">
                          <img src="./images/loginimg.svg" alt="" className='img-fluid m-4'/>
                      </div>
                      <div className="col-md-6 col-sm-12 p-5 formarea">
                          <div className="row text-center pt-5 mt-5">
                              <p><img src="./images/Scrizalogo.svg" alt="" className='img-fluid' /></p>
                          </div>
                          <div className="row p-5 ms-3 me-3">
                              <form>
                                  <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">Email</label>
                                      <input type="email" className="form-control formcontrolinput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Your Email Address' onChange={(e)=> setEmail(e.target.value)}/>
                                  </div>
                                  <div className="mb-3">
                                      <label for="exampleInputPassword1" className="form-label">Password</label>
                                      <input type="password" className="form-control formcontrolinput col-11" id="exampleInputPassword1" placeholder='&#xf084; 6+ Strong Character' onChange={(e)=> setPass(e.target.value)}/>
                                  </div>
                                  <div className="mb-4 mt-4 form-check d-flex">
                                      <div className="col-6">
                                          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                          <label className="form-check-label ps-2" for="exampleCheck1">Remember Me</label>
                                      </div>
                                      <div className="col-6 text-end">
                                          <Link className='text-primary text-decoration-none' to='/forgotPassword'>Forget Password?</Link>
                                      </div>
                                  </div>
                                  <div className="d-grid gap-2 col-12 mx-auto">
                                      <Link type="submit" className="btn btnsubmitOwn text-white" onClick={SubmitLogin}>Submit</Link> 
                                      {/* onClick={loginApi} */}
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </Container>
      </>
    )
  }

export default Login