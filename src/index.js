import React from 'react';
import { render } from 'react-dom';
import CampusList from './AllCampuses';
import Campus from './Campus';
import {Provider, connect} from 'react-redux';
import store from './store';
import { loadCampuses, loadStudents } from './store';
import {HashRouter, Link, Route} from 'react-router-dom';
import StudentList from './AllStudents';
import Student from './Student';
import UpdateCampus from './UpdateCampus';
import UpdateStudent from './UpdateStudent';

class _App extends React.Component{
    componentDidMount(){
            this.props.loadCampuses();
            this.props.loadStudents();
    }
    render() {
        return (
            <div>
                <nav className='navContainer'>
                    <Link to='/campuses'><button id='test'>Campus List</button></Link>
                    <Link to='/students'><button>Student List</button></Link>
                </nav>
                <Route exact path='/campuses' component={CampusList} />
                <Route exact path='/campuses/:id' component={Campus} />
                <Route exact path='/students' component={StudentList} />
                <Route exact path='/students/:id' component={Student} />
                <Route exact path='/campuses/:id/update' component={UpdateCampus} />
                <Route exact path='/students/:id/update' component={UpdateStudent} />
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) =>{
    return {
        loadCampuses: () => {
            dispatch(loadCampuses());
        },
        loadStudents: () => {
            dispatch(loadStudents());
        }
    }
}


const App = connect((state) => state, mapDispatchToProps)(_App);

render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, 
    document.querySelector('#root'));
