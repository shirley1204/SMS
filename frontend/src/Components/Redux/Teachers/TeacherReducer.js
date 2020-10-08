import { TEACHER_ACTION_TYPES } from "./TeacherAction";
import { DATA_STATE } from "../dataState";

const initialState = {
  teachers: null,
  error: null,
  dataState: DATA_STATE.NOT_INITIALIZED,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TEACHER_ACTION_TYPES.FETCHING:
      return {
        ...state,
        dataState: DATA_STATE.FETCHING,
      };
    case TEACHER_ACTION_TYPES.TEACHER_FETCH_SUCCESS:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_SUCCESS,
        teachers: action.payload,
      };
    case TEACHER_ACTION_TYPES.TEACHER_FETCH_FAILED:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_FAILED,
        error: action.payload,
      };
      case TEACHER_ACTION_TYPES.TEACHER_UPDATE_SUCCESS:
      return {
        ...state,
        dataState:DATA_STATE.SEND_SUCCESS,
        teachers:[...state.teachers, action.payload]
      };
    default:
      return state;
  }
}