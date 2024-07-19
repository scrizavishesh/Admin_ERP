import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'react-hot-toast';
import { deleteRouteApi } from '../../Utils/Apis';

const DeleteRoutePage = ({ delRouteIDD, getAllRouteData }) => {
    const [deleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const continueButton = () => {
        setDeleteWarning(!deleteWarning);
        getAllRouteData();
    };

    const deleteRouteDataById = async (id) => {
        if (isChecked) {
            try {
                const response = await deleteRouteApi(id);
                if (response?.status === 200 && response.data.status === 'success') {
                    setDeleteWarning(!deleteWarning);
                    toast.success(response.data.msg);
                } else {
                    toast.error(response?.error || 'Something went wrong');
                }
            } catch (error) {
                console.error('Error during deletion:', error);
                toast.error('An error occurred while deleting the route');
            }
        } else {
            toast.error('You must agree to delete the profile data');
        }
    };

    return (
        <div>
            {deleteWarning ? (
                <>
                    <div className=''>
                        <p className='modalLightBorder p-2'>Route</p>
                        <p className='text-center p-3'>
                            <img src="./images/errorI.svg" className='img-fluid' alt="" />
                        </p>
                        <p className='text-center warningHeading'>Are you Sure?</p>
                        <p className='text-center greyText warningText pt-2'>
                            This action will permanently delete <br /> the Profile Data.
                        </p>
                        <p className='text-center warningText p-2'>
                            <input className="form-check-input formdltcheck me-2" type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} /> I Agree to delete the Profile Dat </p>
                        <p className='text-center p-3'>
                            <button className='btn deleteButtons text-white' onClick={() => deleteRouteDataById(delRouteIDD)} > Delete </button>
                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" > Cancel </button>
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <p className='border-bottom p-3'>Route</p>
                        <div className="">
                            <div className='deleteSVG border border-2 p-4 rounded-circle'>
                                <img src="./images/deleteicon.svg" alt="" />
                            </div>
                            <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                <p className='warningHeading'>Successfully Deleted</p>
                                <p className='greyText warningText pt-2'>
                                    Your data has been successfully deleted.
                                </p>
                            </div>
                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={continueButton} > Continue </button>
                        </div>
                    </div>
                </>
            )}
            <Toaster/>
        </div>
    );
};

DeleteRoutePage.propTypes = {
    delRouteIDD: PropTypes.string.isRequired,
    getAllRouteData: PropTypes.func.isRequired,
};

export default DeleteRoutePage;
