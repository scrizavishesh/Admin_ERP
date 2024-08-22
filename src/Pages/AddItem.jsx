import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewIssueItemApi, deleteIssueItemByIdApi, getAllIssueItemApi, getAllItemCategoryApi, getIssueItemByIdApi, updateIssueItemByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import ItemList from './ItemList';

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


const AddItem = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [Reload, setReload] = useState(false);
  const [ItemCategoryData, setItemCategoryData] = useState([]);
  const [ItemName, setItemName] = useState('');
  const [ItemCategory, setItemCategory] = useState('');
  const [ItemCategoryId, setItemCategoryId] = useState(0);
  const [Unit, setUnit] = useState(0);
  const [Description, setDescription] = useState('');


  useEffect(() => {
    getAllItemCategoryData();
  }, [token])
  
  const getAllItemCategoryData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemCategoryApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemCategoryData(response?.data?.itemCategories);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const addNewIssueItem = async () => {
    try {
      setloaderState(true)
      const data = {
        "itemName": ItemName,
        "itemCategoryId": ItemCategoryId,
        "itemCategory": ItemCategory,
        "itemQuantity": Unit,
        "itemDescription": Description
      }
      var response = await addNewIssueItemApi(data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          setTimeout(()=> {
            setReload(true);
            setItemName('');
            setItemCategory('');
            setItemCategoryId(0);
            setUnit(0);
            setDescription('');
          }, 700)
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Add New Item API - ', error)
    }
  }

  const handleItemCategoryData = (value) => {
    const [val1, val2] = value.split(',');
    setItemCategoryId(val1);
    setItemCategory(val2);
    console.log(val1);
    console.log(val2);
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
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Item</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Add Item</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' action="">
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
                <input type="text" className="form-control font14" id="exampleFormControlInput1" value={ItemName} placeholder="Enter User Type" onChange={(e) => setItemName(e.target.value)} />
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
                  <option  value='' >--- Select ---</option>
                  {ItemCategoryData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Unit <span className='text-danger'>*</span></label>
                <input type="number" className="form-control font14" id="exampleFormControlInput1" value={Unit} placeholder="Enter Name" onChange={(e) => setUnit(e.target.value)} />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                <input type="text" className="form-control font14" id="exampleFormControlInput1" value={Description} placeholder="Text...." onChange={(e) => setDescription(e.target.value)} />
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' onClick={addNewIssueItem} type='button'>Add Item Stock</button>
                <Link className='btn cancelButtons font14' to='/issueItem'>Cancel</Link>
              </p>
            </form>
            <ItemList Reload={Reload} />
          </div>
        </div>
        <Toaster/>
      </div>
    </Container>


  )
}

export default AddItem