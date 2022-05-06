import React from 'react';
import {connect} from 'react-redux';
import { createCampus } from './store';

class CreateCampus extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
            imageUrl: '',
            address: '',
            description: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitForm(ev){
        ev.preventDefault();
        this.props.createCampus(this.state);
        this.setState({
            name: '',
            imageUrl: '',
            address: '',
            description: ''
        })
    }
    handleChange(ev) {
        this.setState({[ev.target.name] : ev.target.value})
    }
    render() {
        const {name, imageUrl, address, description} = this.state;
        const {handleChange} = this;
        return(
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
                    <button disabled={ !name || !address}>create</button>
                </div>
            </form>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createCampus: (newCampus) => dispatch(createCampus(newCampus))
    }
}

export default connect(state=> state, mapDispatchToProps)(CreateCampus)