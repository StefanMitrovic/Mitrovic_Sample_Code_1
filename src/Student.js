import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Student = ({students, campuses, match})=>{
    return (
        <div>
            {students.filter((student) => student.id === match.params.id*1)
            .map((student=>{
                return (
                    <div>
                        <li>Student First Name: {student.firstName}</li>
                        <li>Student Last Name: {student.lastName}</li>
                        <li>Student GPA: {student.gpa}</li>
                        <li>Student Email: {student.email}</li>
                        <h5>Currently Attending: </h5>
                        {campuses.filter((campus) => campus.id === student.campusId)
                        .map((campus) => {
                            return (
                                <div>
                                    <li>
                                        <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                                    </li>
                                </div>
                            )
                        })}
                        <Link to={`/students/${student.id}/update`}><button>Update Student</button></Link>
                    </div>
                )
            }))}
        </div>
    )
}

export default connect((state) => state)(Student)