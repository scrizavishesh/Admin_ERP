import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';


const Container = styled.div`

/* ############# offcanvas ############## */

  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .modal {
        --bs-modal-width: 280px !important;
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
  .sure-content{
    margin-bottom: -10px !important;

  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
`;

const StateTable_1 = () => {

  
  return (
   <Container>
   <div className="table-container pt-3  table-responsive">
      
      <table className="table table-sm ">
         <thead className=''>
           <tr className='heading-16 text-color-000' style={{fontWeight:'500'}}>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>#</th>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>Employee</th>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>Role</th>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>Start Date</th>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>End Date</th>
             <th className='tableGreyBackgroundColor' style={{width:'165px'}}>Reason</th>
             <th className='tableGreyBackgroundColor' >Actions</th>
           </tr>
         </thead>
   
         <tbody className='heading-14 align-middle greyTextColor'>
           <tr className='heading-14' >
             <td className=' greyText'>1</td>
             <td className=' greyText'>Admin</td>
             <td className=' greyText'>Admin</td>
             <td className=' greyText'>26/2/2024</td>
             <td className=' greyText'>26/2/2024</td>
             <td className=' greyText  '>I was not well</td>
             <td   className=' greyText ' >
             <div className="dropdown my-button-show">
                 <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Action  &nbsp;
                   <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                 <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                 </svg>
                 </button>
                 <ul className="dropdown-menu anchor-color heading-14">
                   <li><Link className="dropdown-item" to={''}  data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Approve</Link></li>
                   <li><Link className="dropdown-item" to={''} >Decline</Link></li>
                   <li><Link className="dropdown-item" to={''} >Delete</Link></li>
                 </ul>
             </div>
             </td>
           </tr>
           <tr className='heading-14' >
             <td className=' greyText tableGreyBackgroundColor'>1</td>
             <td className=' greyText tableGreyBackgroundColor'>Admin</td>
             <td className=' greyText tableGreyBackgroundColor'>Admin</td>
             <td className=' greyText tableGreyBackgroundColor'>26/2/2024</td>
             <td className=' greyText tableGreyBackgroundColor'>26/2/2024</td>
             <td className=' greyText  tableGreyBackgroundColor'>I was not well</td>
             <td   className=' greyText  tableGreyBackgroundColor' >
             <div className="dropdown my-button-show">
                 <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                   Action  &nbsp;
                   <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                 <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black"/>
                 </svg>
                 </button>
                 <ul className="dropdown-menu anchor-color heading-14">
                   <li><Link className="dropdown-item" to={''} >Edit</Link></li>
                   {/* <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight33" aria-controls="offcanvasRight">View Profile</Link></li> */}
                   <li><Link className="dropdown-item" to={''} >Delete</Link></li>
                 </ul>
             </div>
             </td>
           </tr>
         </tbody>
     </table>
      </div>
            <div class="modal my-modal-1 fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content sure-main-container">
               
                <div className="sure-content mt-2">
                   <div className="svg pt-3">
                         <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.5312 0C13.2656 0 0 13.2656 0 29.5312C0 45.7969 13.2656 59.0625 29.5312 59.0625C45.7969 59.0625 59.0625 45.7969 59.0625 29.5312C59.0625 13.2656 45.7969 0 29.5312 0ZM29.5312 55.3125C15.3281 55.3125 3.75 43.7344 3.75 29.5312C3.75 15.3281 15.3281 3.75 29.5312 3.75C43.7344 3.75 55.3125 15.3281 55.3125 29.5312C55.3125 43.7344 43.7344 55.3125 29.5312 55.3125Z" fill="#DCD29D"/>
                            <path d="M31.4062 25.0781H27.6562V43.8281H31.4062V25.0781Z" fill="#DCD29D"/>
                            <path d="M31.4062 16.1719H27.6562V19.9219H31.4062V16.1719Z" fill="#DCD29D"/>
                        </svg>
                   </div>
                    <h5 className='heading-20 pt-2'>Are you sure?</h5>
                    <p>You won't able to revert this!</p>
                </div>
                <div className='my-button11 pb-5'>
                <button type="button" className="btn btn-outline-success "  data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Approve</button>
                <button type="button" className="btn btn-outline-success " data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Cancel</button>
                </div>
                </div>
            </div>
            </div>
   </Container>
  )
}

export default StateTable_1
