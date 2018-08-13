import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

export default class Tasks extends Component {
 
    state = {
        tasks: [],
        name:'',
        description: '',
        status:'',
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
        let tasks = await axios.get('http://api-tasks.project/v1/task/getall');/*.then(response => {
            console.log(response)
        })
            .catch(error => {
                console.log(error.response)
            });  */
        // console.log(users.data);
        this.setState({ tasks: tasks.data.data });
        console.log(tasks.data.data);

    } 

    _logout = () => {
        sessionStorage.removeItem('token');

        this.props.history.push('/');
    };


    _add = async () => {
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token');
        const { name, description, status, user_id, assign } = this.state;
        //Trimit catre register
        const response = await axios.post('http://api-tasks.project/v1/task/add', {
            name, description, status, user_id, assign
        });

        console.log(user_id + " " + status + " " + name + " " + description + " " + assign);
        /*Resetez inputurile
        this.refs.name.value = '';
        this.refs.email.value = '';
        this.refs.password.value = '';
        **/
        //Verific daca primesc raspuns
        if (response.data.errorMessage === null) {
            // console.log(response);
            this.refs.success.innerHTML = "Successfully posted";
        }
        else {
            //Afisam eroarea
            this.refs.success.innerHTML = response.data.errorMessage;
        }

        // this.props.history.push('/register');

    };



    _delete = async (id) => {
         axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token');
    
        //Trimit catre delete
        const response = await axios.get('http://api-tasks.project/v1/task/delete/' + id);

      
        //Verific daca primesc raspuns
        if (response.data.errorMessage === null) {
            // console.log(response);
            this.refs.success.innerHTML = "Successfully Deleted";
        }
        else {
            //Afisam eroarea
            this.refs.success.innerHTML = response.data.errorMessage;
        }

        var x = document.getElementById(id);
        x.style.display = "none";
      
    };

    _edit = async (id) => {
        this.props.history.push('/tasks/edit/' + id);
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, key) =>  {return (
                        <Fragment key={key}>
                            <tr id={task.id}>
                                <td>{task.name}</td>
                                <td>{task.description}</td>
                                <td>{task.status == 0 ? 'Unfinished' : 'Finished'}</td>
                                <td>{task.assign}</td>
                                <td>{task.user_id}</td>
                                <td> <button value={task.id} onClick={() =>this._delete(task.id)}>Delete</button> | <button value={task.id} onClick={() => this._edit(task.id)}>Edit</button></td>
                            </tr>
                        </Fragment>); })}
                    </tbody>
                </table>
          
                <p>Add a new task!</p>
                <span ref='success'></span>
                <br />
                <input type={'hidden'} name={'user_id'} value={user_id} onChange={this._onChange}  />
                Name: <input ref='name' type={'text'} name={'name'} value={name} onChange={this._onChange} />
                <br />
                Description: <input ref='description' type={'text'} name={'description'} value={description} onChange={this._onChange} />
                <br />
                Status(0 - Unfinished, 1 - Finished): <input ref='status' id="status" ref='status' name={'status'} onChange={this._onChange}/>
                <br />
                Assign to: <input ref='assign' name={'assign'} type={'text'} value={assign} onChange={this._onChange} />
                <br />
                <button onClick={this._add}>Add task</button>
            </div>
        )
    }
}
/*<select ref='status' id="status" ref={(input) => this.menu = input} name={'status'} onChange={this._onChange}>
<option value={status}>Unfinished</option>
    <option value={status}>Finished</option>
                </select >*/