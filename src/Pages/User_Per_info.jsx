import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Per_Info_Bio from './Per_Info_Bio';
import Per_info_soc_pro from './Per_info_soc_pro';
import Per_info_bank from './Per_info_bank';
import Per_info_emer_cont from './Per_info_emer_cont';

// import SingleStudentAdmission from './SingleStudentAdmission';
// import ExcelUploadForm from './ExcelUpload';

const Container = styled.div`
height: fit-content;
overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        background-color: #F0F8F7;
        padding: 10px;
        cursor: pointer;
        /* height: 20px; */
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
    }

`;


const User_Per_info = (data) => {
    console.log('data idd from parent in User Inforrmation',data)
    
const [singleState, setSingleState] = useState('social_profile');

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-2 ">
                                <div className="row border-bottom border-2 ">
                                    <div className="col-xxl-12 col-xl-12 col-sm-12 col-12">

                                    <div className="row pb-2 gap-sm-0 gap-3 ">
                                            {/* <div className="col-md-2 col-sm-6 col-12 text-center ">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500 ps-3 pb-2 pe-3 heading-16  ${singleState === 'bio' ? 'ActiveState' : 'InActiveState'}`} onClick={() => {setSingleState('bio') }}>Bio</span>
                                            </div> */}
                                            <div className="col-md-2 col-sm-12 col-12 text-center px-0">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16 ${singleState === 'social_profile' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('social_profile') }}>Social Profile</span>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-center">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16  ${singleState === 'bank_account' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('bank_account') }}>Bank Account</span>
                                            </div>
                                            <div className="col-md-3 col-sm-12 col-12 text-center">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16  ${singleState === 'emergency_contact' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('emergency_contact') }}>Emergency Contact</span>
                                            </div>
                                     </div>

                                      

                                    </div>
                                </div>
                                <div className="row">
                                    {/* {
                                        singleState === 'bio' && (<Per_Info_Bio />)
                                    } */}
                                    {
                                        singleState === 'social_profile' && ( <Per_info_soc_pro  data={data} />)
                                    }
                                    {
                                        singleState === 'bank_account' && ( <Per_info_bank data={data} />)
                                    }
                                    {
                                        singleState === 'emergency_contact' && ( <Per_info_emer_cont data={data} />)
                                    }
                                    {/* {
                                        singleState === 'reimbursements' && ( <Conta_reimburse />)
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default User_Per_info
