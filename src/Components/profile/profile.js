import React, { Component } from 'react'
import { Row,Col,Button } from 'reactstrap'
// import { getProfile } from './../UserFunctions/UserFunctions';
import jwt_decode from 'jwt-decode'
import myaxios from '../utils/axios'




class Profile extends Component {
  constructor() {
    super()
    this.state = {
        name: "",
        mobileNo: "",
        
        email: "",
        dept: "",
        regNo: "",
      errors: {}
    }
  }

  componentDidMount() {

  
    if(!localStorage.getItem("user")){
      alert("Please Login")
      setTimeout(() => {
        window.location='/'
      }, 2000);
    }else{
      
      const token = localStorage.getItem("user")
      const decode =jwt_decode(token)
      
      myaxios
      
      .get(`/user/${decode.id}`)
      .then((response) =>{
        console.log(response)
        this.setState({
                    name: response.data.name,
                    mobileNo: response.data.mobileNo,
                    email: response.data.email,
                    dept: response.data.dept,
                    regNo:response.data.regNo
                  })

       
        
      }).catch((err)=>{
        console.log(err)
      })
      
    }
      
    
    // myaxios
    // const token = localStorage.getItem("user")
    //   if (!localStorage.getItem("user")){
    //       alart("invalid user");
    //       setTimeout( () => {
    //           window.location="/";},100);
              
    //   }
    //   else{
          
          
    //       const decoded = jwt_decode(token)
    //       this.setState({
    //         name: decoded.name,
    //         mobileNo: decoded.mobileNo,
    //         email: decoded.email,
    //         dept: decoded.dept,
    //         regNo:decoded.regNo
    //       })

    //   }
    // const token = localStorage.getItem("user")
    // const decoded = jwt_decode(token)
    // this.setState({
    //   name: decoded.name,
    //   mobileNo: decoded.mobileNo,
    //   email: decoded.email,
    //   dept: decoded.dept,
    //   regNo:decoded.regNo
    // })
  }


  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>MobileNo</td>
                <td>{this.state.mobileNo}</td>
              </tr>
              
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Dept</td>
                <td>{this.state.dept}</td>
              </tr>
              <tr>
                <td>regNo</td>
                <td>{this.state.regNo}</td>
              </tr>
            </tbody>
          </table>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col><Button variant="outline-dark" href="/update">EDIT</Button></Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Profile
