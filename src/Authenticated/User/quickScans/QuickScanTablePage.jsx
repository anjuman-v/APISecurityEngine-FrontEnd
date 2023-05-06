import React, { 
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import differenceBy from 'lodash/differenceBy';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component'
import { Button} from 'reactstrap';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const QuickScanTablePage = () =>  {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const [onLoading, setOnLoading] = useState(false);
  const [quickScantable, setQuickScantable] = useState([])



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
    
      fetch(process.env.REACT_APP_API_BASE_URL+'quick-scan-table-page', requestOptions)
        .then(response => response.json())
        .then((json) => setResponse(json))
        .then((data) => {
        }).catch((error) => {
          console.error(error);
        });
  }

  const setResponse = (json) => {

    setQuickScantable(json.quickScantable);
    setOnLoading(false);
  }



  const options = {
    filterType: "dropdown",
    responsive: "stacked",
    elevation: 0, //for table shadow box
    filter: true,
    download: true,
    print: true,
    search: true,
    searchOpen: true,
    viewColumns: true,
    selectableRows: false, // <===== will turn off checkboxes in rows
    rowsPerPage: 20,
    rowsPerPageOptions: [],
  };

  var tableData = [];
  


  const columns = [     
    {
     label: "Scan ID",
     options: {
       filter: false,
       download: false,
       
     }
   },      
   {
     label: "Project Name",
     options: {
       filter: false,
       download: false,
       
     }
   },
            
    {
      label: "Collection URL/Name",
      options: {
        filter: false,
        download: false,
        
      }
    },
    {
      label: "Endpoints",
      options: {
        filter: false,
        download: false,
        
      }
    },

    {
      label: "Date",
      options: {
        filter: false,
        download: false,
        
      }
    },
    {
      label: "Vulnerabilities",
      options: {
        filter: false,
        download: false,
        
      }
    },

  ];

  const getMuiTheme = () => createTheme({
    components: {
      MUIDataTableBodyCell: {
        styleOverrides:{
          root: {
              textAlign: "center"
          }
        }
      }
    }
  })

  const handleRowSelected = useCallback(state => {
      setSelectedRows(state.selectedRows);
    }, []);

    const contextActions = useMemo(() => {
      const handleDelete = () => {
        
        if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.label)}?`)) {
          setToggleCleared(!toggleCleared);
          toast.success("Successfully Deleted !")
        }
      };
  
      return <button key="delete" className="btn btn-danger" onClick={handleDelete}>Delete</button>;
    }, [ selectedRows, toggleCleared]);

   //


   
  

  

    return (
     <div style={{ overflow: "scroll", position:'relative', overflowY: 'hidden', padding:'0 2% 0 2%' }}>
        <div style={{ width:'100%',  marginTop:10, padding:10}}>
            <div style={{ display:'flex', justifyContent:'space-between', width:'99%'}}>
              <div style={{ marginBottom: '2rem', }}>
                  <h2>Quick Scans</h2>
              </div>
              <div>
                  <Button variant="contained" href="/start-quick-scan-page">Start a Quick Scan</Button>
              </div>
            </div>
        </div> 
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
        style={{ height: "60vh", width:'80vw' }}
        data={tableData}
        columns={columns}
        options={options} 
        selectableRows
        persistTableHead
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        
        /> 
        </ThemeProvider>        
    </div>
    );

};

export default QuickScanTablePage;


