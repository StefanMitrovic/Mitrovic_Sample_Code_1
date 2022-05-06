import React from 'react';
import {connect} from 'react-redux';
import { updateCampus } from './store';

class UpdateCampus extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            name: this.props.campus ? this.props.campus.name : '',
            imageUrl: this.props.campus ? this.props.campus.imageUrl : '',
            address: this.props.campus ? this.props.campus.address : '',
            description: this.props.campus ? this.props.campus.description : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(ev){
        ev.preventDefault();
        const newCampus = this.state
        this.props.updateCampus(this.props.id, newCampus);
    }
    handleChange(ev) {
        this.setState({[ev.target.name] : ev.target.value})
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.campus && this.props.campus){
            this.setState= {
                name: this.props.campus.name,
                imageUrl: this.props.campus.imageUrl,
                address: this.props.campus.address,
                description: this.props.campus.description
            }
        }
    }
    render() {
        const {name, imageUrl, address, description} = this.state;
        const {handleChange} = this;
        return(
            <div>
                <h1>Campus Update Page</h1>
                <form onSubmit={this.submitForm}>
                    <div>
                        <input 
                            name="name"
                            value= {name}
                            placeholder="Campus Name"
                            onChange={handleChange}
                        >
                        </input>
                        <input 
                            name="imageUrl"
                            value={imageUrl}
                            placeholder="Insert a URL containing an image of the new campus"
                            onChange={handleChange}
                        >
                        </input>
                        <input 
                            name="address"
                            value={address}
                            placeholder="Address"
                            onChange={handleChange}
                        >
                        </input>
                        <input 
                            name="description"
                            value={description}
                            placeholder="Add a short description of the new campus"
                            onChange={handleChange}
                        >
                        </input>
                        <button disabled={ !name || !address}>update</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, otherProps)=> {
    const campus = state.campuses.find(campus => campus.id === (otherProps.match.params.id*1));
    return campus;
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateCampus: (id, newCampus) => dispatch(updateCampus(id, newCampus, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);