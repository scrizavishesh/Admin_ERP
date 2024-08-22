import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewItemStockApi, getAllItemApi, getAllItemCategoryApi, getAllItemStoreApi, getAllItemSupplierApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import ItemStockList from './ItemStockList';

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


const AddItemStock = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [Reload, setReload] = useState(false);
  const [ItemData, setItemData] = useState([]);
  const [ItemStoreData, setItemStoreData] = useState([]);
  const [ItemSupplierData, setItemSupplierData] = useState([]);
  const [ItemCategoryData, setItemCategoryData] = useState([]);
  const [ItemId, setItemId] = useState(0);
  const [ItemCategory, setItemCategory] = useState('');
  const [ItemCategoryId, setItemCategoryId] = useState(0);
  const [Supplier, setSupplier] = useState('');
  const [SupplierId, setSupplierId] = useState(0);
  const [Store, setStore] = useState('');
  const [StoreId, setStoreId] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  const [PurchasePrice, setPurchasePrice] = useState('');
  const [ItemDate, setItemDate] = useState('');
  const [ItemDocument, setItemDocument] = useState('');
  const [ItemDescription, setItemDescription] = useState('');

  useEffect(() => {
    getAllItemData();
    getAllItemStoreData();
    getAllItemCategoryData();
    getAllItemSupplierData();
  }, [token, Reload])

  const getAllItemData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemData(response?.data?.items);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'item');
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
          toast.error(response?.data?.message, 'category');
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

  const getAllItemSupplierData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemSupplierApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemSupplierData(response?.data?.itemSuppliers);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'supplier');
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

  const getAllItemStoreData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemStoreApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemStoreData(response?.data?.itemStores);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'store');
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

  const addNewItemStock = async () => {
    try {
      setloaderState(true)
      const formData = new FormData();
      formData.append('itemId', ItemId)
      formData.append('itemCategory', ItemCategory)
      formData.append('itemCategoryId', ItemCategoryId)
      formData.append('supplierName', Supplier)
      formData.append('supplierId', SupplierId)
      formData.append('storeName', Store)
      formData.append('storeId', StoreId)
      formData.append('itemQuantity', Quantity)
      formData.append('purchasePrice', PurchasePrice)
      formData.append('dateCreated', ItemDate)
      formData.append('document', ItemDocument)
      formData.append('itemDescription', ItemDescription)
      var response = await addNewItemStockApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          setReload();
          setItemId(0);
          setItemCategory('');
          setItemCategoryId(0);
          setSupplier('');
          setSupplierId(0);
          setStore('');
          setStoreId(0);
          setQuantity('');
          setPurchasePrice('');
          setItemDate('');
          setItemDescription('')
          setItemDocument('')
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'add');
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

  const handleItemSupplierData = (value) => {
    const [val1, val2] = value.split(',');
    setSupplierId(val1);
    setSupplier(val2);
    console.log(val1);
    console.log(val2);
  }

  const handleItemStoreData = (value) => {
    const [val1, val2] = value.split(',');
    setStoreId(val1);
    setStore(val2);
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
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Item Stock</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Add Item Stock</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' action="">
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
                  <option value='' >--- Select ---</option>
                  {ItemCategoryData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={ItemId} onChange={(e) => setItemId(e.target.value)}>
                  <option value='' >--- Select ---</option>
                  {ItemData.map((option) => (
                    <option key={option.id} value={option?.id}>{option.itemName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Supplier <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${SupplierId},${Supplier}`} onChange={(e) => handleItemSupplierData(e.target.value)}>
                  <option value='' >--- Select ---</option>
                  {ItemSupplierData.map((option) => (
                    <option key={option.supplierId} value={`${option?.supplierId}, ${option?.supplierName}`}>{option.supplierName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Store <span className='text-danger'>*</span></label>
                <select className={`form-select font14  `} aria-label="Default select example" value={`${StoreId},${Store}`} onChange={(e) => handleItemStoreData(e.target.value)}>
                  <option value='' >--- Select ---</option>
                  {ItemStoreData.map((option) => (
                    <option key={option.id} value={`${option?.id}, ${option?.storeName}`}>{option.storeName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity</label>
                <input type="number" className="form-control font14" id="exampleFormControlInput1" value={Quantity} placeholder="0" onChange={(e)=> setQuantity(e.target.value)}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Purchase Price ($) <span className='text-danger'>*</span></label>
                <input type="number" className="form-control font14" id="exampleFormControlInput1" value={PurchasePrice} placeholder="0" onChange={(e)=> setPurchasePrice(e.target.value)}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Date <span className='text-danger'>*</span></label>
                <input type="date" className="form-control font14" id="exampleFormControlInput1" value={ItemDate} placeholder="Enter Name" onChange={(e)=> setItemDate(e.target.value)}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Attach Document  <span className='text-danger'>*</span></label>
                <input type="file" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Name" onChange={(e)=> setItemDocument(e.target.files[0])}/>
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Description <span className='text-danger'>*</span></label>
                <input type="text" className="form-control font14" id="exampleFormControlInput1" value={ItemDescription} placeholder="Text..." onChange={(e)=> setItemDescription(e.target.value)}/>
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' type='button' onClick={addNewItemStock}>Add Item Stock</button>
                <Link className='btn cancelButtons font14' to='/issueItem'>Cancel</Link>
              </p>
            </form>
            <ItemStockList Reload={Reload} />
          </div>
        </div>
      </div>
    </Container>


  )
}

export default AddItemStock