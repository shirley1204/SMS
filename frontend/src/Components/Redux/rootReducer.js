import {combineReducers} from 'redux'
import authReducer from './Authentication/AuthReducer'
import ResourceReducer from './Resources/ResourceReducer'
import StudentReducer from './Students/StudentReducer'
import TeacherReducer from './Teachers/TeacherReducer'

export default combineReducers({
    auth:authReducer,
    resource:ResourceReducer,
    student:StudentReducer,
    teacher:TeacherReducer,
})