import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components'
import { addNewDropPointApi, getAllRouteApi } from '../../Utils/Apis';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`

  height: 92vh;

  .mainBreadCrum{
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText{
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
      width: fit-content;
      border: 2px solid var(--BtnBorder);
      background-color: var(--breadCrumActiveTextColor)
  }

  .EyeViewBtnn, .EyeViewBtnn:active{
      width: fit-content;
      border: 2px solid var(--BtnBorder);
      background-color: var(--OrangeBtnColor)
  }

    
`;

const AddDropPoint = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // Variable states
  const [allRouteData, setAllRouteData] = useState([]);
  const [route, setRoute] = useState('')
  const [dropPointName, setDropPointName] = useState('')
  // Error states
  const [routeError, setRouteError] = useState('')
  const [dropPointNameError, setDropPointNameError] = useState('')

  useEffect(() => {
    getAllRouteData();
  }, [token])

  const getAllRouteData = async () => {
    try {
      const searchKey = '';
      const pageNo = '';
      const pageSize = '';
      var response = await getAllRouteApi(searchKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllRouteData(response?.data?.routes);
          toast.success(response?.data?.message)
        }
      }
      else {
        toast.error(response?.data?.message)
      }
    }
    catch (error) {
      toast.error('Error during fetching routes', error)
    }
  }

  const AddNewDropPoint = async () => {
    if (validateFields()) {
      try {
        const formData = new FormData();
        formData.append("routeId", route);
        formData.append("dropName", dropPointName);

        var response = await addNewDropPointApi(formData);

        if (response?.status === 200) {
          if (response?.data?.status === 'success') {
            toast.success(response?.data?.message)
            setTimeout(() => {
              navigate('/dropPoint');
            }, 1000);
          }
        }
        else {
          console.log(response?.data?.message);
        }
      }
      catch (error) {
        console.log(error, 'error')
      }
    }
    else {
      toast.error('Please Validate All Fields Correctly')
    }
  }

  const handleRouteName = (value) => {
    setRoute(value);
    setRouteError(validateRoute(value))
  }

  const validateRoute = (value) => {
    if (!value || value == '') {
      return '* Route is required';
    }
    return '';
  };

  const handleDropPointName = (value) => {
    setDropPointName(value);
    setDropPointNameError(validateDropPointName(value))
  }

  const validateDropPointName = (value) => {
    if (value.trim() === '') {
      return '* Name is required';
    }
    const nameRegex = /^[A-Za-z0-9\s]+$/;
    if (!nameRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const validateFields = () => {
    let isValid = true;

    const dropPointErrorNew = validateDropPointName(dropPointName)
    if (dropPointErrorNew) {
      setDropPointNameError(dropPointErrorNew);
      isValid = false;
    } else {
      setDropPointNameError('');
    }

    const routeErrorNew = validateRoute(route)
    if (routeErrorNew) {
      setRouteError(routeErrorNew);
      isValid = false;
    } else {
      setRouteError('');
    }

    return isValid;
  };

  const CancelButton = () => {
    navigate('/driver')
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
                    <li className="breadcrumb-item"><a href="/dropPoint" className='bredcrumText text-decoration-none'>Drop Point</a></li>
                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Drop Point</li>
                  </ol>
                </nav>
                <p className='font14 ps-0 fontWeight500'>Add Drop Point</p>
              </div>
            </div>
          </div>
          <div className="row ps-2 pe-2 pt-3">
            <div className="bg-white cardradius p-3">
              <form className="row g-3">
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="validationDefault02" className="form-label font14">Route</label>
                  <select type="select" className={`form-select font14 ${routeError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" onChange={(e) => handleRouteName(e.target.value)}>
                    <option selected disabled value=''>-- Select Route --</option>
                    {allRouteData?.map(option => (
                      <option key={option.routeId} value={option.routeId}>
                        {option.routeName}
                      </option>
                    ))}
                  </select>
                  <span className='text-danger'>{routeError}</span>
                </div>
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="validationDefault02" className="form-label font14">Drop Point</label>
                  <input type="text" className={`form-control font14 ${dropPointNameError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" placeholder='Enter Drop Point' onChange={(e) => handleDropPointName(e.target.value)} />
                  <span className='text-danger'>{dropPointNameError}</span>
                </div>
              </form>
              <div className="row p-3">
                <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn addCategoryButtons font16 text-white' type='button' onClick={() => AddNewDropPoint()}>Add Drop Point</button>
                <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' type='button' onClick={CancelButton}>Cancel</button>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  )
}

export default AddDropPoint