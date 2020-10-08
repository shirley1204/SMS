  
import axios from "../../utils/axios";
import setAuthToken from "../../utils/setAuthToken";



export const STUDENT_ACTION_TYPES = {
  FETCHING: "STUDENT/FETCHING",
  STUDENT_FETCH_SUCCESS: "STUDENTS/STUDENTS_FETCH_SUCCESS",
  STUDENT_FETCH_FAILED: "STUDENTS/STUDENTS_FETCH_FAILED",
  STUDENT_SEND_SUCCESS: "STUDENTS/STUDENTS_SEND_SUCCESS",
  STUDENT_SEND_FAILED: "STUDENTS/STUDENTS_SEND_FAILED",
};

const token = localStorage.getItem("jwtToken");
// const headers ={
//   Authorization : `Bearer ${token}`
// }

export const onFetching = () => {
  return {
    type: STUDENT_ACTION_TYPES.FETCHING,
  };
};

export const studentFetchSuccess = (data) => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_FETCH_SUCCESS,
    payload: data,
  };
};

export const studentFetchFailed = (error) => {
  return {
    type:STUDENT_ACTION_TYPES.STUDENT_FETCH_FAILED,
    payload: error,
  };
};

export const studentSendSuccess = () => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_SEND_SUCCESS,
  };
};

export const studentSendFailed = (error) => {
  return {
    type: STUDENT_ACTION_TYPES.STUDENT_SEND_FAILED,
    payload: error,
  };
};


export const onFetchingStudent= () => {
    return (dispatch) => {
      dispatch(onFetching());
      axios
        .get(`http://localhost:5000/admin/students` , {headers: {Authorization: token,},})
        .then((res) => {
          
          if (res.status === 200) {
           
            dispatch(studentFetchSuccess(res.data));
          } else {
          
            dispatch(studentFetchFailed(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


 export const onAddingStudent = (studentData) => {
 return (dispatch) => {
      axios
        .post(`http://localhost:5000/admin/students`, studentData, {headers: {Authorization: token,},} )
        .then((res) => {
        
          window.location.reload(true);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  

  export const onEditStudent = (studentData) => {
   
return dispatch => {
      axios.put(`http://localhost:5000/admin/student/${studentData.id}`,studentData, {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
       }).catch(err => {
         console.log(err)
       })
    }
  }
  
  export const onDeleteStudent = (id) => {
 
    return dispatch => {
      axios.delete(`http://localhost:5000/admin/student/delete/${id}`,id , {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
      
        console.log(res);

       }).catch(err => {
         console.log(err)
       })
    }
  }
  