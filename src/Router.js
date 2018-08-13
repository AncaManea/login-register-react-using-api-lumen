import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Users from './components/Users';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import TasksEdit from './components/TasksEdit';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/tasks" component={Tasks} />
                    <Route exact path="/tasks/edit/:id" component={TasksEdit} />
                </Switch>
            </BrowserRouter>
        );
    }
}
