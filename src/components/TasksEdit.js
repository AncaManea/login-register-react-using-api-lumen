import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

export default class TasksEdit extends Component {

    state = {
        tasks: [],
        name: '',
        description: '',
        status: '',
        user_id: sessionStorage.getItem('user_id'),
        assign: '',
    };

    _onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    async componentDidMount() {
        //Setez token-ul ca fiind cel primit la login
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token');
        //Trimit request-ul catre url
        let tasks = await axios.get('http://api-tasks.project/v1/task/get/' + this.props.match.params.id);
        console.log(tasks);
        this.setState({ 
            tasks: tasks.data.data,
            name: tasks.data.data.name,
            description: tasks.data.data.description,
            status: tasks.data.data.status,
            assign: tasks.data.data.assign
        });
       

    }

    _logout = () => {
        sessionStorage.removeItem('token');

        this.props.history.push('/');
    };


    _edit = async (id) => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token');
        const { name, description, status, user_id, assign } = this.state;
       
        const response = await axios.post('http://api-tasks.project/v1/task/edit/' + id, {
            name, description, status, user_id, assign
        });
     
        //Verific daca primesc raspuns
        if (response.data.errorMessage === null) {
            // console.log(response);
            this.refs.success.innerHTML = "Successfully edited";
        }
        else {
            //Afisam eroarea
            this.refs.success.innerHTML = response.data.errorMessage;
        }

    };



    render() {
      
        const { tasks, name, description, status, user_id, assign } = this.state;

        return (
            <div>
                <table border="1" align="center">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Assigned to</th>
                            <th>Assiger</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                                    <tr id={tasks.id}>
                                        <td>{tasks.name}</td>
                                        <td>{tasks.description}</td>
                                        <td>{tasks.status == 0 ? 'Unfinished' : 'Finished'}</td>
                                        <td>{tasks.assign}</td>
                                        <td>{tasks.user_id}</td>
                                      
                                    </tr>
                    
                    </tbody>
                </table>

                <p>Edit Task!</p>
                <span ref='success'></span>
                <br />
                <input type={'hidden'} name={'user_id'} value={user_id} onChange={this._onChange} />
                Name: <input ref='name' type={'text'} name={'name'} value={name} onChange={this._onChange} />
                <br />
                Description: <input ref='description' type={'text'} name={'description'} value={description} onChange={this._onChange} />
                <br />
                Status(0 - Unfinished, 1 - Finished): <input ref='status' id="status" ref='status' name={'status'} value={status} onChange={this._onChange} />
                <br />
                Assign to: <input ref='assign' name={'assign'} type={'text'} value={assign} onChange={this._onChange} />
                <br />
                <button value={tasks.id} onClick={() => this._edit(tasks.id)}>Edit task</button>
            </div>
        )
    }
}
