import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PayrollGetAllApi } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';
import toast, { Toaster } from 'react-hot-toast';
import { RolePermissionGetApi } from '../Utils/Apis'
import { TeacherGetAllApi } from "../Utils/Apis";
import { ContractGetAllApi } from "../Utils/Apis";
// import { PayrollPostApi } from "../Utils/Apis";
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
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}



.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;

  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
}
.overflow-y {
  max-height: 300px; /* Set the maximum height as needed */
  overflow-y: auto; /* Add vertical scrollbar if necessary */
}
.main-container101{
    background-color: #F6F6FF;
    border-radius: 5px;
}
.plus-design a{
    font-size: 40px;
    text-decoration: none;
    color: #008479;
    padding: 0px;
    
  
}
.darkGreyBgColor{
    background: #E7E7E7;
}
/* .plus-design p {
  border: 1px solid #008479;
  border-radius: 2px;
  padding: 0;
} */
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  

const PayRoll_Create = () => {

    // console.log('allowance amountt',allowance)
    const [deduction, setDeduction] = useState()
    const [loader, setLoader] = useState(false)
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [showdelete, setShowdelete] = useState(true);

    // custome code 
    const [formValues, setFormValues] = useState([{
        title: "",
        amount: ""
    }])

    const [allowance, setAllowance] = useState({

        // [formValues[0].title]: formValues[0].amount

    });
    console.log('allowance', allowance)

    console.log('form data', formValues)

    const [formValues12, setFormValues12] = useState([{
        title: "",
        amount: ""

    }])
    const handleAddEmployerFields = async () => {
        setFormValues([
            ...formValues,
            {
                title: "",
                amount: ""
            },
        ]);
    };

    const handleEmployChange = async (i, e) => {
        const value = [...formValues];
        value[i][e.target.name] = e.target.value;
        setFormValues(value);
        setAllowance([e.target.value])

    };
    const removeEmployeRow = async (i) => {
        if (formValues.length > 1) {
            formValues.splice(i, 1);
            setFormValues([...formValues]);
        }
    };

    // custome code 

    const [feature, setFeature] = useState()

    const [allowanceType, setAllowanceType] = useState()
    const [allowanceAmount, setAllowanceAmount] = useState()

    // console.log(formValues, 'formValues data')
    // console.log(allowanceType,'allowanceType data') 

    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [searchKey, setSearchKey] = useState('')
    const [rolePermisAllData, setRolePermisAllData] = useState([])
    // console.log('rolesss permissionnn12345',rolePermisAllData)
    const [TeacherAllData, setTeacherAllData] = useState([]);
    const [year2, setYear2] = useState()
    const [month2, setMonth2] = useState()
    const [roleId, setRoleId] = useState()
    console.log('my role iddd ', roleId)
    const [staffId, setStaffId] = useState()
    const [status, setStatus] = useState()

    const [basicPay, setBasicPay] = useState()
    const [paid, setPaid] = useState()



    const UpdateHandleBtn = (e) => {

        if (show === true && hide === false) {
            setShow(false)
            setHide(true)
        } else {
            setShow(true)
        }
    }

    const showNamedelete = () => {
        if (showdelete === true && hidedelete === false) {
            setShowdelete(false)
            setHidedelete(true)
        } else {
            setShowdelete(true)
        }
    }

    // Add remove fields start
    //  fields First 

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        setFeature([e.target.value])
    }
    let addFormFields = () => {
        // setAdd1(true);
        setFormValues([...formValues,])


    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    // second fields 
    let handleChange12 = (i, e) => {
        let newFormValues = [...formValues12];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues12(newFormValues);
        setFeature([e.target.value])
    }
    let addFormFields12 = () => {

        setFormValues12([...formValues12, { name: "" }])
    }
    let removeFormFields12 = (i) => {
        let newFormValues = [...formValues12];
        newFormValues.splice(i, 1);
        setFormValues12(newFormValues)
    }

    useEffect(() => {
        MyRolPermisGetAllApi()
        // if (staffId) {
        //     MyContractGetAllApi()
        //}

        setAllowance()
        if (roleId) {
            MyStaffrGetAllApi()
        }
    }, [roleId, staffId, formValues])

    // Role permission Get All Api  from role permission page  
    const MyRolPermisGetAllApi = async () => {
        try {
            const response = await RolePermissionGetApi();
            console.log('My role permission get all New User page', response)
            if (response?.status === 200) {
                // toast.success(response?.data?.msg)
                setRolePermisAllData(response?.data?.roles)
            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Staff  Get All Api
    const MyStaffrGetAllApi = async () => {
        setLoader(true);
        try {
            const response = await TeacherGetAllApi(roleId, searchKey);
            console.log("My Stafffffff get all DATA", response);
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setTeacherAllData(response?.data?.AllRoles);
                setLoader(false);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Staff Get All api 

    // const MyPayrollGetAllApi = async () => {
    //     setLoader(true)
    //     try {
    //         const response = await PayrollGetAllApi(month, year);

    //         console.log('Payroll get all api', response);
    //         if (response?.status === 200) {
    //             toast.success(response?.data?.classes?.message)
    //             setBasicPay(response?.data?.payroll)
    //             setLoader(false)
    //         } else {
    //             toast.error(response?.data?.classes?.message);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    //   contract getAll 
    const MyContractGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await ContractGetAllApi(staffId);

            console.log('Contracttttttt get all api', response);
            if (response?.status === 200) {
                toast.success(response?.data?.classes?.message)
                setBasicPay(response?.data?.contact?.basicSalary)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const PayrolPostApi = async () => {

        const formData = {
            "roleId": roleId,
            "userId": staffId,
            "month": month,
            "year": year,
            "netSalary": 0,
            "basicPay": basicPay,
            "deductions": {
                "additionalProp1": 0,
                "additionalProp2": 0,
                "additionalProp3": 0
            },
            "allowance": formValues,
            "commission": {
                "additionalProp1": 0,
                "additionalProp2": 0,
                "additionalProp3": 0
            },
            "reimbursement": {
                "additionalProp1": 0,
                "additionalProp2": 0,
                "additionalProp3": 0
            },
            "paid": paid
        }

        setLoader(true)
        try {
            const response = await PayrollPostApi(formData);
            console.log('MY PAYROL POST APIIIIII 123456', response)
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);
                setStatus(response?.data?.status)
                // setFunction(response?.data?.otherstaff?.staffStatus)

                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <div className="container-fluid main-body p-3">

                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb ms-2">
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Payroll</Link></li>
                            </ol>
                        </nav>
                    </div>
                    <div className='d-flex g-1 for-media-query'>
                        <button type="button " className="btn export1 btn-outline-secondary my-own-outline-btn me-2 ">
                            <span>
                                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                                </svg>
                            </span> &nbsp;
                            <span>Export to CSV</span>
                        </button>
                        <button type="button" className="btn export2 btn-outline-secondary my-own-outline-btn me-2 ">
                            <span>
                                <svg width="14" height="18" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.37317 11.25C4.02799 11.25 3.74817 11.5299 3.74817 11.875V14.375C3.74817 14.7201 4.02799 15 4.37317 15C4.71834 15 4.99817 14.7201 4.99817 14.375V14.167H5.41467C6.22018 14.167 6.87317 13.514 6.87317 12.7085C6.87317 11.903 6.22018 11.25 5.41467 11.25H4.37317ZM5.41467 12.917H4.99817V12.5H5.41467C5.52982 12.5 5.62317 12.5934 5.62317 12.7085C5.62317 12.8236 5.52982 12.917 5.41467 12.917Z" fill="#008479" />
                                    <path d="M11.249 11.8743C11.2495 11.5294 11.5292 11.25 11.874 11.25H13.1219C13.4672 11.25 13.7469 11.5299 13.7469 11.875C13.7469 12.2201 13.4672 12.5 13.1219 12.5H12.4983L12.4978 12.9181H13.1219C13.4672 12.9181 13.7469 13.1979 13.7469 13.5431C13.7469 13.8883 13.4672 14.1681 13.1219 14.1681H12.4985L12.499 14.3734C12.4999 14.7186 12.2208 14.9991 11.8757 15C11.5304 15.0009 11.2499 14.7217 11.249 14.3766L11.2469 13.5424L11.249 11.8743Z" fill="#008479" />
                                    <path d="M8.12134 11.25C7.77615 11.25 7.49634 11.5299 7.49634 11.875V14.375C7.49634 14.7201 7.77615 15 8.12134 15H8.74814C9.78366 15 10.6232 14.1605 10.6232 13.125C10.6232 12.0895 9.78366 11.25 8.74814 11.25H8.12134ZM8.74634 13.75V12.5H8.74814C9.09329 12.5 9.37316 12.7799 9.37316 13.125C9.37316 13.4701 9.09329 13.75 8.74814 13.75H8.74634Z" fill="#008479" />
                                    <path d="M8.74817 5.625V0H3.12317C2.08764 0 1.24817 0.839463 1.24817 1.875V8.85215C0.520887 9.11006 0 9.80411 0 10.6198V15.6237C0 16.4395 0.520887 17.1335 1.24817 17.3915V18.125C1.24817 19.1605 2.08764 20 3.12317 20H14.3732C15.4087 20 16.2482 19.1605 16.2482 18.125V17.3916C16.9757 17.1337 17.4967 16.4396 17.4967 15.6237V10.6198C17.4967 9.80399 16.9757 9.10986 16.2482 8.85204V7.5H10.6232C9.58768 7.5 8.74817 6.66054 8.74817 5.625ZM1.875 9.99481H15.6217C15.9668 9.99481 16.2467 10.2746 16.2467 10.6198V15.6237C16.2467 15.969 15.9668 16.2487 15.6217 16.2487H1.87501C1.52982 16.2487 1.25 15.969 1.25 15.6237V10.6198C1.25 10.2746 1.52982 9.99481 1.875 9.99481Z" fill="#008479" />
                                    <path d="M9.99817 5.625V0.3125L15.9357 6.25H10.6232C10.278 6.25 9.99817 5.97017 9.99817 5.625Z" fill="#008479" />
                                </svg>
                            </span> &nbsp;
                            <span>Export to PDF</span>
                        </button>
                        <div className='me-2 search-responsive'>
                            <div className="input-group mb-3 ">
                                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2">Search</span>
                            </div>
                        </div>
                        {/* <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Take Attendance</Link> */}
                    </div>
                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Payroll Details</h5>

                <div className="main-content-conatainer pt-1 ">
                    {/* ###### copy content till here for all component ######  */}
                    <div className="row p-3">
                        <div className="col-lg-3 col-md-6 col-sm-12  ">
                            <div className="mb-3   for-media-margin">
                                <label for="exampleFormControlInput1 " className="form-label mb-1 heading-14 label-color gender-adjust-media">Role Name*</label>
                                <select className="form-select form-control-sm  form-focus-input heading-14 grey-input-text-color input-border-color" onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example" style={{ borderRadius: '5px' }} >
                                    <option value="" >--Choose--</option>
                                    {
                                        rolePermisAllData?.map(item => (
                                            <option value={item.roleId} >{item.roleName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Employee</label>
                                <select class="form-select  form-select-sm" onChange={(e) => setStaffId(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choosee--</option>
                                    {
                                        TeacherAllData?.map(item => (
                                            <option value={item.id} >{item.staffName}</option>
                                        ))
                                    }
                                </select>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Month</label>
                                <select class="form-select  form-select-sm" onChange={(e) => setMonth(e.target.value)} aria-label="Default select example">
                                    <option >--Choose--</option>
                                    <option value='jabuary'>January</option>
                                    <option value='february'>February</option>
                                    <option value='march'>March</option>
                                    <option value='april'>April</option>
                                    <option value='may'>May</option>
                                    <option value='june'>June</option>
                                    <option value='july'>July</option>
                                    <option value='august'>August</option>
                                    <option value='september'>September</option>
                                    <option value='october'>October</option>
                                    <option value='november'>November</option>
                                    <option value='december'>December</option>

                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                                <select class="form-select  form-select-sm" onChange={(e) => setYear(e.target.value)} aria-label="Default select example">
                                    <option >--Choose--</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                    <option value='2027'>2027</option>
                                    <option value='2028'>2028</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={''}>Clicked Me</button> */}

                    {/* ####### buttons ######  */}
                    <div className="row buttons-topss">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success" onClick={MyContractGetAllApi}>Search</button>
                            <button type="button" class="btn btn-outline-success">Cancel</button>
                        </div>
                    </div>

                    <div className="main-container101 p-3 mt-5 mx-3 mb-3">
                        <div className="row">
                            <div className="col-6"><p className='greenText'>Allowances</p></div>
                            <div className="col-6"><p className='greenText'>Deductions</p></div>
                        </div>

                        <div className="row pt-2 pb-3 ">
                            <div className="col-6">
                                {formValues.map((identificationField, i) => {
                                    return (
                                        <>
                                            <div className="">
                                                <div className="row d-flex heading-16">
                                                    <div className="col-5">
                                                        <label>Title</label>
                                                        <input
                                                            type="text"
                                                            maxLength="40"
                                                            name="title"
                                                            value={identificationField.title}
                                                            onChange={(e) => handleEmployChange(i, e)}
                                                            className="form-control form-contro-sm"
                                                            placeholder="Enter title"
                                                        />
                                                    </div>
                                                    <div className="col-5 ">
                                                        <label>Amount</label>
                                                        <input
                                                            type="text"
                                                            maxLength="40"
                                                            name="amount"
                                                            value={identificationField.amount}
                                                            onChange={(e) => handleEmployChange(i, e)}
                                                            className="form-control form-contro-sm"
                                                            placeholder="Enter Amount"
                                                        />
                                                    </div>

                                                    <div className="col-2 px-0">
                                                        {formValues.length > 1 && (
                                                            <div className="text-right mb-3">
                                                                <spann
                                                                    className="btnn closeBtn mr-4 "
                                                                    onClick={(e) => removeEmployeRow(i)}
                                                                >
                                                                    {/* <FaTimes /> */}
                                                                </spann>
                                                            </div>
                                                        )}
                                                        <div className="col-2 plus-design mt-3 ps-0 ">
                                                            <div style={{ marginTop: '-5px' }}>
                                                                {
                                                                    i === 0 ?
                                                                        <div className='my-anchor'>
                                                                            <Link href=""><p className=''
                                                                                onClick={handleAddEmployerFields}>+</p></Link>
                                                                        </div>
                                                                        : <div className='my-anchor'>
                                                                            <Link type="button" className="button remove my-remove-button" onClick={() => removeFormFields()}> - </Link>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </>
                                    );
                                })}

                            </div>


                            <div className="col-6">
                                {
                                    formValues12?.map((element, index) => (
                                        <div className="row d-flex" value={element.name || ""} onChange={e => handleChange12(index, e)} >

                                            <div className="col-5 ">
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label heading-14">Type</label>
                                                    <input type="text" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Type Name" />
                                                </div>
                                            </div>

                                            <div className="col-5 ">
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label heading-14">Amount</label>
                                                    <input type="text" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Type Amount" />
                                                </div>
                                            </div>
                                            <div className="col-2 plus-design mt-3 ps-0 ">
                                                <div>
                                                    {
                                                        index === 0 ?
                                                            <div className='my-anchor'>
                                                                <Link href=""><p className='' onClick={() => addFormFields12()}>+</p></Link>
                                                            </div>
                                                            : <div className='my-anchor'>
                                                                <Link type="button" className="button remove my-remove-button  " onClick={() => removeFormFields12()}> - </Link>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>


                    <div>
                        <p className='greenText ps-4'>Summary</p>
                    </div>
                    <div className="row p-4 pt-2 pb-0 heading-16">
                        <div className="col-6">
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label heading-14">Basic</label>
                                <input type="email" class="form-control form-contro-sm heading-14 darkGreyBgColor" value={basicPay} id="exampleFormControlInput1" placeholder="" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="row  p-4 pt-2 pb-0 heading-16">

                        <div className="col-6">
                            {/* <div class="">
                                <label for="exampleFormControlInput1" class="form-label heading-14" >Tota Allowance</label>
                                <input type="email" class="form-control form-contro-sm heading-14 darkGreyBgColor" id="exampleFormControlInput1" placeholder="0" disabled />
                            </div> */}
                            {

                                formValues.map((item, i) => (
                                    <>
                                        {/* {console.log(item, "hello 2")} */}
                                        <div class="">
                                            <label for="exampleFormControlInput1" class="form-label heading-14" >{item !== '' ? "Title" : item.title}</label>
                                            <input type="email" class="form-control form-contro-sm heading-14 darkGreyBgColor" id="exampleFormControlInput1" placeholder="0" disabled />
                                        </div>
                                    </>
                                ))
                            }

                        </div>
                        <div className="col-6">


                        </div>

                    </div>
                    <div className="row p-4 pt-2 pb-0  heading-16">
                        <div className="col-6">
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label heading-14">Total Deduction</label>
                                <input type="email" class="form-control form-contro-sm heading-14 darkGreyBgColor" id="exampleFormControlInput1" placeholder="0" />
                            </div>
                        </div>
                    </div>
                    <div className="row p-4 pt-2 pb-1 heading-16">
                        <div className="col-6">
                            <div class="">
                                <label for="exampleFormControlInput1" class="form-label heading-14">Net Salary</label>
                                <input type="email" class="form-control form-contro-sm heading-14 darkGreyBgColor" id="exampleFormControlInput1" placeholder="150000" />
                            </div>
                        </div>
                    </div>
                    <div className="row p-4 pt-0  pb-0">
                        <div className="col-lg-6 col-md-6 col-sm-12  ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Status</label>
                                <select class="form-select  form-select-sm" onChange={(e) => setPaid(e.target.value)} aria-label="Default select example">
                                    <option >--Choose--</option>
                                    <option value="true">Paid</option>
                                    <option value="false">Unpaid</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row ps-4 pb-4">
                        <div className='my-button22 heading-16'>
                            <button type="button" class="btn btn-outline-success" onClick={PayrolPostApi}>Create Payslip</button>
                            <button type="button" class="btn btn-outline-success">Cancel</button>
                        </div>
                    </div>
                </div>

                {/* ################## Off Canvas Area ####################  */}

                {/* ##### offcanvas edit start ########  */}
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    {/* ########## content area #################  */}
                    {
                        show && (
                            <div className="container-fluid">
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Take Attendance</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="inputs">

                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                                        <input type="date" className="form-control form-focus input-bg label-color" style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                                    <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                                        <option selected>Select Class </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                                    <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                                        <option selected> Select Section </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className='my-button11 '>
                                    <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { UpdateHandleBtn() }}>Show Student List</button>
                                    <button type="button" className="btn btn-outline-success ">Cancel</button>
                                </div>
                            </div>
                        )
                    }
                    {/* ################# After click ###############  */}
                    {
                        hide && (
                            <div className="container-fluid">
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Take Attendance</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="inputs">

                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                                        <input type="date" className="form-control form-focus input-bg label-color" style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                                    <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                                        <option selected>Select Class </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                                    <select class="form-select form-focus input-bg label-color" aria-label="Default select example">
                                        <option selected> Select Section </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                                <div className='my-non-clickable mt-4'>
                                    <button type="button" class="btn btn-outline-secondary heading-16 ">Present All</button>
                                    <button type="button" class="btn btn-outline-secondary ms-2">Absent All</button>
                                </div>
                                <div className='heading-14 d-flex  ps-1 pt-2 orangeText'>
                                    <p>P - Present</p>
                                    <p className='ps-4'>A - Absent</p>
                                </div>
                                {/* ####### table ########### */}

                                <div className="table-container pt-3 table-responsive overflow-y">
                                    <table className="table  ">
                                        <thead className=''>
                                            <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                                <th className='table-row-bg-color greyTextColor'>#</th>
                                                <th className='table-row-bg-color greyTextColor'> Student Name</th>
                                                <th className='table-row-bg-color greyTextColor'>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody className='heading-14 align-middle greyTextColor ' >
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className='heading-14 ' >
                                                <td className=' greyText '>1.</td>
                                                <td className=' greyText '>Saqib khan</td>
                                                <td className=' heading-18 d-flex pe-0'>
                                                    <div className='d-flex'>
                                                        <p>P</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                    <div className='d-flex ps-4'>
                                                        <p>A</p>
                                                        <span className='pt-1 ps-2'>
                                                            <input class="form-check-input my-form-check-input123" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='my-button11 '>
                                    <button type="button" className="btn btn-outline-success heading-16" >Update</button>
                                    <button type="button" className="btn btn-outline-success ">Cancel</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* ##### offcanvase edit  end ########  */}




            </div>
        </Container>
    )
}

export default PayRoll_Create


{/* <div className="col-3 ">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label heading-14">Type</label>
  <input type="email" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Type Name" />
</div>
</div>
<div className="col-3 ">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label heading-14">Amount</label>
  <input type="email" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Type Amount" />
</div>
</div>
<div className="col-3 ">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label heading-14">Type</label>
  <input type="email" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Type Name" />
</div>
</div>
<div className="col-3 ">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label heading-14">Amount</label>
  <input type="email" class="form-control form-contro-sm heading-14" id="exampleFormControlInput1" placeholder="Enter Amount" />
</div>
</div> */}