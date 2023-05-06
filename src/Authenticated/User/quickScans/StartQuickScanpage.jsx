import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AWS from "aws-sdk";

const StartQuickScanpage = () => {
    const [error, setError] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [load, setLoad] = useState(false);
  
    const initialData = {
      url: "",
      file: "",
    };
  
    const [formData, setFormData] = useState(initialData);
  
    function CheckFileSize(bytes) {
      const sizeInMB = (bytes / (1024 * 1024)).toFixed(0);
      return sizeInMB;
    }
    const isValidUrl = (urlString)=> {
      var urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i');
    return !!urlPattern.test(urlString);
  }
  
    const s3 = new AWS.S3();
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
      region: process.env.REACT_APP_S3_REGION,
      signatureVersion: "v4",
    });
  
  
  
    async function handleFileChange(e) {
      const file = e.target.files[0];
      setError(false)
      setFileError(false)
      const fileCheck = CheckFileSize(e.target.files[0]?.size);
  
      if(e.target.files[0] !== undefined) {
        if (fileCheck <= 5 ) {
          const params = {
            Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
            Key: `${Date.now()}.${file.name}`,
            Body: file,
          };
          const { Location } = await s3.upload(params).promise();
          // setFormData({...formData, file: Location})
          setFormData({...formData, file: file})
        } else {
          setFileError(true)
        }
      } else {
        setFormData({...formData, file: ""})
      }
     
    }
  
    function handleInputChange(e) {
      setError(false)
      if(e.target.name === "url") {
        setFormData({...formData, url: e.target.value})
        if(!isValidUrl(e.target.value) && e.target.value !== "") {
          setUrlError(true)
        } else {
          setUrlError(false)
        }
      } 
    }
  
  
  console.log(formData, "formData")
    function handleSubmit(event) {
      event.preventDefault();
      setLoad(true)
  
      if(formData?.url === "" && formData?.file === "") {
        setError(true)
      } else {
        if(!urlError && !fileError) {
          
          console.log("Submit function (API) ", formData)
  
        }
        setError(false)
      }
  
      console.log("fired...")
  
      setLoad(false)
    }
  
    
    return (
      <div>
        <p
          style={{
            fontWeight: "300",
            marginTop: "3%",
            marginLeft: "2%",
            color: "black",
            fontSize: "24px",
          }}
        >
          Start a Quick Scan
        </p>
        <div style={{ marginTop: "3%", marginLeft: "2%" }}>
          <p style={{ marginTop: "3%", fontSize: "14px" }}>
            Enter postman/Swagger/OpenAPI Collection URL
          </p>
          <div>
            <InputGroup style={{ width: "50%" }}>
              <Input
                className="form-control"
                type="text"
                placeholder="postman/Swagger/OpenAPI Collection URL"
                id="field"
                required
                invalid={urlError || error ? true : false}
                name="url"
                onChange={handleInputChange}
              />
              <FormFeedback>{error && formData?.url === "" ? "Please select a valid input!" : null} {urlError ? "Enter a valid url!" : null} </FormFeedback>
            </InputGroup>
          </div>
          <p style={{ marginTop: "2%", fontSize: "14px" }}>
            Or Attach postman/Swagger/OpenAPI Collection{" "}
          </p>
          <div>
            <FormGroup>
              <Input
                style={{
                  width: "50%",
                  border: "1px solid lightgrey",
                  borderRadius: "2px",
                }}
                type="file"
                id="file"
                onChange={handleFileChange}
                invalid={fileError || error ? true : false}
              />
              <FormFeedback>{error && formData?.file === "" ? "Please select a valid input!" : null} {fileError ? "File should not be more than 5mb!" : null}</FormFeedback>
            </FormGroup>
          </div>
          <div>
            <Button
              style={{ marginTop: "3%",  width: "50%" }}
              color="primary"
              className="mr-1"
              onClick={handleSubmit}
            >
              {load ? (
                <Box sx={{ display: "flex", justifyContent:"center" }}>
                  <CircularProgress sx={{color: "white"}}/>
                </Box>
              ) : (
                "Submit"
              )}
            </Button>
            <p style={{color: "green", fontSize: "12px", marginTop: "10px"}}>The scan has been started. You may leave this window for now. The scan report will be sent to the specified email and it will also be avalable under the Quick Scans.</p>
          </div>
        </div>
      </div>
    );
  };



export default StartQuickScanpage