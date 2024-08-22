import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewIssueItemApi, getAllItemApi, getAllItemCategoryApi, getAllRolesApi, getDataByRoleIdApi, getStudentDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const Container = styled.div`

  .blueText{
    color: var(--blueTextColor);
  }

  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState)
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .form-control, .form-select{
    border-radius: 5px !important;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .contbtn{
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }

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

  .form-select{
    color: var(--greyState);
    box-shadow: none;
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

  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .correvtSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .deleteSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }

  .greyText{
    color: var(--greyTextColor) !important;
  }
    
`;

const AddIssueItem = () => {

  const navigate = useNavigate('')
  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [RolesData, setRolesData] = useState([]);
  const [StudentsData, setStudentsData] = useState([]);
  const [DataByRoleId, setDataByRoleId] = useState([]);
  const [ItemData, setItemData] = useState([]);
  const [ItemCategoryData, setItemCategoryData] = useState([]);
  const [UserTypeId, setUserTypeId] = useState(0);
  const [ItemId, setItemId] = useState(0);
  const [ItemName, setItemName] = useState('');
  const [Note, setNote] = useState('');
  const [ItemCategoryId, setItemCategoryId] = useState(0);
  const [ItemCategory, setItemCategory] = useState('');
  const [IssuedById, setIssuedById] = useState(0);
  const [IssuedByName, setIssuedByName] = useState('');
  const [IssuedToId, setIssuedToId] = useState(0);
  const [IssuedToName, setIssuedToName] = useState('');
  const [ItemQuantity, setItemQuantity] = useState(0);
  const [Status, setStatus] = useState('');
  const [IssueDate, setIssueDate] = useState('');
  const [ReturnDate, setReturnDate] = useState('');

  useEffect(() => {
    getAllRoles();
    getAllStudents();
    getAllItemData();
    getAllItemCategoryData();
  }, [token])

  const getAllItemData = async () => {
    try {
      setloaderState(true);
      const page='';
      const size='';
      var response = await getAllItemApi(page , size);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemData(response?.data?.items);
          toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'itemsss');
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message, 'itemsss');
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllRoles = async () => {
    try {
      setloaderState(true);
      var response = await getAllRolesApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setRolesData(response?.data?.roles);
          toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'rolessssss');
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message, 'rolessssss');
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllDataByRoleId = async (id) => {
    try {
      setloaderState(true);
      const search='';
      const page='';
      const size='';
      var response = await getDataByRoleIdApi(id, search,page,size);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setDataByRoleId(response?.data?.AllRoles);
          toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllStudents = async () => {
    try {
      setloaderState(true);
      const classNo = '';
      const classSec = '';
      const search = '';
      const page = '';
      const size = '';
      var response = await getStudentDataApi(classNo, classSec, search, page, size);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setStudentsData(response?.data?.students);
          toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllItemCategoryData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemCategoryApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemCategoryData(response?.data?.itemCategories);
          toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const addNewIssueItem = async () => {
    setloaderState(true);
    try {
      const data = {
        "itemId": ItemId,
        "itemName": ItemName,
        "itemCategoryId": ItemCategoryId,
        "itemCategory": ItemCategory,
        "issuedById": IssuedById,
        "issuedByName": IssuedByName,
        "issuedToId": IssuedToId,
        "issuedToName": IssuedToName,
        "note": Note,
        "itemQuantity": ItemQuantity,
        "status": Status,
        "issueDate": IssueDate,
        "returnDate": ReturnDate
      }
      var response = await addNewIssueItemApi(data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          setTimeout(()=> {
            navigate('/issueItem')
          }, 1500)
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }

    }
    catch(error) {
      console.log('Error while issuing item - ', error)
    }
  }

  const handleIssueToData = (value) => {
    const [val1, val2] = value.split(',');
    setIssuedToId(val1);
    setIssuedToName(val2);
  }

  const handleIssueByData = (value) => {
    const [val1, val2] = value.split(',');
    setIssuedById(val1);
    setIssuedByName(val2);
  }

  const handleItemData = (value) => {
    const [val1, val2] = value.split(',');
    setItemId(val1);
    setItemName(val2);
  }

  const handleItemCategoryData = (value) => {
    const [val1, val2] = value.split(',');
    setItemCategoryId(val1);
    setItemCategory(val2);
  }

  const handleUserType = (val) => {
    setUserTypeId(val);
    getAllDataByRoleId(val)
  }

  return (
    <Container>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
              <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Inventory</a></li>
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue Item</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Issue Item</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' action="">
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">User Type <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={UserTypeId} onChange={(e) => handleUserType(e.target.value)}>
                  <option selected value='' >--- Select ---</option>
                  {RolesData.map((option) => (
                    <option key={option.roleId} value={option?.roleId}>{option.roleName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue To <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${IssuedToId},${IssuedToName}`} onChange={(e) => handleIssueToData(e.target.value)}>
                  <option selected value='' >--- Select ---</option>
                  {StudentsData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.studentName}`}>{option.studentName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue By <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${IssuedById},${IssuedByName}`} onChange={(e) => handleIssueByData(e.target.value)}>
                  <option selected >--- Select ---</option>
                  {DataByRoleId.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.staffName}`}>{option.staffName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue Date</label>
                <input type="date" className="form-control font14" id="exampleFormControlInput1" value={IssueDate} placeholder="Enter Name" onChange={(e)=> setIssueDate(e.target.value)}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Return Date</label>
                <input type="date" className="form-control font14" id="exampleFormControlInput1" value={ReturnDate} placeholder="Enter Name" onChange={(e)=> setReturnDate(e.target.value)}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Note</label>
                <input type="email" className="form-control font14" id="exampleFormControlInput1" value={Note} placeholder="Text...." onChange={(e)=> setNote(e.target.value)}/>
              </div>











              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
                  <option selected value='' >--- Select ---</option>
                  {ItemCategoryData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
                  ))}
                </select>
              </div>

{/*  */}

              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemId},${ItemName}`} onChange={(e) => handleItemData(e.target.value)}>
                  <option selected value='' >--- Select ---</option>
                  {ItemData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.itemName}`}>{option.itemName}</option>
                  ))}
                </select>
              </div>











              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                <input type="number" className="form-control font14" id="exampleFormControlInput1" value={ItemQuantity} placeholder="0" onChange={(e)=> setItemQuantity(e.target.value)}/>
              </div>
            </form>
            <p className='text-center p-3'>
              <button className='btn addButtons font14 text-white me-2' onClick={addNewIssueItem}>Add Issue Item</button>
              <Link className='btn cancelButtons font14' to='/issueItem'>Cancel</Link>
            </p>
          </div>
        </div>
        <Toaster/>
      </div>
    </Container>


  )
}

export default AddIssueItem