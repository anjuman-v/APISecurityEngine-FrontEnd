import { CFormInput } from "@coreui/react";
import { Button } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import './quickScans.css'
import {  Col, Card, CardHeader, CardBody, Row } from 'reactstrap'
// import { PieChart,} from "../../../constant";
import { apexPieChart } from "../../../components/charts/apexCharts/apexData";
import Chart from 'react-apexcharts'


function QuickScanDetailPage() {
  
  const columns = ["Severity", "Critical", "High", "Medium", "Low"];
  const columns1 = ["#", "Category", "Vulnerabilities", "Endpoint", "CVSS 3.1", "Severity", "Remediation"];

  const data = [
   ["# of issues", "2", "3", "4", "2", ],
  ];
  const data1 = [
    ["1", "OWASP #1", "Broken Authentication", "GET:/api/v1/primary-transaction",  ], 
   ];


   const [onLoading, setOnLoading] = useState(false);
   const [quickScanDetail, setQuickScanDetail] = useState([])


   useEffect(() => {
    loadJobs();
  }, []);


  const loadJobs = (json) => {

    setOnLoading(true);

    var theLoginToken = JSON.parse((localStorage.getItem("user"))).access_token;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + theLoginToken
      }
    };
    
      fetch(process.env.REACT_APP_API_BASE_URL+'quick-scan-Detail-page', requestOptions)
        .then(response => response.json())
        .then((json) => setResponse(json))
        .then((data) => {
        }).catch((error) => {
          console.error(error);
        });
  }

  const setResponse = (json) => {

    setQuickScanDetail(json.quickScanDetail);
    setOnLoading(false);
  }




return (
  <>
      
  <div style={{ width:'100%', marginTop:'2%', padding:'2%'}}>
    
    <div style={{ display:'flex', justifyContent:'space-between', }}>
      <div style={{width:'50%', }}>
        <div style={{ padding:'1% 3% 0 3%'}}>
          <p style={{fontSize:25}}>{'Quick Scan #1234'}</p>
          <p style={{marginTop:'-4%', fontSize:14}}><span style={{fontWeight:'bold',}}>Scan Name: </span>{'The Name'}</p>
          <p style={{marginTop:'-3%', fontSize:14}}><span style={{fontWeight:'bold',}}>Collection URL/name: </span>{'url-or-name'}</p>
          <p style={{marginTop:'-3%', fontSize:14}}><span style={{fontWeight:'bold',}}>Endpoints - </span>{'45'}</p>
          <p style={{marginTop:'-3%', fontSize:14}}><span style={{fontWeight:'bold',}}>Vulnerabilities - </span> {'679'}</p>
          <p style={{marginTop:'-3%', fontSize:14}}><span style={{fontWeight:'bold',}}>Date - </span>{'23 Aug 2023'}</p>

          <div style={{  marginTop:'5%'}}>
          <CFormInput
                type="text"
                id="search"
                name="nf-email"
                placeholder="Search in the Scan Result"
                autoComplete="email"
              />
          </div>
        </div>
      </div>
      <div style={{width:'30%', }}>
          <Button style={{marginLeft:'45%'}} variant="outlined">Back to Scans List</Button>  
          <div>
          <Button style={{marginTop:'39%', marginLeft:'50%'}} variant="contained">Export to PDF</Button> 
          </div>
      </div>
    </div>

    <div style={{marginTop:'10%',}}>
        <p style={{fontSize:18, marginLeft:10,}}>Vulnerabilities by Severity  </p>
        <MUIDataTable
        data={data}
        columns={columns}
        // options={options}
      />


    </div>

    <div>
      <p style={{fontWeight:'bold', fontSize:18, marginTop:'5%'}}>Severity Scoring</p>
      <div className="severity-scoring-para">
        <p><spam style={{fontWeight:'bold', marginleft:5}}>Critical: </spam> Vulnerabilities that can be exploited remotly, leading to immediate and widespread impact on the confidentiality. Integrity and availability of System or Data </p>
      </div>

      <div className="severity-scoring-para">
        <p><spam style={{fontWeight:'bold', marginleft:5}}>High: </spam> Vulnerabilities that can be exploited but can be require some form of user interaction or other preconditions to be met, potentialyy resultingin significant impact on systemor data.</p>
      </div>

      <div className="severity-scoring-para">
        <p><spam style={{fontWeight:'bold', marginleft:5}}>Medium: </spam> Vulnerabilities that could be result in a compromise of system or data security but require more complex exploitation techniques or have limited impact.</p>
      </div>

      <div className="severity-scoring-para">
        <p><spam style={{fontWeight:'bold', marginleft:5}}>Low: </spam> Vulnerabilities that have a low likelihood of being exploited or have minimal impact on system or data security.</p>
      </div> 
    </div>
  </div>

  <Row>
  
  <Col sm="12" xl="6">
      <Card>
        <CardHeader>
          <h5>Vulnerabilities Distribution  </h5>
        </CardHeader>
        <CardBody className="apex-chart">
          <div id="piechart">
            <Chart options={apexPieChart.options} series={apexPieChart.series} type="pie" width={380} />
          </div>
        </CardBody>
      </Card>
    </Col>

    <Col sm="12" xl="6">
      <Card>
        <CardHeader>
          <h5>Sensitive Data</h5>
        </CardHeader>
        <CardBody className="apex-chart">
          <div id="piechart">
            <Chart options={apexPieChart.options} series={apexPieChart.series} type="pie" width={380} />
          </div>
        </CardBody>
      </Card>
    </Col>
</Row>

  <div style={{marginTop:'10%',}}>
        <p style={{fontSize:18, marginLeft:10,}}>Discovered Vulnerabilities  </p>
        <MUIDataTable
        data={data1}
        columns={columns1}
        // options={options}
      />


    </div>
  
  </>   
 )
}


export default QuickScanDetailPage
