import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';

const Campus = ({campuses, students, match})=>{
    return (
        <div>
            {campuses.filter((campus) => campus.id === match.params.id*1)
            .map((campus => {
                return (
                    <div>
                        <li>Campus Name: {campus.name}</li>
                        <li>Campus Address: {campus.address}</li>
                        <li>Campus Description: {campus.description}</li>
                        <h5>Attending Students</h5>
                        {students.filter((student) => student.campusId === campus.id)
                        .map((student) => {
                            return (
                                <div>
                                    <li>
                                        <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                                    </li>
                                </div>
                            )
                        })}
                        <Link to={`/campuses/${campus.id}/update`}><button>Update Campus</button></Link>
                    </div>
                )
            }))}
        </div>
    )
}
export default connect(state => state)(Campus)
