import React, { Component } from 'react';
import axios from 'axios';
export default class CreateMentor extends Component {
    constructor(props) {
        super(props);
        this.onChangeMentorName = this.onChangeMentorName.bind(this);
        this.onChangeMentorEmail = this.onChangeMentorEmail.bind(this);
        this.onChangeMentorContact = this.onChangeMentorContact.bind(this);
        this.onChangeMentorCompany = this.onChangeMentorCompany.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            mentor_name: '',
            mentor_email: '',
            mentor_contact: '',
            mentor_company: ''
        }
    }

    onChangeMentorName(e) {
        this.setState({
            mentor_name: e.target.value
        });
    }
    onChangeMentorEmail(e) {
        this.setState({
            mentor_email: e.target.value
        });
    }
    onChangeMentorContact(e) {
        this.setState({
            mentor_contact: e.target.value
        });
    }
    onChangeMentorCompany(e) {
        this.setState({
            mentor_company: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newMentor = {
            mentor_name: this.state.mentor_name,
            mentor_email: this.state.mentor_email,
            mentor_contact: this.state.mentor_contact,
            mentor_company: this.state.mentor_company
          };
        if(this.state.mentor_name && this.state.mentor_email && this.state.mentor_contact && this.state.mentor_company) {
           if(newMentor.mentor_contact.length == 10){
            axios.post('/api/mentor/register', newMentor)
            .then((result) => {
              if(result.status == 200){
                  alert("mentor created successfully");
                this.props.history.push("/")
              }
            })
            .catch(error => {
                alert("email already exist");
            });
           }else{
               alert("contact length must be 10 digits")
           }
        }else{
            alert("fill all the details");
        }
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Mentor</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.mentor_name}
                                onChange={this.onChangeMentorName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="email" 
                                className="form-control"
                                value={this.state.mentor_email}
                                onChange={this.onChangeMentorEmail}
                                />
                    </div>
                    <div className="form-group">
                    <label>Contact: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.mentor_contact}
                                onChange={this.onChangeMentorContact}
                                />
                    </div>
                    <div className="form-group">
                    <label>Company: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.mentor_company}
                                onChange={this.onChangeMentorCompany}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}