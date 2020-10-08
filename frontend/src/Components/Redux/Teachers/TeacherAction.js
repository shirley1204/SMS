  
import axios from "../../utils/axios";
import setAuthToken from "../../utils/setAuthToken";



export const TEACHER_ACTION_TYPES = {
  FETCHING: "TEACHER/FETCHING",
  TEACHER_FETCH_SUCCESS: "TEACHERS/TEACHERS_FETCH_SUCCESS",
  TEACHER_FETCH_FAILED: "TEACHERS/TEACHERS_FETCH_FAILED",
  TEACHER_SEND_SUCCESS: "TEACHERS/TEACHERS_SEND_SUCCESS",
  TEACHER_SEND_FAILED: "TEACHERS/TEACHERS_SEND_FAILED",
};

const token = localStorage.getItem("jwtToken");
// const headers ={
//   Authorization : `Bearer ${token}`
// }

export const onFetching = () => {
  return {
    type: TEACHER_ACTION_TYPES.FETCHING,
  };
};

export const teacherFetchSuccess = (data) => {
  return {
    type: TEACHER_ACTION_TYPES.TEACHER_FETCH_SUCCESS,
    payload: data,
  };
};

export const teacherFetchFailed = (error) => {
  return {
    type:TEACHER_ACTION_TYPES.TEACHER_FETCH_FAILED,
    payload: error,
  };
};

export const teacherSendSuccess = () => {
  return {
    type: TEACHER_ACTION_TYPES.TEACHER_SEND_SUCCESS,
  };
};

export const teacherSendFailed = (error) => {
  return {
    type: TEACHER_ACTION_TYPES.TEACHER_SEND_FAILED,
    payload: error,
  };
};


export const onFetchingTeacher= () => {
    return (dispatch) => {
      dispatch(onFetching());
      axios
        .get(`http://localhost:5000/admin/teachers` , {headers: {Authorization: token,},})
        .then((res) => {
          
          if (res.status === 200) {
           
            dispatch(teacherFetchSuccess(res.data));
          } else {
          
            dispatch(teacherFetchFailed(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


 export const onAddingTeacher = (teacherData) => {
 return (dispatch) => {
      axios
        .post(`http://localhost:5000/admin/teachers`, teacherData, {headers: {Authorization: token,},} )
        .then((res) => {
        
          window.location.reload(true);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  

  export const onEditTeacher = (teacherData) => {
   
return dispatch => {
      axios.put(`http://localhost:5000/admin/teacher/${teacherData.id}`,teacherData, {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
       }).catch(err => {
         console.log(err)
       })
    }
  }
  
  export const onDeleteTeacher = (id) => {
 
    return dispatch => {
      axios.delete(`http://localhost:5000/admin/teacher/delete/${id}`,id , {headers: {Authorization: token,},})
       .then(res => {
        window.location.reload(true);
      
        console.log(res);

       }).catch(err => {
         console.log(err)
       })
    }
  }
  