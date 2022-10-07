import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isShowModal: false,
            isDropDownOpen: false,
            userLevels: [],
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            userLevel: 'User Level',
            isActive: false,
            userCreated: {}

        }
        this.showModalListener = this.showModalListener.bind(this);
        this.showDropDownListener = this.showDropDownListener.bind(this);
        this.selectValueDropDownListener = this.selectValueDropDownListener.bind(this);
        this.handleChangeModal = this.handleChangeModal.bind(this);
        this.checkBoxAddUserListener = this.checkBoxAddUserListener.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
        this.checkBoxDeleteUserListener = this.checkBoxDeleteUserListener.bind(this);
        this.deleteUsersSelectedListener = this.deleteUsersSelectedListener.bind(this);
    }

    showModalListener() {
        this.setState(prevState => ({
            isShowModal: !prevState.isShowModal
        }));
    }

    selectValueDropDownListener(e){
        this.setState({userLevel: e.currentTarget.textContent})
    }

    showDropDownListener() {
        this.setState(prevState => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    }

    checkBoxAddUserListener() {
        const checkBox = document.querySelector('#checkIsUserActive');
        this.setState({isActive:checkBox.checked});
    }

    deleteUsersSelectedListener(){
        const users = this.state.users;
        const filteredUsers = users.filter(user => !user.selectedToDelete);
        this.setState({users:filteredUsers});
        // console.log(filteredUsers);
    }

    checkBoxDeleteUserListener(event) {
        const object = event.target;
        const checkBox = document.querySelector('#'+object.id);
        const users = this.state.users;
        users.forEach(user => {
            if(user.id === Number(object.value)){
                user.selectedToDelete =checkBox.checked;
            }
        });
        // console.log(users.filter(user => user.selectedToDelete));
    }

    async getUsers(){
        const urlUsers = "http://localhost:8080/Online-Shop/webapi/application/users";

        const responseUsers = await fetch(urlUsers, {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        responseUsers.json().then(data => {
            for (let i = 0; i < data.length; i++) {
                this.setState(prevState => ({
                    users: [...prevState.users, data[i]]
                }));
            }
        });
    }

    async getUserLevel() {
        const urlUserLevels = "http://localhost:8080/Online-Shop/webapi/application/users/userlevel";

        const responseUserLevels = await fetch(urlUserLevels, {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        responseUserLevels.json().then(data => {
            const levels = data.dataResponse.userLevel;
            for (let i = 0; i < levels.length; i++) {
                this.setState(prevState => ({
                    userLevels: [...prevState.userLevels, levels[i]]
                }));
            }
        });
    }

    async componentDidMount() {
         await this.getUsers();
         await this.getUserLevel();
    }

    handleChangeModal(event) {
        const elementId = event.target.id;
        const value = event.target.value;
        switch (elementId) {
            case "firstName":
                this.setState({firstName: value});
                break;
            case "lastName":
                this.setState({lastName: value});
                break;
            case "userName":
                this.setState({userName: value});
                break;
            case "Password":
                this.setState({password: value});
                break;
            case "email":
                this.setState({email: value});
                break;
            default:
        }

    }

    async handleSubmitUser() {
       this.showModalListener();
       const user = this.getUserFromState();
       await this.postUser(user);
       this.setState({users:[]})
       await this.getUsers();
    }

    getUserFromState(){
        const password = document.getElementById('password').value;
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            password: password,
            email: this.state.email,
            userLevel: this.state.userLevel,
            isActive: this.state.isActive
        };
    }

    async postUser(user) {
        const url = "http://localhost:8080/Online-Shop/webapi/application/users/add";
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(user)
        });
        response.json().then(value => {
            if (value.success) {
                NotificationManager.success("User added");
            } else {
                NotificationManager.error("Error saving user", "Failed");
                console.log(value.message);
            }
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isShowModal} toggle={this.showModalListener} style={{width:'70%'}} >
                    <ModalHeader toggle={this.showModalListener}>Add User</ModalHeader>
                    <ModalBody>
                        <form >
                            <div className="mb-3">
                                <input id="firstName" type="text" className="form-control" placeholder="First Name"
                                       onChange={this.handleChangeModal}/>
                            </div>
                            <div className="mb-3">
                                <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                                       onChange={this.handleChangeModal}/>
                            </div>
                            <div className="mb-3">
                                <input id="userName" type="text" className="form-control" placeholder="User Name"
                                       onChange={this.handleChangeModal}/>
                            </div>
                            <div className="mb-3">
                                <input id="password" type="password" className="form-control" placeholder="Password"
                                       onChange={this.handleChangeModal}/>
                            </div>
                            <div className="mb-3">
                                <input id="email" type="email" className="form-control" placeholder="Email"
                                       onChange={this.handleChangeModal}/>
                            </div>

                            <Dropdown isOpen={this.state.isDropDownOpen} onChange={this.listener} toggle={this.showDropDownListener} direction={"down"}>
                                <DropdownToggle caret>{this.state.userLevel}</DropdownToggle>
                                <DropdownMenu >
                                    {
                                        this.state.userLevels.map(value => {
                                            return(
                                                <DropdownItem key={value} onClick={this.selectValueDropDownListener}>{value}</DropdownItem>
                                            );
                                        })
                                    }
                                </DropdownMenu>
                            </Dropdown>
                            <br/>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="checkIsUserActive" onChange={this.checkBoxAddUserListener}/>
                                    <label className="form-check-label" htmlFor="checkIsUserActive">Is Active?</label>
                            </div>


                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmitUser}>Add</Button>{' '}
                        <Button color="secondary" onClick={this.showModalListener}>Cancel</Button>
                    </ModalFooter>
                </Modal>
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
                            <button className="btn btn-primary" onClick={this.showModalListener} type="button">Add</button>
                            <button className="btn btn-danger" onClick={this.deleteUsersSelectedListener} type="button" style={{float:"right"}}>Delete</button>


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
                                <th scope="col"></th>
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
                                        <td><input className="form-check-input" type="checkbox" value={item.id}
                                                   id={"checkUser"+item.id} onChange={this.checkBoxDeleteUserListener}/></td>
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
