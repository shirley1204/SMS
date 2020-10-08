  
import axios from "../../utils/axios";
import setAuthToken from "../../utils/setAuthToken";



export const RESOURCE_ACTION_TYPES = {
  FETCHING: "RESOURCES/FETCHING",
  RESOURCE_FETCH_SUCCESS: "RESOURCES/RESOURCE_FETCH_SUCCESS",
  RESOURCE_FETCH_FAILED: "RESOURCE/RESOURCE_FETCH_FAILED",
  RESOURCE_SEND_SUCCESS: "RESOURCE/RESOURCE_SEND_SUCCESS",
  RESOURCE_SEND_FAILED: "RESOURCE/RESOURCE_SEND_FAILED",
};

const token = localStorage.getItem("jwtToken");
// const headers ={
//   Authorization : `Bearer ${token}`
// }

export const onFetching = () => {
  return {
    type: RESOURCE_ACTION_TYPES.FETCHING,
  };
};

export const resourceFetchSuccess = (data) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_FETCH_SUCCESS,
    payload: data,
  };
};

export const resourceFetchFailed = (error) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_FETCH_FAILED,
    payload: error,
  };
};

export const resourceSendSuccess = () => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_SEND_SUCCESS,
  };
};

export const resourceSendFailed = (error) => {
  return {
    type: RESOURCE_ACTION_TYPES.RESOURCE_SEND_FAILED,
    payload: error,
  };
};


export const onFetchingResource = () => {
    return (dispatch) => {
      dispatch(onFetching());
      axios
        .get(`http://localhost:5000/admin/resources` , {headers: {Authorization: token,},})
        .then((res) => {
         
          if (res.status === 200) {
            
            dispatch(resourceFetchSuccess(res.data));
          
          } else {
          
            dispatch(resourceFetchFailed(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


  export const onAddingResource = (file, resourceData) => {
    let data = new FormData();
    data.append("resource", file);
  
    Object.keys(resourceData).forEach((key) => {
      data.append(key, resourceData[key]);
    });
  
    return (dispatch) => {
      axios
        .post(`http://localhost:5000/admin/resources`, data , {headers: {Authorization: token,},} )
        .then((res) => {
        
          window.location.reload(true);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  

  export const onEditResource = (file,resourceData) => {
   
    let data = new FormData();
    data.append("resource", file);
  
    Object.keys(resourceData).forEach((key) => {
      data.append(key, resourceData[key]);
    });
    
    return dispatch => {
      axios.put(`http://localhost:5000/admin/resource/${resourceData.id}`,data , {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
       }).catch(err => {
         console.log(err)
       })
    }
  }
  
  export const onDeleteResource = (id) => {
 
    return dispatch => {
      axios.delete(`http://localhost:5000/admin/resource/delete/${id}`,id , {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
      
        console.log(res);

       }).catch(err => {
         console.log(err)
       })
    }
  }
  