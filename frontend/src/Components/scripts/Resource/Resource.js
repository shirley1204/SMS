import React, { Component } from "react";
import  {
    Card,
    CardContent,
    CardActions,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    TableHead,
    InputBase,
    CircularProgress,
    Typography,
    Fab,
    Backdrop,
    Modal,
    TextField,
    Button,
}  from "@material-ui/core";
import Link from '@material-ui/core/Link';

import SearchIcon from "@material-ui/icons/Search";
// import ExpandMoreIcon from "@material-ui/icons/Expandmore";
import AddIcon from "@material-ui/icons/Add";
import {withStyles, fade} from "@material-ui/core/styles";

// import { withSkeleton } from "../HOC/withSkeleton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onFetchingResource,
  onAddingResource,
  onEditResource,
  onDeleteResource,

// deleteResource,
AddMultipleResources } from "../../Redux/Resources/ResourceAction";
import { DATA_STATE } from "../../Redux/dataState";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";
import Drawer from "../../reusuable/Drawer"



// const FormField = {
//     name:"name",
//     std: "std",
//     board:"board",
//     file:"file",
//     subject:"subject",
// };

const useStyles = (theme) =>({
    selectedFileText :{
        marginRight:10,
        marginBottom:3,

    },
    Upload:{
        dispaly:"flex",
        justifyContent:"flex-end",
        alignItems: "flex-end",
        marginTop:5,
        marginBottom:5,
    },
    loader:{
        marginLeft:"50%",
    },
    inputRoot:{
        color:"black",
    },
    // inputInput:{
    //     padding :theme.spacing(1,1,1,0),
    //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //     transition : theme.transition.create("width"),
    //     width:"100%",
    //     [theme.breakpoints.up("sm")]:{
    //         width:"12ch",
    //         "&:focus":{
    //             width:"20ch",
    //         },
    //     },
    // },
    search:{
        position:"relative",
        borderRadious:theme.shape.borderRadious,
        backgroundColor: fade(theme.palette.common.white,0.15),
        "&:hover":{
            backgroundColor: fade(theme.palette.common.white,0.25), 
        },
        marginLeft:0,
        width:"100%",
        [theme.breakpoints.up("sm")]:{
            marginLeft:theme.spacing(1),
            width:"auto",
        },
    },
    searchIcon:{
        padding:theme.spacing(0,2),
        height:"100%",
        position:"absolute",
        pointerEvents:"none",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",

        },
        flexBox:{
            justifyContent:"space-between",
            alignItems:"space-between",
        },
        floatingButton:{
          width: 60,  
          height: 60,   
          borderRadius: 30,            
          backgroundColor: '#ee6e73',                                    
          position: 'fixed',                                          
          bottom: 50,                                                    
          right: 100, 
            backgroundColor:"purple"
        },
        modal:{
            display:"flex",
            alignItems:"center",
            justifyContent:"center",

        },
        paper:{
            backgroundColor:theme.palette.background.paper,
            border:"10px solid red",
            boxShadow:theme.shadows[5],
            padding:theme.spacing(2,4,3),
            

        },
       
        modalContainer:{
            padding:15,
            width:"50%",
            backgroundColor:"white",
        },
        AddResourceText:{
            textAlign:"center",
            color:"purple",
        },

});

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
            id:"",
            
            open:false,
            limit:0,
            activePage:10,
            open:false,
            adminId:"",
            title:"",
            std:"",
            board:"",
            subject:"",
            selectedFile: null,
            heading:["Resource Name","Std","Board","Subject","Action"],
            openEditModal:false,
            filteredResources:[],
            loading:false,
    };
  }


componentDidMount() {
    this.props.onFetchingResource();
  }

  onHandleChange = (e) => {
    let query = e.target.value;
    console.log(query);
    if (query.length == 0) {
      this.setState({
        finalResource: null,
      });
    }
    this.setState({
      searchQuery: query,
    });
    console.log(this.props.resource.resources);
    let filteredArray = this.props.resource
      ? this.props.resource.resources.filter((val) => {
          console.log(val.title.toLowerCase() == query.toLowerCase());
          let contentQuery = val.title.toLowerCase();
          return contentQuery.indexOf(query) !== -1;
        })
      : [];

    console.log(filteredArray);

    this.setState({
      finalResource: filteredArray,
    });
  };

  handlePageChange(pageNumber){
    console.log(`active page is ${pageNumber}`);
    this.setState({
        activePage:pageNumber
    });
};

_onHandleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    });
  };
  _onFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };  
  _onHandleClassAndStandard =() =>{
      const {std,board,resource} =this.props;
  };  

  _onSubmit = () => {
    const {std,board,subject,selectedFile,title} = this.state
    const newResource = {
      std,
      board,
      subject,
      title
    };
    console.log(newResource)
    this.props.onAddingResource(this.state.selectedFile, newResource);
  };

_onEdit = () =>{
    const {id,title,std,selectedFile,board,subject }=this.state;
    console.log(id)
    const newResource ={
        id,
        title,
        std,
       board,
        subject,

    };
   this.props.onEditResource(this.state.selectedFile, newResource);
};


_onDelete = (id) => {
 console.log(id);
  this.props.onDeleteResource(id)
  // this.props.history.push('/resource');
 
  
};


handleOpen =() =>{
    this.setState({
        open:true,
    });
};
handleClose =() =>{
    this.setState({
        open:false,
    });
};
handleOpenModal = (newResource) =>{
 console.log(newResource)
   this.setState({
       openEditModal:true,
       title:newResource.title,
       std:newResource.std,
       subject:newResource.subject,
       board:newResource.board,
       selectedFile:newResource.file,
       id:newResource._id
   })
}
handleCloseModal = () =>{
   this.setState({
       openEditModal:false,
   })
}

  render() {
    console.log(this.state.board);
    console.log(this.props.resource);
    // console.log(this.state.finalResource);
    const { board, title, description, subject, classs } = this.state;
    const { classes } = this.props;
    const { resource } =this.props
    const { dataState } = this.props.resource;
 const { resources } = this.props.resource;
    
        return ( 
          <Drawer>
        <React.Fragment>
          <div className="row">
              <div className="col-md-2" />
              <div className="col-md-8 mt-5">
                  {resources ? (
                  <React.Fragment>  
               {resource.length > 0 || resource != [] ? (
                   <Card>
                       <div className={classes.search}>
                           <div className={classes.searchIcon}>
                        <SearchIcon />     
                        </div>
                        <InputBase
                        placeholder="Search.."
                        classes={{
                            root:classes.inputRoot,
                            input:classes.inputInput,
                        }}  
                        inputProps={{"aria-label" : "search"}}
                        />
                        </div>
             <CardContent>
                 <TableContainer component={Paper}>
                     <Table
                     className={classes.table}
                     aria-label="simple table"
                     >
               <TableHead>
                   <TableRow>
                       <TableCell align="center">Resource Name </TableCell>
                       <TableCell align="center">Std</TableCell>
                       <TableCell align="center">Board </TableCell>
                       <TableCell align="center">Subject </TableCell>
                       
                       <TableCell align="center">Action </TableCell>
                       </TableRow>
                       </TableHead>
                       <TableBody>
                       {resources.map((row) => (
                           <TableRow key={row._id}>
                   <TableCell component="th" scope="row" align="center" >{row.title} </TableCell>
                   <TableCell align="center">{row.std} </TableCell>
                   <TableCell align="center">{row.board} </TableCell>
                   <TableCell align="center">{row.subject} </TableCell>
                   {/* <TableCell align="center"><Link target="_blank" to={row.filename}>Download File</Link> </TableCell> */}
                   <TableCell align="center">
                       <Button onClick={this.handleOpenModal.bind(this,row)} variant="outlined" size="small" color="primary">Edit</Button>
                       <Button onClick={this._onDelete.bind(this,row._id)} className="ml-3" variant="outlined" size="small" color="red">Delete</Button>
                        </TableCell>
                        </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                        </TableContainer>
                        </CardContent>
                        </Card>
               ) : (
                 
             null

               )}
</React.Fragment>
                  )
                : ( <div>
                  <Typography variant="h4">Downloading Resources</Typography>
                </div>
 )}
</div>
<div className="col-md-2" />
</div>

<div className={classes.floatingButton}>
  <Fab color="primary" aria-label="add" onClick={this.handleOpen} >
      <AddIcon />
      </Fab>
</div>

<div>
  <Modal
aria-labelledby="spring-modal-title"
aria-describedby="spring-modal-description"
className={classes.modal}
open={this.state.open}
onClose={this.handleClose}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
 timeout: 500,
}}
>
<div className={classes.modalContainer}>
   <Typography variant="h4" className={classes.AddResourceText}>
       ADD Resource</Typography>
 <div className="container">
     <Button variant="contained" component="label">
         Upload File
         <input type="file" onChange={this._onFileChange}   
         style={{display:"none"}}  />
         </Button>
         <Typography>
             { this.state.selectedFile
             ? this.state.selectedFile.name
           : null} 
</Typography>
<div className="row">
   <div className="col-md-2"></div>
   <div className="col-md-8">
   <TextField
                   id="standard-basic"
                   label={`Resource title`}
                   color="primaryText"
                   colorSecondary
                   type="text"
                   name="title"
                   value={this.state.title}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />
<TextField
                   id="standard-basic"
                   label={`board`}
                   color="primaryText"
                   colorSecondary
                   type="text"
                   name="board"
                   value={this.state.board}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />
      <TextField
                   id="standard-basic"
                   label="std"
                   color="primaryText"
                   colorSecondary
                   type="text"
                   name="std"
                   value={this.state.std}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />
      <TextField
                   id="standard-basic"
                   label={`Subject`}
                   color="primaryText"
                   colorSecondary
                   type="text"
                   name="subject"
                   value={this.state.subject}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />
    <div className="row mt-3">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ alignSelf: "center"}}
            onClick={this._onSubmit}>Submit</Button>
            </div>
            <div className="col-md-4"></div>
            </div>
            </div>
            <div className="col-md-2"></div>
            </div>
            </div>
            </div>
            </Modal>
            </div>

<div>
  <Modal
aria-labelledby="spring-modal-title"
aria-describedby="spring-modal-description"
className={classes.modal}
open={this.state.openEditModal}
onClose={this.handleCloseModal}
closeAfterTransition
BackdropComponent={Backdrop}
BackdropProps={{
 timeout: 500,
}}
>         
<div className={classes.modalContainer}>
   <Typography variant="h4" className={classes.AddResourceText}>
     Edit Resource</Typography>
 <div className="container">


     <Button variant="contained" component="label">
         Upload File
         <input type="file" onChange={this._onFileChange}   
         style={{display:"none"}}  />
         </Button>  
<div>
         <Typography>
             { this.state.selectedFile
             ? this.state.selectedFile.name
           : null} 
           
</Typography>  
</div>
<div className="row">
   <div className="col-md-2"></div>
   <div className="col-md-8">
   <TextField
                   id="standard-basic"
                   label={`Resource title`}
                   color="primaryText"
                   
                   type="text"
                   name="title"
                   value={this.state.title}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />

      <TextField
                   id="standard-basic"
                   label="std"
                   color="primaryText"
                  
                   type="text"
                   name="std"
                   value={this.state.std}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    /><TextField
    id="standard-basic"
    label="board"
    color="primaryText"
    
    type="text"
    name="board"
    value={this.state.board}
    onChange={this._onHandleChange}
    style={{ marginRight:"5%"}}
/>

    
      <TextField
                   id="standard-basic"
                   label="subject"
                   color="primaryText"
                   
                   type="text"
                   name="subject"
                   value={this.state.subject}
                   onChange={this._onHandleChange}
                   style={{ marginRight:"5%"}}
    />

<div className="row mt-3">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ alignSelf: "center"}}
            onClick={this._onEdit}>Edit</Button>
            </div>
            <div className="col-md-4"></div>
            </div>
            </div>
            <div className="col-md-2"></div>
            </div>
            </div>
            </div>
            </Modal>
            </div>

            </React.Fragment>
            </Drawer>
  );
             
}

}
  

function mapStateToProps(state) {
  return {
    resource: state.resource,
  };
}

export default connect(mapStateToProps, { onFetchingResource,onAddingResource,onEditResource,onDeleteResource })(
  withStyles(useStyles)(withRouter(Resource))
);