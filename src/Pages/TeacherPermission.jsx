import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
.main-content-conatainer22{
    background-color: #fff;
    margin: 10px;
    height: 70vh;
    border-radius: 5px;
}

.header-1{
    background-color: var(  --LightGreenHeadingBgColor) !important;
    border-radius: 5px;
    margin-top: 15px;
}
.header-1 h6{
    margin-top: 2px;
}
.input-icon img{
    object-fit: cover;
    width: 18px;
    margin-left: 7px;
    margin-top: 4px;
}
.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none  !important;
}
.form-focus-input:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: 1px solid #ced4da !important;
    outline: none !important;
    box-shadow: none  !important;
}
.form-control:focus {
    border-color: #ced4da !important;
}
.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
}
.my-button11 button:hover{
    background-color: var( --buttonBgColor) !important;
    color: var(  --whiteColor) !important;
}
.background-color{
    background-color: var( --tableGreyBackgroundColor);

}
.my-dropdown-menu{
    width: 100%;
    height: 100%;
     border-radius: 5px;
    border: 1px solid #E4E7EB;
    color: #000;
    background: #FFF;
    height: 34px;
  }
  .my-dropdown-menu span{
    color: #fff;
  }
  .my-ul-menu{
    width: 100%;
  }
 
  /* ########## media query ###########  */
  @media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}
  @media only screen and (max-width: 768px) {
    .for-media-margin{
       padding: 0px 14px 0px 14px  !important;
    }
    .media-margin-top{
        margin-top: 10px;
    }
}
`;
// ## style css area end ####  

const TeacherPermission = () => {
    return (
        <Container>
          <div className="container-fluid main-body p-3">
         <div className='d-flex justify-content-between for-dislay-direction'>
         <div className="breadCrum ms-2">
         <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
             <ol class="breadcrumb ps-2">
                 <li class="breadcrumb-item active font-color heading-14" aria-current="page">Home</li>
                 <li class="breadcrumb-item active font-color heading-14" aria-current="page">Users</li>
                 <li class="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Teacher Permission</Link></li>
             </ol>
         </nav>
         </div>
      
         </div>
         <h5 className='ms-2 margin-minus22 heading-16 ps-2'>Teacher Permission</h5>
     
         <div className="main-content-conatainer22 pt-4 ">

            <div className='background-color m-4'>
             <div className="row heading-14 p-3 pt-3" style={{marginTop:'-15px'}}>
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                    <label for="exampleFormControlInput1 " class="form-label heading-14 text-color-000 mb-0">Class*</label>
                    <div className="dropdown my-dropdown-menu mt-1">
                        <Link className="btn btn-secondary heading-14   my-dropdown-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='d-flex justify-content-between'>
                                <div>
                                Select Class 
                                </div>
                                <div>
                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                    <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                                </svg>
                                </div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu heading-14 my-ul-menu">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">3</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">4</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">5</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">6</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">7</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">8</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">9</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">10</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 ">
                    <label for="exampleFormControlInput1 " class="form-label heading-14 text-color-000 mb-0">Section*</label>
                    <div className="dropdown my-dropdown-menu mt-1">
                         <Link className="btn btn-secondary heading-14   my-dropdown-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className='d-flex justify-content-between'>
                                <div>
                                Select Section
                                </div>
                                <div>
                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                    <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                                </svg>
                                </div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu heading-14 my-ul-menu">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">3</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">4</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">5</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">6</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">7</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">8</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">9</a></li>
                            <hr className='m-0  mx-3'/>
                            <li><a className="dropdown-item" href="#">10</a></li>
                        </ul>
                    </div>
                </div>
             </div>
              {/* ####### buttons ######  */}
              <div className="row mt-3 pb-5">
                <div className='my-button11 heading-16'>
                    <button type="button" class="btn btn-outline-success">Search</button>
                    <button type="button" class="btn btn-outline-success">Cancel</button>
                </div>
             </div>
     
             </div>

               
          </div>
         </div>
        </Container>
       )
}

export default TeacherPermission
