import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteStudent } from './store';
import CreateStudent from './CreateStudent';

const StudentList = ({students, deleteStudent}) => {
    return(
        <div>
            <CreateStudent />
            <ul>
                {students.map(student => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                            <button onClick ={() => deleteStudent(student)}>Delete Student</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: async(student) => {
            await dispatch(deleteStudent(student))
        }
    }
}

export default connect(state => state, mapDispatchToProps)(StudentList);