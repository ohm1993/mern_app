import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class MentorList extends Component {
    constructor(props) {
        super(props);
        this.deleteMentor = this.deleteMentor.bind(this);
        this.state = {
            mentors: [],
            pager: {}
        };
    }
    componentDidMount() {
        this.loadPage();
    }
    loadPage() {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
         axios.get(`/api/mentor/getall?page=${page}`)
         .then(res => {
            this.setState({ mentors: res.data.mentors, pager: res.data.pager });
          });
        }else{
            axios.get(`/api/mentor/getall`)
            .then(res => {
               this.setState({ mentors: res.data.mentors, pager: res.data.pager });
            });
        } 
    }
    componentDidUpdate() {
        this.loadPage();
    }
    deleteMentor(id) {
        axios.delete('/api/mentor/'+id)
        .then(res => {   
            if(res.status == 200){
                this.loadPage();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
            <h3 align="center">Mentors List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.mentors.map((mentor,index) =>
                    <tr>
                        <td>{index+1}</td>
                        <td>{mentor.mentor_name}</td>
                        <td>{mentor.mentor_email}</td>
                        <td>{mentor.mentor_contact}</td>
                        <td>{mentor.mentor_company}</td>
                        <td><Link to={`/edit/${mentor._id}`} class="btn btn-primary">Edit</Link></td>   
                        <td><button class="btn btn-danger" onClick={() =>this.deleteMentor(mentor._id)}>Delete</button></td>
                        <td><Link to={`/task/${mentor._id}`} class="btn btn-info">Tasks</Link></td>
                       
                    </tr>
                   )}
                </tbody>
            </table>
            <div className="card-footer pb-0 pt-3">
                    {this.state.pager.pages && this.state.pager.pages.length &&
                        <ul className="pagination">
                            <li className={`page-item first-item ${this.state.pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                            </li>
                            <li className={`page-item previous-item ${this.state.pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${this.state.pager.currentPage - 1}` }} className="page-link">Previous</Link>
                            </li>
                            {this.state.pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${this.state.pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${this.state.pager.currentPage === this.state.pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${this.state.pager.currentPage + 1}` }} className="page-link">Next</Link>
                            </li>
                            <li className={`page-item last-item ${this.state.pager.currentPage === this.state.pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${this.state.pager.totalPages}` }} className="page-link">Last</Link>
                            </li>
                        </ul>
                    }                    
            </div>
        </div>
        )
    }
}