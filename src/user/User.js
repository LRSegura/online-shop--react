import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8080/Online-Shop/webapi/application/users";

        const response = await fetch(url, {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        response.json().then(data => {
            const users = [];
            for (let i = 0; i < data.length; i++) {
                users.push(data[i]);
                this.setState(prevState => ({
                    users: [...prevState.users, data[i]]
                }));
            }
            // console.log(this.state.products);
            console.log(users);
        });
    }

    // handleChange(event) {
    //     if (event.target.id === "username") {
    //         this.setState({userName: event.target.value});
    //     }
    //     if (event.target.id === "password") {
    //         this.setState({password: event.target.value});
    //     }
    // }
    //
    // async handleSubmit(event) {
    //     event.preventDefault();
    //     const usernameParam = this.state.userName;
    //     const passwordParam = this.state.password;
    //     const url = "http://localhost:8080/Online-Shop/webapi/application/login?" + new URLSearchParams({
    //         username: usernameParam,
    //         password: passwordParam
    //     })
    //
    //     const response = await fetch(url, {
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         credentials: 'omit',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         redirect: 'follow',
    //         referrerPolicy: 'no-referrer',
    //         // body: JSON.stringify(data)
    //     });
    //     response.json().then(value => {
    //         console.log(value);
    //         if (value.success) {
    //             NotificationManager.success("Success");
    //         } else {
    //             NotificationManager.error(value.message, "Failed");
    //         }
    //     });
    // }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-md-5">
                            <input className="form-control" type="text" placeholder="Search User"
                                   aria-label="default input example" style={{width:"100%"}}/>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" type="button">Add</button>
                            <button className="btn btn-danger" type="button" style={{float:"right"}}>Delete</button>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead>
                            <tr>
                                {/*{heading.map(head => <th>{head}</th>)}*/}

                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">User Name</th>
                                <th scope="col">User Level</th>
                                <th scope="col">Is active?</th>
                                <th scope="col">Register Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td>{ item.firstName }</td>
                                        <td>{ item.lastName }</td>
                                        <td>{ item.userName }</td>
                                        <td>{ item.userLevel }</td>
                                        <td>{ item.isActive }</td>
                                        <td>{ item.registerDate }</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <NotificationContainer/>
            </div>
        );
    }

}

export default User;
