import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import axios from 'axios';

//Action Types

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//Thunks

export const loadCampuses = () => {
    return async (dispatch) => {
        const campuses = (await axios.get('/api/campuses')).data;
        dispatch({type: LOAD_CAMPUSES, campuses})
    }
}

export const deleteCampus = (campus) => {
    return async (dispatch) =>{
        await axios.delete(`api/campuses/${campus.id}`)
        dispatch({type: DELETE_CAMPUS, campus})
    }
}

export const createCampus = (newCampus) => {
    return async(dispatch) => {
        const campus = (await axios.post('/api/campuses', newCampus)).data
        dispatch({type: CREATE_CAMPUS, campus})
    }
}

export const updateCampus = (id, campus, history) => {
    return async (dispatch) => {
        const updatedCampus = (await axios.put(`/api/campuses/${id}`, campus)).data;
        dispatch({type: UPDATE_CAMPUS, updatedCampus})
        history.push(`/campuses/${id}`)
    }
}

export const loadStudents = () => {
    return async (dispatch) => {
        const students = (await axios.get('/api/students')).data;
        dispatch({type: LOAD_STUDENTS, students})
    }
}

export const deleteStudent = (student) => {
    return async (dispatch) =>{
        await axios.delete(`api/students/${student.id}`)
        dispatch({type: DELETE_STUDENT, student})
    }
}

export const createStudent = (newStudent) => {
    return async(dispatch) => {
        const student = (await axios.post('/api/students', newStudent)).data
        dispatch({type: CREATE_STUDENT, student})
    }
}

export const updateStudent = (id, student, history) => {
    return async (dispatch) => {
        const updatedStudent = (await axios.put(`/api/students/${id}`, student)).data;
        dispatch({type: UPDATE_STUDENT, updatedStudent})
        history.push(`/students/${id}`)
    }
}
//Reducer

const campusReducer = (state = [], action) => {
    if (action.type === LOAD_CAMPUSES){
        return action.campuses;
    }
    if (action.type === DELETE_CAMPUS){
        return state.filter((item) => item.id !== action.campus.id)
    }
    if (action.type === CREATE_CAMPUS){
        return [...state, action.campus];
    }
    if (action.type === UPDATE_CAMPUS){
        return state.map((campus) => (campus.id !== action.updatedCampus.id ? campus : action.updatedCampus))
    }
    return state;
}

const studentReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        return action.students;
    }
    if(action.type === DELETE_STUDENT){
        return state.filter((item) => item.id !== action.student.id)
    }
    if(action.type === CREATE_STUDENT){
        return [...state, action.student]
    }
    if (action.type === UPDATE_STUDENT){
        return state.map((student) => (student.id !== action.updatedStudent.id ? student : action.updatedStudent))
    }
    return state;
}

const reducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer
})

//Store

const store = createStore(reducer, applyMiddleware(thunk));

export default store;