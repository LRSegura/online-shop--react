import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Navigation} from "../navegacion/Navegation";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isLoggingSuccess: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.id === "username") {
            this.setState({userName: event.target.value});
        }
        if (event.target.id === "password") {
            this.setState({password: event.target.value});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const usernameParam = this.state.userName;
        const passwordParam = this.state.password;
        const url = "http://localhost:8080/Online-Shop/webapi/application/login?" + new URLSearchParams({
            username: usernameParam,
            password: passwordParam
        })

        const response = await fetch(url, {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            // body: JSON.stringify(data)
        });
        response.json().then(value => {
            console.log(value);
            if (value.success) {
                this.setState({isLoggingSuccess: true});
            } else {
                NotificationManager.error(value.message, "Failed");
            }
        });
    }

    render() {
        if(this.state.isLoggingSuccess){
            return (<Navigation/>);
        }
        return (
            <div>
                <div className="container" style={{marginTop: '10%'}}>
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mb-3">
                                            <h1>Logging</h1>
                                        </div>
                                        <div className="mb-3">
                                            <input id="username" type="text" className="form-control" placeholder="User Name"
                                                   onChange={this.handleChange}/>
                                        </div>
                                        <div className="mb-3">
                                            <input id="password" type="password" className="form-control" placeholder="Password"
                                                   onChange={this.handleChange}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }
}

export default Login;
//boostrap, notification, navigation
//npm install react-bootstrap bootstrap
//npm install --save react-notifications
//npm install react-router-dom --save
//npm install --save reactstrap react react-dom