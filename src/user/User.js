import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import UserDataTable from "./UserDataTable";
import AddUSerModal from "./AddUSerModal";

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
            userCreated: {},
            userSet: new Set()
        }
        this.showModalListener = this.showModalListener.bind(this);
        this.showDropDownListener = this.showDropDownListener.bind(this);
        this.selectValueDropDownListener = this.selectValueDropDownListener.bind(this);
        this.handleChangeModal = this.handleChangeModal.bind(this);
        this.checkBoxAddUserListener = this.checkBoxAddUserListener.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
        this.checkBoxDeleteUserListener = this.checkBoxDeleteUserListener.bind(this);
        this.deleteUsersSelectedListener = this.deleteUsersSelectedListener.bind(this);
        this.filterDataTable = this.filterDataTable.bind(this);
    }

    showModalListener() {
        this.setState(prevState => ({
            isShowModal: !prevState.isShowModal
        }));
    }

    selectValueDropDownListener(e) {
        this.setState({userLevel: e.currentTarget.textContent})
    }

    showDropDownListener() {
        this.setState(prevState => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    }

    checkBoxAddUserListener() {
        const checkBox = document.querySelector('#checkIsUserActive');
        this.setState({isActive: checkBox.checked});
    }

    async deleteUsersSelectedListener() {
        const userSet = this.state.userSet;
        const usersToDelete = [];

        userSet.forEach(value => {
            if(value.selectedToDelete){
                usersToDelete.push(value);
            }
        })

        const idUsersToDelete = [];
        for (const usersToDeleteElement of usersToDelete) {
            userSet.delete(usersToDeleteElement);
            idUsersToDelete.push(usersToDeleteElement.id);
        }
        const users = [];

        userSet.forEach(value => users.push(value));
        this.setState({users: users});
        const obj = {
            usersId: idUsersToDelete
        }
        await this.deleteUsers(obj);
    }

    async deleteUsers(user) {
        const url = "http://localhost:8080/Online-Shop/webapi/application/users/delete";
        const response = await fetch(url, {
            method: 'DELETE',
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
                NotificationManager.success("User deleted");
            } else {
                NotificationManager.error("Error deleting user", "Failed");
                console.log(value.message);
            }
        });
    }

    checkBoxDeleteUserListener(event) {
        const object = event.target;
        const checkBox = document.querySelector('#' + object.id);
        const users = this.state.users;
        users.forEach(user => {
            if (user.id === Number(object.value)) {
                user.selectedToDelete = checkBox.checked;
            }
        });
    }

    async getUsers() {
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
            const userArray = [];
            const userSet = new Set();
            for (let i = 0; i < data.length; i++) {
                userSet.add(data[i]);
            }
            this.setState({userSet:userSet})
            userSet.forEach(value => userArray.push(value))
            this.setState({users:userArray})
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
        this.setState({users: []})
        await this.getUsers();
    }

    getUserFromState() {
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

    filterDataTable(event){
        const value = event.target.value;
        const userSet = this.state.userSet;
        if(value.length !== 0){
            const filteredUsers = [];
            userSet.forEach(user => {
                if(user.firstName.toLowerCase() === value.toLowerCase()
                        || user.lastName.toLowerCase() === value.toLowerCase() || user.userName.toLowerCase() === value.toLowerCase()
                        || user.userLevel.toLowerCase() === value.toLowerCase()){
                    filteredUsers.push(user);
                }
            });
            this.setState({users:filteredUsers});
        } else {
            const userArray = [];
            userSet.forEach(user => userArray.push(user));
            this.setState({users:userArray});
        }
    }

    render() {
        return (
            <div>
                <AddUSerModal isShowModal={this.state.isShowModal} showModalListener={this.showModalListener}
                              handleChangeModal={this.handleChangeModal} isDropDownOpen={this.state.isDropDownOpen}
                              showDropDownListener={this.showDropDownListener} userLevel={this.state.userLevel}
                              userLevels={this.state.userLevels}
                              selectValueDropDownListener={this.selectValueDropDownListener}
                              checkBoxAddUserListener={this.checkBoxAddUserListener}
                              handleSubmitUser={this.handleSubmitUser}/>

                <div className="container">
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-md-5">
                            <input className="form-control" type="text" placeholder="Search User"
                                   aria-label="default input example" style={{width: "100%"}} onChange={this.filterDataTable}/>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" onClick={this.showModalListener} type="button">Add
                            </button>
                            <button className="btn btn-danger" onClick={this.deleteUsersSelectedListener} type="button"
                                    style={{float: "right"}}>Delete
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <UserDataTable data={this.state.users} checkBoxListener={this.checkBoxDeleteUserListener}/>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }

}

export default User;
