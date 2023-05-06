import React from 'react'

import {Button,Input,InputGroup,InputGroupAddon,InputGroupText} from 'reactstrap'

const quickScan = () =>{
  
const uploadField = document.getElementById("file");
const url = document.getElementById("field");


  
  return (
    <div >
      <p  style={{fontWeight:"300",marginTop:"2%",marginLeft:"2%",color:"black",fontSize:"24px"}}>Start a Quick Scan</p>
      <div style={{marginTop:"3%",marginLeft:"2%"}}>
        <p style={{marginTop:"3%",marginLeft:"1%",fontSize:"14px"}}>Enter postman/Swagger/OpenAPI Collection URL</p>
        <div>  <InputGroup style={{width:"50%",marginLeft:"1%"}}>
                      <Input className="form-control" type="text" placeholder="postman/Swagger/OpenAPI Collection URL" id='field' required/>
                   </InputGroup></div>
                   <p style={{marginTop:"2%",marginLeft:"1%",fontSize:"14px"}}>Or Attach postman/Swagger/OpenAPI Collection </p>
        <div>  <input  style={{width:"50%",marginLeft:"1%",border:"1px solid lightgrey",borderRadius:"2px"}}type='file' id="file"
        onChange={(e)=>{if(uploadField.files[0].size > 5e+6){
          alert("File is too big!");
          uploadField.value = "";
        }}}/></div> 
        <div><Button style={{marginTop:"3%",marginLeft:"1%",width:"50%"}} color="primary" className="mr-1">Submit</Button></div>
       
      
      </div>
      </div>
  )
}

export default quickScan