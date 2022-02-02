import React, { Component } from 'react';

import jwt_decode from 'jwt-decode'
import {
   Row,
   Col,
   Card,
   Form,
   Button,
   Input,
   FormGroup,FormText,Label
  } from "reactstrap";
  import "./update.css"
import myaxios from '../utils/axios';
import {successToast} from '../utils/toast'
class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
           mobileNo: '',
          
          email: '',
          dept: "",
        regNo: "",
          errors: {}
        }
    
        }

      // onChange=(e)=> {
      //   this.setState({ [e.target.name]: e.target.value })
      // }
    
      onSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        const loggedUser=localStorage.getItem("user")
        const decode=jwt_decode(loggedUser)
        
        // const updateUser = {
        //   name: this.state.name,
        // module: this.state.mobileNo,
        //   email: this.state.email,
        //   dept: this.state.dept,
        //   regNo:this.state.regNo,
        //   token:localStorage.user
        // }

        myaxios.put('/updateUser',{id:decode.id,name:this.state.name,mobileNo:this.state.mobileNo,email:this.state.email,dept:this.state.dept,regNo:this.state.regNo})

        .then(response => {
         console.log(response)
          if(response.data.message==="updated"){
            successToast("Updated Successfully")
            setTimeout(() => {
              window.location='/profile'
            },1000);
          }
         
        }).catch((err)=>{
          console.log(err)
        })
      }

      // componentDidMount() {
      //   //this.props.history.push(`/profile`);
      // //   const token = localStorage.usertoken
      // //   const decoded = jwt_decode(token)
      // //   this.setState({
      // //     name: decoded.first_name,
      // //     mobileNo: decoded.mobileNo,
          
      // //     email: decoded.email,
      // //     dept:decoded.dept,
      // //     regNo:decoded.regNo
      // //   })
      // // }
      // // Cancel(){
      // //   this.props.history.push(`/profile`)
      // }
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
      }

    render() {
      
        return (
            <div>
                <Card className="logincard my-5">
                <Form  noValidate>
                <FormGroup controlId="formBasicEmail">
                <Label>Name</Label>
                <Input type="text" name="name" placeholder="Enter Your FirstName" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}}/>
                
                </FormGroup>

               

                <FormGroup controlId="formBasicEmail">
                <Label>Mobile Number</Label>
                <Input type="number" name="mobileNo" placeholder="Enter Your Contact Number" value={this.state.mobileNo} onChange={(e)=>{this.setState({mobileNo:e.target.value})}}/>
                
                </FormGroup>

                <FormGroup controlId="formBasicEmail">
                <Label>Email address</Label>
                <Input type="email" name="email" placeholder="Enter Your Email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}}/>
                
                </FormGroup>
                <FormGroup controlId="formBasicEmail">
                <Label>dept</Label>
                <Input type="text" name="dept" placeholder="Enter Your dept" value={this.state.dept} onChange={(e)=>{this.setState({dept:e.target.value})}}/>
                
                </FormGroup>  <FormGroup controlId="formBasicEmail">
                <Label>RegisterNo</Label>
                <Input type="text" name="regNo" placeholder="Enter Your regno" value={this.state.regNo} onChange={(e)=>{this.setState({regNo:e.target.value})}}/>
                
                </FormGroup>
                <Row>
                  <Col>
                  <Button variant="outline-primary" onClick={(event)=>this.onSubmit(event)}>
                Submit
                </Button>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                  <Button variant="outline-danger" type="button"  >
                Cancel
                </Button>
                  </Col>
                </Row>


                </Form>
                </Card>
            </div>
        )
    }
}

export default Update;