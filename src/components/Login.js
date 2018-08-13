import React, {Component} from 'react';
import axios from 'axios';

export default class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    _onChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    };

    _login = async () => {
        const {email, password} = this.state;

        const response = await axios.post('http://api-tasks.project/v1/login', {
            email, password
        });

        if (response && response.data && response.data.data) {
            //old code  sessionStorage.setItem('token', response.data.data.token);
            //response.data.data.token nu este definit, php intoarce cu numele jwt
            sessionStorage.setItem('token', response.data.data.jwt);
            sessionStorage.setItem('user_id', response.data.data.user.id);
            this.props.history.push('/users');
          //  console.log(response.data.data.user.id); 
        } else {
            //afisam eroare
            this.refs.success.innerHTML = response.data.errorMessage;
        }
    };

    render() {
        const {email, password} = this.state;

        return (
            <div>
                <p>Hello, login!</p>
                <span ref='success'></span>
                <br/>
                Email:<input type={'text'} name={'email'} value={email} onChange={this._onChange} />
                <br/>
                Password:<input type={'password'} name={'password'} value={password} onChange={this._onChange} />
                <br/>
                <button onClick={this._login}>Login</button>
            </div>
        )
    }
}
