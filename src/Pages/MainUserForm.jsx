import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Fee_collection from './Fee_collection';
import { Icon } from '@iconify/react/dist/iconify.js';
import User_Contact from './User_Contact';
import User_basic_infomation from './User_basic_infomation';
import User_Per_info from './User_Per_info';
import User_Prof_pic from './User_Prof_pic';
import User_Accou_info from './User_Accou_info';
import User_Documnt from './User_Documnt';
import User_Chan_pass from './User_Chan_pass';


// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;
}
.container-div-conetent{
    padding: 18px 18px 18px 18px;
    background-color: #fff;
    border-radius: 3px;
}
.my-ul{
    border: 1px solid #D7E7E5;

}
.content-div{
    background-color: #E5F3F2;
    text-align: center;
    padding: 15px 0px 15px 0px;
}
.li-link{
    color: #000;
    text-decoration: none ;
    cursor: pointer !important;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: transparent ;
    color: orange;
    border-bottom: 1px solid orange;
    border-radius: 0;
}
.my-nav-link{
    color: #000;
    pointer-events: none !important;
}
.for-padding{
    /* padding: 0px 0px 2px 60px; */
}
.li-links{
    border: 1px solid  #D7E7E5;
}

`;
// ## style css area end ####  

const MainUserForm = () => {
    return (
        <Container>
            <div className="container-fluid p-4">
                <div className="container-div-conetent">
                    <div className="row " >

                        <div className="col-lg-3 div-col-3" >

                            <div className="content-div">
                                <p>
                                    <img src="./public/images/Ellipse 26 (3).png" alt="" />
                                </p>
                                <h2 className='heading-20 mt-2' >Jhon Doe</h2>
                                <p className='heading-14'>jhon.doe@example.com</p>
                                <p className='heading-14'>Admin</p>
                            </div>
                            <div className='li-links'>
                                <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                    <Link class="nav-link active my-nav-link d-flex ms-3" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Basic Information</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>

                                    <Link class="nav-link  my-nav-link d-flex ms-3" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                        <span className='flex-grow-1 heading-16'>Contact</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>

                                    <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">

                                        <span className='flex-grow-1 heading-16'>Personal Information</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>
                                    <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Profile Picture</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>
                                    {/* <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-settings-tab11" data-bs-toggle="pill" data-bs-target="#v-pills-settings1" type="button" role="tab" aria-controls="v-pills-settings1" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Account Information</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link> */}
                                    <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-settings-tab2" data-bs-toggle="pill" data-bs-target="#v-pills-settings2" type="button" role="tab" aria-controls="v-pills-settings2" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Documents </span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>
                                    {/* <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-settings-tab3" data-bs-toggle="pill" data-bs-target="#v-pills-settings3" type="button" role="tab" aria-controls="v-pills-settings3" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Timesheet Agenda</span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link> */}
                                    <Link class="nav-link my-nav-link d-flex ms-3" id="v-pills-settings-tab4" data-bs-toggle="pill" data-bs-target="#v-pills-settings4" type="button" role="tab" aria-controls="v-pills-settings4" aria-selected="false">
                                        <span className='flex-grow-1 heading-16'>Change Password </span>
                                        <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                                    </Link>
                                </div>
                            </div>


                        </div>

                        <div className="col-lg-9">
                            <div class="tab-content" id="v-pills-tabContent">
                                <div class="tab-pane fade show active " id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0" >
                                    <User_basic_infomation />
                                </div>
                                <div class="tab-pane fade  for-disabled"  id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                                    <User_Contact />
                                </div>
                                <div class="tab-pane fade for-disabled" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                                    <User_Per_info />
                                </div>
                                <div class="tab-pane fade for-disabled" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">
                                    <User_Prof_pic />
                                </div>

                                <div class="tab-pane fade for-disabled" id="v-pills-settings2" role="tabpanel" aria-labelledby="v-pills-settings-tab2" tabindex="0">
                                    <User_Documnt />
                                </div>
                                <div class="tab-pane fade for-disabled" id="v-pills-settings4" role="tabpanel" aria-labelledby="v-pills-settings-tab4" tabindex="0">
                                    <User_Chan_pass />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </Container >
    )
}

export default MainUserForm


