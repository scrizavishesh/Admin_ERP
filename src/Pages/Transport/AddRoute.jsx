import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { addNewRouteApi } from '../../Utils/Apis';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  routeName: Yup.string().matches(/^[A-Za-z0-9 .\-_/]+$/, "* Name can only contain letters, digits & spaces").min(3).required('* Route Name is required'),
});


const Container = styled.div`
  height: 92vh;

  .mainBreadCrum {
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control {
    color: var(--greyState);
  }

  .form-control {
    border-radius: 5px !important;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
    width: fit-content;
    border: 2px solid var(--BtnBorder);
    background-color: var(--breadCrumActiveTextColor);
  }

  .EyeViewBtnn, .EyeViewBtnn:active {
    width: fit-content;
    border: 2px solid var(--BtnBorder);
    background-color: var(--OrangeBtnColor);
  }

`;

const AddRoute = () => {

  const navigate = useNavigate();
  const [routeName, setRouteName] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = { routeName };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      AddNewRoute()
    } catch (validationErrors) {
      const errorMessages = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errorMessages);
    }
  };

  const validateRouteName = async (value) => {
    try {
      await validationSchema.validate({ routeName: value }, { abortEarly: false });
      setErrors(prevErrors => ({ ...prevErrors, routeName: '' }));
    } catch (validationErrors) {
      const errorMessages = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errorMessages);
    }
  };

  const handleRouteName = (value) => {
    setRouteName(value);
    validateRouteName(value);
  };

  const handleCancleButton = () => {
    navigate('/route');
  }

  const AddNewRoute = async () => {
    try {
      const formData = new FormData();
      formData.append("routeName", routeName);
      
      var response = await addNewRouteApi(formData);

      console.log(response);

      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate('/route');
          }, 1000);
        } else {
          console.log(response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  return (
    <>
      <Container>
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
              <div className="row ps-2">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                    <li className="breadcrumb-item"><a href="/route" className='bredcrumText text-decoration-none'>Route</a></li>
                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Route</li>
                  </ol>
                </nav>
                <p className='font14 ps-0 fontWeight500'>Add Route</p>
              </div>
            </div>
          </div>
          <div className="row ps-2 pe-2 pt-3">
            <div className="bg-white cardradius p-3">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="validationDefault02" className="form-label font14">Route</label>
                  <input type="text" className={`form-control font14 ${errors.routeName ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" value={routeName} onChange={(e)=> handleRouteName(e.target.value)} />
                  {errors.routeName && <div className="error text-danger font12">{errors.routeName}</div>}
                </div>
              <div className="row p-3">
                <button type="submit" className='col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white'>
                  Add Route
                </button>
                <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' onClick={handleCancleButton} >
                  Cancel
                </button>
              </div>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
}

export default AddRoute;
