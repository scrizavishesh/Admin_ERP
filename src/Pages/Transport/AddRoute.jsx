import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { addNewRouteApi } from '../../Utils/Apis';
import { useNavigate } from 'react-router-dom';

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
  const [routeNameError, setRouteNameError] = useState('');

  const validateRouteName = (name) => {
    if (name.trim() === '') {
      return 'Route Name is required';
    }

    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!nameRegex.test(name)) {
      return 'Invalid Route Name';
    }

    return '';
  }

  const handleRouteNameChange = (e) => {
    const value = e.target.value;
    setRouteName(value);
    setRouteNameError(validateRouteName(value));
  }

  const handleCancleButton = () => {
    navigate('/route');
  }

  const AddNewRoute = async () => {
    const error = validateRouteName(routeName);
    if (error) {
      setRouteNameError(error);
      return;
    }

    setRouteNameError('');

    try {
      const formData = new FormData();
      formData.append("routeName", routeName);
      
      var response = await addNewRouteApi(formData);

      console.log(response);

      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.msg);
          setTimeout(() => {
            navigate('/route');
          }, 1000);
        } else {
          console.log(response?.data?.msg);
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
              <form className="row g-3">
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="validationDefault02" className="form-label font14">Route</label>
                  <input type="text" className={`form-control font14 ${routeNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" value={routeName} onChange={handleRouteNameChange} />
                  <span className='text-danger'>{routeNameError}</span>
                </div>
              </form>
              <div className="row p-3">
                <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white' onClick={AddNewRoute} >
                  Add Route
                </button>
                <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' onClick={handleCancleButton} >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
}

export default AddRoute;



// const AddRoute = () => {

//   const navigate = useNavigate();
//   const [routeName, setRouteName] = useState('');
//   const [routeNameError, setRouteNameError] = useState('');
//   const [routeNumber, setRouteNumber] = useState('');
//   const [routeNumberError, setRouteNumberError] = useState('');

//   const validateRouteName = (name) => {
//     if (name.trim() === '') {
//       return 'Route Name is required';
//     }
//     const nameRegex = /^[a-zA-Z0-9\s-]+$/; // Adjust this regex based on your requirements
//     if (!nameRegex.test(name)) {
//       return 'Invalid Route Name';
//     }
//     return '';
//   };

//   const validateRouteNumber = (number) => {
//     if (number.trim() === '') {
//       return 'Route Number is required';
//     }
//     const numberRegex = /^[0-9]+$/; // Adjust this regex based on your requirements
//     if (!numberRegex.test(number)) {
//       return 'Invalid Route Number';
//     }
//     return '';
//   };

//   const handleRouteNameChange = (e) => {
//     const value = e.target.value;
//     setRouteName(value);
//     setRouteNameError(validateRouteName(value));
//   };

//   const handleRouteNumberChange = (e) => {
//     const value = e.target.value;
//     setRouteNumber(value);
//     setRouteNumberError(validateRouteNumber(value));
//   };

//   const handleCancleButton = () => {
//     navigate('/route');
//   };

  // const AddNewRoute = async () => {
  //   const routeNameError = validateRouteName(routeName);
  //   const routeNumberError = validateRouteNumber(routeNumber);

  //   if (routeNameError || routeNumberError) {
  //     setRouteNameError(routeNameError);
  //     setRouteNumberError(routeNumberError);
  //     return;
  //   }

  //   setRouteNameError('');
  //   setRouteNumberError('');

//     try {
//       const formData = new FormData();
//       formData.append('routeName', routeName);
//       formData.append('routeNumber', routeNumber);
      
//       var response = await addNewRouteApi(formData);

//       console.log(response);

//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           toast.success(response?.data?.msg);
//           setTimeout(() => {
//             navigate('/route');
//           }, 1000);
//         } else {
//           console.log(response?.data?.msg);
//         }
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   };

// import React, { useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
// // import { Link } from 'react-router-dom';
// import styled from 'styled-components'
// import { addNewRouteApi } from '../../Utils/Apis';
// import { useNavigate } from 'react-router-dom';

// const Container = styled.div`

//   height: 92vh;

//   .mainBreadCrum{
//     --bs-breadcrumb-divider: '>' !important;
//   }

//   .bredcrumText{
//     color: var(--breadCrumTextColor);
//   }

//   .bredcrumActiveText{
//     color: var(--breadCrumActiveTextColor);
//   }

//   .form-control::placeholder, .form-control{
//       color: var(--greyState)
//   }

//   .form-control{
//       border-radius: 5px !important;
//       box-shadow: none !important;
//       border: 1px solid var(--fontControlBorder);
//   }

//   .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
//       width: fit-content;
//       border: 2px solid var(--BtnBorder);
//       background-color: var(--breadCrumActiveTextColor)
//   }

//   .EyeViewBtnn, .EyeViewBtnn:active{
//       width: fit-content;
//       border: 2px solid var(--BtnBorder);
//       background-color: var(--OrangeBtnColor)
//   }

    
// `;


// const AddRoute = () => {

//   const navigate = useNavigate();
//   const [routeName , setRouteName] = useState('')
//   const [routeNameError , setRouteNameError] = useState('')

//   const handleNameChange = (value) => {
//     setRouteName(value);
//     setRouteNameError(validateName(value))
//   }

//   const nameRegex = /^[A-Za-z0-9\s]+$/;

//   const validateName = (value) => {
//       if (!value.trim()) {
//       return '*Name is required';
//       } else if (!nameRegex.test(value)) {
//       return 'Invalid characters !!';
//       }
//       return '';
//   };

//   const validateFields = () => {
//     let isValid = true;

//     if (!routeName) {
//       setRouteNameError('* Route Name is required');
//       isValid = false;
//     } else {
//       setRouteNameError('');
//     }
//     return isValid;
//   };

//   const handleCancleButton = () => {
//       navigate('/route')
//   }

//   const AddNewRoute = async() => {
//     if (validateFields()) {
//       try {
//           const formData = new FormData();
//           formData.append("routeName", routeName);
          
//           var response = await addNewRouteApi(formData);

//           console.log(response)

//           if (response?.status === 200) {
//           console.log(response)

//           if (response?.data?.status === 'success') {
//             toast.success(response?.data?.msg)
//             setTimeout(() => {
//               navigate('/route');
//             }, 1000);
//           }
//           }
//           else {
//           console.log(response?.data?.msg);
//           }
//       }
//       catch(error) {
//           console.log(error, 'error')
//       }
//     }
//   }
//   return (
//     <>
//       <Container>
//         <div className="container-fluid p-4">
//           <div className="row">
//             <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
//                 <div className="row ps-2">
//                   <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//                       <ol className="breadcrumb mb-1">
//                           <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
//                           <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
//                           <li className="breadcrumb-item"><a href="/route" className='bredcrumText text-decoration-none'>Route</a></li>
//                           <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Route</li>
//                       </ol>
//                   </nav>
//                   <p className='font14 ps-0 fontWeight500'>Add Route</p>
//                 </div>
//             </div>
//           </div>
//           <div className="row ps-2 pe-2 pt-3">
//             <div className="bg-white cardradius p-3">
//               <form className="row g-3">
//                 <div className="col-md-6 col-sm-12 col-12">
//                   <label htmlFor="validationDefault02" className="form-label font14">Route</label>
//                   <input type="text" className={`form-control font14 ${routeNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" onChange={(e) => handleNameChange(e.target.value)}/>
//                   <span className='text-danger'>{routeNameError}</span>
//                 </div>
//               </form>
//               <div className="row p-3">
//                   <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white' onClick={AddNewRoute}>Add Route</button>
//                   <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' onClick={handleCancleButton}>Cancel</button>
//               </div>
//             </div>
//           </div>
//           <Toaster/>
//         </div>
//       </Container>
//     </>
//   )
// }

// export default AddRoute










































// import React, { useState } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
// import styled from 'styled-components';
// import { addNewRouteApi } from '../../Utils/Apis';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';

// const Container = styled.div`
//   height: 92vh;

//   .mainBreadCrum {
//     --bs-breadcrumb-divider: '>' !important;
//   }

//   .bredcrumText {
//     color: var(--breadCrumTextColor);
//   }

//   .bredcrumActiveText {
//     color: var(--breadCrumActiveTextColor);
//   }

//   .form-control::placeholder, .form-control {
//     color: var(--greyState);
//   }

//   .form-control {
//     border-radius: 5px !important;
//     box-shadow: none !important;
//     border: 1px solid var(--fontControlBorder);
//   }

//   .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
//     width: fit-content;
//     border: 2px solid var(--BtnBorder);
//     background-color: var(--breadCrumActiveTextColor);
//   }

//   .EyeViewBtnn, .EyeViewBtnn:active {
//     width: fit-content;
//     border: 2px solid var(--BtnBorder);
//     background-color: var(--OrangeBtnColor);
//   }
// `;

// const AddRoute = () => {
//   const navigate = useNavigate();
//   const [routeName, setRouteName] = useState('');
//   const [routeNameError, setRouteNameError] = useState('');

//   const schema = Yup.object().shape({
//     routeName: Yup.string()
//       .required('Route Name is required')
//       .matches(/^[a-zA-Z0-9 ]*$/, 'Route Name can only contain letters and numbers')
//       .min(3, 'Route Name must be at least 3 characters')
//       .max(25, 'Route Name must be at most 25 characters')
//   });

//   const handleRouteNameChange = (e) => {
//     setRouteName(e.target.value);
//     setRouteNameError();
//   };

//   const AddNewRoute = async () => {
//     try {
//       await schema.validate({ routeName });

//       const formData = new FormData();
//       formData.append("routeName", routeName);

//       const response = await addNewRouteApi(formData);

//       console.log(response);

//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           toast.success(response?.data?.msg);
//           setTimeout(() => {
//             navigate('/route');
//           }, 1000);
//         } else {
//           console.log(response?.data?.msg);
//         }
//       }
//     } catch (error) {
//       if (error instanceof Yup.ValidationError) {
//         setRouteNameError(error.errors[0]);
//       } else {
//         console.log(error, 'error');
//       }
//     }
//   };

//   const handleCancleButton = () => {
//     navigate('/route');
//   };

//   return (
//     <>
//       <Container>
//         <div className="container-fluid p-4">
//           <div className="row">
//             <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
//               <div className="row ps-2">
//                 <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//                   <ol className="breadcrumb mb-1">
//                     <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
//                     <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
//                     <li className="breadcrumb-item"><a href="/route" className='bredcrumText text-decoration-none'>Route</a></li>
//                     <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Route</li>
//                   </ol>
//                 </nav>
//                 <p className='font14 ps-0 fontWeight500'>Add Route</p>
//               </div>
//             </div>
//           </div>
//           <div className="row ps-2 pe-2 pt-3">
//             <div className="bg-white cardradius p-3">
//               <form className="row g-3">
//                 <div className="col-md-6 col-sm-12 col-12">
//                   <label htmlFor="validationDefault02" className="form-label font14">Route</label>
//                   <input type="text" className={`form-control font14 ${routeNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" placeholder="Route Name" value={routeName} onChange={handleRouteNameChange} />
//                   <span className='text-danger'>{routeNameError}</span>
//                 </div>
//               </form>
//               <div className="row p-3">
//                 <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white' onClick={AddNewRoute} > Add Route </button>
//                 <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' onClick={handleCancleButton} > Cancel </button>
//               </div>
//             </div>
//           </div>
//           <Toaster />
//         </div>
//       </Container>
//     </>
//   );
// }

// export default AddRoute;