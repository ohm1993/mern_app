import React, { Component } from 'react';
import axios from 'axios';
export default class MentorTask extends Component {
      constructor(props) {
        super(props);
        this.onChangeTaskName = this.onChangeTaskName.bind(this);
        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          tasks: [],
          task_name: "",
          task_description: ''
        };
      }
      onChangeTaskName(e) {
        this.setState({
            task_name: e.target.value
        });
     }
     onChangeTaskDescription(e){
         this.setState({
            task_description: e.target.value 
         })
     }
      componentDidMount() {
            this.loadPage();
      }
      loadPage() {
        axios.get('/api/task/'+this.props.match.params.id)
        .then(res => {
            this.setState({ tasks: res.data});
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newTask = {
            task_mentor_id: this.props.match.params.id,
            task_name: this.state.task_name,
            task_description: this.state.task_description
        };
        axios.post('/api/task/create', newTask)
        .then((result) => {
          if(result.status == 200){
            alert("Task added successfully");  
            this.props.history.push("/")
          }
        })
        .catch(error => {
           console.log("error is",error);
        });
        console.log("new task value is",newTask);  
    }
    deleteTask(id) {
        axios.delete('/api/task/'+id)
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
                <h3 align="center">Task List</h3>   
                <form className="row" onSubmit={this.onSubmit}>
                    <div className="form-group col-md-3"> 
                        <label>Task Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.task_name}
                                onChange={this.onChangeTaskName}
                        />
                    </div>
                    <div className="form-group col-md-6"> 
                        <label>Task Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.task_description}
                                onChange={this.onChangeTaskDescription}
                        />
                    </div>
                    <div className="form-group col-md-2 addbutton">
                      <button className="btn btn-primary" disabled={!this.state.task_name && !this.state.task_description}>{"Add Task #" + (this.state.tasks.length + 1)}</button>
                    </div>
                </form>
                {!!(this.state.tasks.length > 0)?
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Task Name</th>
                            <th>Task Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tasks.map((task,index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{task.task_name}</td>
                            <td>{task.task_description}</td>
                            <td><button class="btn btn-danger btn-xs" onClick={() =>this.deleteTask(task._id)}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>:<div class="alert alert-danger">
                     No Tasks
                    </div>}
          </div>
        )
    }
}