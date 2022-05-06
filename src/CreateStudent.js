import React from 'react';
import {connect} from 'react-redux';
import { createStudent } from './store';

class CreateStudent extends React.Component{
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            gpa: '',
            email: '',
            campusId: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitForm(ev){
        ev.preventDefault();
        this.props.createStudent(this.state);
        this.setState({
            firstName: '',
            lastName: '',
            gpa: '',
            email: '',
            campusId: ''
        });
    }
    handleChange(ev) {
        this.setState({[ev.target.name] : ev.target.value})
    }
    render() {
        const {firstName, lastName, gpa, email, campusId} = this.state;
        const {handleChange} = this;
        return(
            <form onSubmit={this.submitForm}>
                <div>
                    <input
                        name='firstName'
                        value={firstName}
                        placeholder='First Name'
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        name='lastName'
                        value={lastName}
                        placeholder='Last Name'
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        name='gpa'
                        type='number'
                        value={gpa}
                        placeholder='GPA (0.00-4.00)'
                        onChange={ev=> this.setState({gpa: ev.target.valueAsNumber})}
                    >
                    </input>
                    <input
                        name='email'
                        value={email}
                        placeholder='valid email'
                        onChange={handleChange}
                    >
                    </input>
                    <select 
                        name='campusId'
                        value={campusId} 
                        onChange={handleChange}
                    >
                        <option value=''>Campus</option>
                        {this.props.campuses.map (campus => (
                            <option value={campus.id}>{campus.name}</option>
                        ))}
                    </select>
                    <button disabled={!firstName || !lastName || !email}>Enroll Student</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStudent: (newStudent) => dispatch(createStudent(newStudent))
    }
}

export default connect(state => state, mapDispatchToProps)(CreateStudent)