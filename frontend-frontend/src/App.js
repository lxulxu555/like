import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/login/login'


export default class App extends Component{
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path= '/login' component={Login} />
                    <Route path='/' component={HomePage}  />
                </Switch>
            </BrowserRouter>
        )
    }
}

