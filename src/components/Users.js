import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

export default class Users extends Component {
    state = {
        users: []
    };
 
    async componentDidMount() {
        //Setez token-ul ca fiind cel primit la login
        axios.defaults.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token');
        //Trimit request-ul catre url
        let users = await axios.get('http://api-tasks.project/v1/user/info');/*.then(response => {
            console.log(response)
        })
            .catch(error => {
                console.log(error.response)
            }); */
           // console.log(users.data);
        this.setState({users: users.data});
    
    }

    _logout = () => {
        sessionStorage.removeItem('token');

        this.props.history.push('/');
    };

    render() {
        if (!sessionStorage.getItem('token')) {
            return <Redirect to={'/login'}/>
        }
       
        const {users} = this.state;
      //  console.log(users.data);
      // Parsez ce am primit
        const lista = users.map((user, key) =>
            <li key={key}>Email: {user.email} - 
                Name: {user.name}</li>)
        return (
            <Fragment>
                <h1>All users:</h1>
                <ul>
                    {lista}
                </ul>
                <p>Return <Link to={'/'}>Home</Link>.</p>
                <button onClick={this._logout}>Logout</button>
            </Fragment>
        )
    }
}
