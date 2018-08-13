import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    _register = async () => {
        const { name, email, password } = this.state;
        //Trimit catre register
        const response = await axios.post('http://api-tasks.project/v1/register', {
            name, email, password
        });


        //Resetez inputurile
        this.refs.name.value = '';
        this.refs.email.value = '';
        this.refs.password.value = '';

        //Verific daca primesc raspuns
        if (response.data.errorMessage === null)
        {
           // console.log(response);
            this.refs.success.innerHTML = "Successfully registered";
        }
        else
        {
            //Afisam eroarea
            this.refs.success.innerHTML = response.data.errorMessage;
        }
     
       // this.props.history.push('/register');
     
    };

    render() {
        const { name, email, password } = this.state;

        return (
            <div>
                <p>Hello, welcome to register page!</p>
                <span ref='success'></span>
                <br/>
                Name:<input ref='name' type={'text'} name={'name'} value={name} onChange={this._onChange} />
                <br/>
                Email:<input ref='email' type={'text'} name={'email'} value={email} onChange={this._onChange} />
                <br/>
                Password:<input ref='password' type={'password'} name={'password'} value={password} onChange={this._onChange} />
                <br/>
                <button onClick={this._register}>Register</button>
            </div>
        )
    }
}
