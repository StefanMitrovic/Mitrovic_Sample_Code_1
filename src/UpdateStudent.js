import React from 'react';
import {connect} from 'react-redux';
import { updateStudent } from './store';

class UpdateStudent extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            firstName: this.props.student ? this.props.student.firstName : '',
            lastName: this.props.student ? this.props.student.lastName : '',
            gpa: this.props.student ? this.props.student.gpa : '',
            email: this.props.student ? this.props.student.email : '',
            campusId: this.props.student ? this.props.student.campusId : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(ev){
        ev.preventDefault();
        const newStudent = this.state
        this.props.updateStudent(this.props.student.id, newStudent);
    }
    handleChange(ev) {
        this.setState({[ev.target.name] : ev.target.value})
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.student && this.props.student){
            this.setState= {
                firstName: this.props.student.firstName,
                lastName: this.props.student.lastName,
                gpa: this.props.student.gpa,
                email: this.props.student.email,
                campusId: this.props.student.campusId
            }
        }
    }
    render() {
        const { firstName, lastName, gpa, email, campusId} = this.state;
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
                    <button disabled={!firstName || !lastName || !email}>update Student</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state, otherProps) => {
    const student = state.students.find(student => student.id === (otherProps.match.params.id*1));
    const campuses = state.campuses
    return {
        student,
        campuses
    };
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateStudent: (id, newStudent) => dispatch(updateStudent(id, newStudent, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent)