import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getItemByIdApi, updateItemByIdApi, getAllItemCategoryApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
// import { useFormik } from 'formik';

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
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

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

const EditItem = ({ EditId, ReloadData }) => {

    // const initialValues = {
    //     itemName : '',
    //     itemCategory : '',
    //     unit : '',
    //     quantity : '',
    //     description : ''
    // }

    // const FormikData = useFormik({
    //     initialValues:initialValues,
    //     onSubmit:(values)=>{
    //         console.log(values)
    //     }
    // })

    // console.log(FormikData, 'FormikData')

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [EditWarning, setEditWarning] = useState(true)
    const [ItemCategoryData, setItemCategoryData] = useState([]);
    const [ItemCategory, setItemCategory] = useState('');
    const [ItemCategoryId, setItemCategoryId] = useState(0);
    const [ItemQuantity, setItemQuantity] = useState(0);
    const [ItemUnit, setItemUnit] = useState(0);
    const [ItemName, setItemName] = useState('');
    const [ItemDescription, setItemDescription] = useState('');

    useEffect(() => {
        setEditWarning(true);
        getItemDataById();
        getAllItemCategoryData();
    }, [EditId, token])

    const getAllItemCategoryData = async () => {
        try {
            setloaderState(true);
            var response = await getAllItemCategoryApi();
            console.log(response)
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

    const getItemDataById = async () => {
        try {
            setloaderState(true);
            var response = await getItemByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setItemName(response?.data?.item?.itemName)
                    setItemCategoryId(response?.data?.item?.itemCategoryId)
                    setItemCategory(response?.data?.item?.itemCategory)
                    setItemUnit(response?.data?.item?.totalUnits)
                    setItemQuantity(response?.data?.item?.itemQuantity)
                    setItemDescription(response?.data?.item?.itemDescription)
                    toast.success(response?.data?.message);
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
            console.log('Error Facing during Get Item By Id API - ', error)
        }
    }

    const handleItemCategoryData = (value) => {
        const [val1, val2] = value.split(',');
        setItemCategoryId(val1);
        setItemCategory(val2);
    }

    const updateItemDataById = async () => {
        try {
            setloaderState(true);
            const data = {
                "itemName": ItemName,
                "itemCategoryId": ItemCategoryId,
                "itemCategory": ItemCategory,
                "itemQuantity": ItemQuantity,
                "totalUnits": ItemUnit,
                "itemDescription": ItemDescription
            }
            var response = await updateItemByIdApi(EditId, data);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setEditWarning(false)
                    toast.success(response?.data?.message);
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
            console.log('Error Facing during Get Item By Id API - ', error)
        }
    }

    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid">
                    <div className="row">
                        {EditWarning
                            ?
                            <>
                                <form className='' onSubmit={updateItemDataById}>
                                    <div className="mb-3">
                                        <label htmlFor="itemName" className="form-label font14">Item <span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control font14" name='itemName' id="itemName" value={ItemName} onChange={(e) => setItemName(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="itemCategory" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                                        <select className={`form-select font14  `} aria-label="Default select example" name='itemCategory' value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
                                            <option  disabled >--- Select ---</option>
                                            {ItemCategoryData.map((option) => (
                                                <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="unit" className="form-label font14">Unit <span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control font14" id="unit" name='unit' value={ItemUnit} onChange={(e) => setItemUnit(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                                        <input type="text" className="form-control font14" id="quantity" name='quantity' value={ItemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label font14">Description </label>
                                        <input type="text" className="form-control font14" id="description" name='description' value={ItemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn updateButtons text-white' type='submit'>Save</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </form>
                            </>
                            :
                            <>
                                <div>
                                    <p className="modalLightBorder p-2 mb-0">Edit Item</p>
                                    <div className="mt-3">
                                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                            <p className='warningHeading'>Successful Updated</p>
                                            <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                        </div>
                                        <button className="btn contbtn continueButtons text-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ReloadData}>Continue</button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default EditItem