import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteCampus } from './store';
import CreateCampus from './CreateCampus';

const CampusList = ({campuses, deleteCampus}) =>{
    return (
        <div>
            <CreateCampus />
            <ul>
                {campuses.map(campus => {
                    return (
                        <li key={campus.id}>
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                            <button onClick={() => deleteCampus(campus)}>Furlough University</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCampus: async(campus) => {
            await dispatch(deleteCampus(campus))
        }
    }
}
export default connect(state => state, mapDispatchToProps)(CampusList)