import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'

const Container = styled.div`
     /* height: 92vh;  */
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }

    .headingBgColor{
        background-color: var(--headingBackgroundColor);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }
    
`;

const PaymentSettings = () => {
  return (
    <Container>
      <div className="container-fluid">
        <div className="row p-2 pt-4">
            <div className="row pb-3">
                <div className="col-lg-6 col-md-6 col-sm-12 flex-frow-1">
                    <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1">
                            <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Settings</a></li>
                            <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Payment Settings</li>
                        </ol>
                    </nav>
                    <p className='font16 ps-0 fontWeight500'>Payment Settings</p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                    {/* <div className="row">
                        <div className="col-md-3 col-sm-6 text-end p-0">
                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                <span className='font16 textVerticalCenter'>
                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em"  style={{color: "#008479"}} />
                                    <span className='ms-1'>Export to CSV</span>
                                </span>
                            </Link>
                        </div>
                        <div className="col-md-3 col-sm-6 text-center p-0">
                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
                                <span className='font16 textVerticalCenter'>
                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em"  style={{color: "#008479"}} />
                                    <span className='ms-1'>Export to PDF</span>
                                </span>
                            </Link>
                        </div>
                        <div className="col-md-6 col-sm-6 p-0">
                            <form className="d-flex" role="search">
                                <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn searchButtons text-white" type="submit"><span className='font16'>Search</span></button>
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="row pb-3">
                <div className="overflow-scroll cardradius bg-white p-3">
                    <div className="mb-3">
                        <div className='d-flex align-items-center headingBgColor p-2 cardradius2 mb-3'>
                            <Icon icon="ph:currency-circle-dollar-bold" width="1.4em" height="1.4em"  style={{color: 'black'}} />
                            <h2 className='ms-1 fontWeight500'>School Currency</h2>
                        </div>
                        <form className="row mb-1">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">School Currency</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleSchoolCurrencyChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option selected value='USD'>USD</option>
                                    <option value='EUR'>EUR</option>
                                    <option value='INR'>INR</option>
                                    <option value='RUB'>RUB</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Currency Position</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleCurrencyPositionChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option selected value='Left'>Left</option>
                                    <option value='Right'>Right</option>
                                    <option value='Top'>Top</option>
                                    <option value='Bottom'>Bottom</option>
                                    <option value='Center'>Center</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='btn addCategoryButtons text-white'>Update Currency</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='d-flex align-items-center headingBgColor p-2 cardradius2 mb-3'>
                            <Icon icon="jam:id-card" width="1.4em" height="1.4em"  style={{color: 'black'}} />
                            <h2 className='ms-1 fontWeight500'>Offline Payment Instruction</h2>
                        </div>
                        <form className="row mb-1">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Offline Payment Instruction Image/PDF</label>
                                <input type="file" className={`form-control font14`} id="validationDefault02" placeholder="Enter Password" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Offline Payment Instruction</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="You can pay through mobile banking." onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='btn addButtons text-white'>Update</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='d-flex align-items-center headingBgColor p-2 cardradius2 mb-3'>
                            <Icon icon="streamline:paypal-solid" width="1.2em" height="1.2em"  style={{color: 'black'}} />
                            <h2 className='ms-1 fontWeight500'>Paypal settings</h2>
                        </div>
                        <form className="row mb-1 g-3">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleSchoolCurrencyChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option selected value='Yes'>Yes</option>
                                    <option value='No'>No</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleCurrencyPositionChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option selected value='Sandbox'>Sandbox</option>
                                    <option value='Live'>Live</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Client ID (Sandbox)</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="snd_cl_id_xxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Client Secrect (Sandbox)</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="snd_cl_sid_xxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Client ID (Live)</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="lv_cl_id_xxxxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Client Secrect (Live)</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="lv_cl_sid_xxxxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='btn addCategoryButtons text-white'>Update Paypal</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='d-flex align-items-center headingBgColor p-2 cardradius2 mb-3'>
                            <Icon icon="ph:stripe-logo-bold" width="1.4em" height="1.4em"  style={{color: 'black'}} />
                            <h2 className='ms-1 fontWeight500'>Stripe settings</h2>
                        </div>
                        <form className="row mb-1 g-3">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleSchoolCurrencyChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option  value='Yes'>Yes</option>
                                    <option selected value='No'>No</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleCurrencyPositionChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option  value='Sandbox'>Sandbox</option>
                                    <option selected value='Test'>Test</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Test Public Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="pk_test_xxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Test Sectect Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="sk_test_xxxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Live Public Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="pk_live_xxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Live Sectect Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="sk_live_xxxxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='btn addCategoryButtons text-white'>Update Stripe</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='d-flex align-items-center headingBgColor p-2 cardradius2 mb-3'>
                            <Icon icon="simple-icons:paytm" width="1.0em" height="1.0em"  style={{color: 'black'}} />
                            <h2 className='ms-1 fontWeight500'>Paytm settings</h2>
                        </div>
                        <form className="row mb-1 g-3">
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleSchoolCurrencyChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option  value='Yes'>Yes</option>
                                    <option selected value='No'>No</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Active</label>
                                <select className={`form-select font14`} aria-label="Default select example" onChange={(e) => handleCurrencyPositionChange(e.target.value)}>
                                    <option >--- Choose ---</option>
                                    <option  value='Sandbox'>Sandbox</option>
                                    <option selected value='Test'>Test</option>
                                </select>
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Test Merchant Id</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="tm_id_xxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Test Merchant Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="tm_key_xxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Live Merchant Id</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="tm_id_xxxxxxxxxxxx" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Live Merchant Key</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="Live Merchant Key" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Environment</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="provide-a-environment" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Merchant_Website</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="merchant-website" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Channel</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="provide-channel-type" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Industry_type</label>
                                <input type="text" className={`form-control font14`} id="validationDefault02" placeholder="provide-industry-type" onChange={(e) => handleStudentPasswordChange(e.target.value)} />
                                <span className='text-danger'></span>
                            </div>
                        </form>
                        <div className="row p-3">
                            <button className='btn addCategoryButtons text-white'>Update Paytm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Container>
  )
}

export default PaymentSettings