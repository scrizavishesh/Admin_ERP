import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import LineChart from '../Charts/LineChart';

const Container = styled.div`
  
  .card{
    border-radius: 10px;
    border: 1px solid var(--greyborderColor)
  }

  .latestreqDiv h3{
    line-height: 26px !important;
  }
  .latestreqDiv{
    height: 10vh;
    overflow: hidden scroll;
  }
  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }
`;


const AdminDashboard = () => {
  return (
    <>
      <Container>
          <div className="container-fluid ps-4 pe-4 pt-2 pb-2">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Schools</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>56</h1></div>
                      <div className="flex-shrink-1"><img src="./images/Vector.svg" alt="" height={20}/></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Addons</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>11</h1></div>
                      <div className="flex-shrink-1"><img src="./images/Vector.svg" alt="" height={20}/></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Subscriptions</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>04</h1></div>
                      <div className="flex-shrink-1"><img src="./images/Vector.svg" alt="" height={20}/></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
                <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                  <div className="row pe-0">
                    <div className="d-flex pe-0">
                      <div className="w-100 d-flex align-self-center"><h2>Packages Details</h2></div>
                      <div className="flex-shrink-1"><img src="./images/book.svg" alt="" height={30}/></div>
                    </div>
                  </div>
                  <div className="row pe-0 pt-2">
                    <div className="d-flex pe-2">
                      <div className="w-100"><h1 className='orangeText'>05</h1></div>
                      <div className="flex-shrink-1"><img src="./images/Vector.svg" alt="" height={20}/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>School Details</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/superAdminSchools'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="overflow-scroll">
                    <table className="table mt-2 mb-0">
                      <tbody>
                        <tr>
                            <td><h3 className='greyText'>Green Land Public School</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td><h3 className='greyText'>Green Land Public School</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td className='eventablerow'><h3 className='greyText'>Green Land Public School</h3></td>
                            <td className='eventablerow'><h3 className='activeText'>Active</h3></td>
                            <td className='text-end eventablerow'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td><h3 className='greyText'>Green Land Public School</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td className='eventablerow'><h3 className='greyText'>Green Land Public School</h3></td>
                            <td className='eventablerow'><h3 className='activeText'>Active</h3></td>
                            <td className='text-end eventablerow'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td><h3 className='greyText'>Green Land Public School</h3></td>
                            <td><h3 className='deactiveText'>DeActive</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td className='eventablerow'><h3 className='greyText'>Green Land Public School</h3></td>
                            <td className='eventablerow'><h3 className='activeText'>Active</h3></td>
                            <td className='text-end eventablerow'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td><h3 className='greyText'>Green Land Public School</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>Earning Details</h2></div>
                    </div>
                  </div>
                  <div className="overflow-scroll">
                    <LineChart/>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>Package</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/superAdminSchools'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="overflow-scroll">
                    <table className="table mt-2 mb-0">
                        <tbody>
                        <tr>
                            <td><h3 className='greyText'>Silver</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td className='eventablerow'><h3 className='greyText'>Platium</h3></td>
                            <td className='eventablerow'><h3 className='activeText'>Active</h3></td>
                            <td className='text-end eventablerow'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td><h3 className='greyText'>Gold</h3></td>
                            <td><h3 className='activeText'>Active</h3></td>
                            <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        <tr>
                            <td className='eventablerow'><h3 className='greyText'>Daimond</h3></td>
                            <td className='eventablerow'><h3 className='activeText'>Active</h3></td>
                            <td className='text-end eventablerow'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                        </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
                <div className="card p-2">
                  <div className="card-header bg-white ps-1 pe-1">
                    <div className="d-flex pb-2">
                      <div className="flex-fill"><h2>Latest Request</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/superAdminSchools'><h2>View All</h2></Link></div>
                    </div>
                  </div>
                  <div className="card greyTopborders greyBottomborders border-0 p-1">
                    <div className="d-flex pt-2">
                      <div className="flex-fill"><h2 className='text-decoration-underline'>Heading Text</h2></div>
                      <div className="flex-fill text-end"><Link className='greenText' to='/superAdminSchools'><h2>View All</h2></Link></div>
                    </div>
                    <div className="row m-2 pe-0 latestreqDiv">
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                        <h3 className='greyText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                    </div>
                  </div>
                  <div className="card-footer bg-white ps-0">
                  <h5 className='greyText fst-italic'>Abhijat - 2 Days Ago</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </>
  )
}

export default AdminDashboard