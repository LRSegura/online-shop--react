import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import UserDataTable from "./UserDataTable";
import AddUSerModal from "./AddUSerModal";
import UpdateUSerModal from "./UpdateUSerModal";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSet: new Set(),
            isShowModalToAddUser: false,
            isDropDownAddUserOpen: false,
            isShowUpdateUserModal: false,
            isDropDownUpdateUserOpen: false,
            userLevels: [],
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            userLevel: 'User Level',
            isActive: false,
            updatedUser: {},
            isActiveUpdate: false,
            userLevelUpdate: 'User Level',
            firstNameUpdate: '',
            lastNameUpdate: '',
            userNameUpdate: '',
            passwordUpdate: '',
            emailUpdate: ''

        }
        this.showUpdateUserModal = this.showUpdateUserModal.bind(this);
        this.showDropDownUpdateUserModal = this.showDropDownUpdateUserModal.bind(this);
        this.showModalToAddUser = this.showModalToAddUser.bind(this);
        this.showDropDownAddUserModal = this.showDropDownAddUserModal.bind(this);
        this.selectValueDropDownAddUserListener = this.selectValueDropDownAddUserListener.bind(this);
        this.handleValueTextChangeAddUserModal = this.handleValueTextChangeAddUserModal.bind(this);
        this.checkBoxAddUserListener = this.checkBoxAddUserListener.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.checkBoxDeleteUserListener = this.checkBoxDeleteUserListener.bind(this);
        this.deleteUsersSelected = this.deleteUsersSelected.bind(this);
        this.filterUserDataTable = this.filterUserDataTable.bind(this);
        this.showModalToUpdateUser = this.showModalToUpdateUser.bind(this);
        this.handleChangeUpdateUserModal = this.handleChangeUpdateUserModal.bind(this);
        this.checkBoxUpdateUserListener = this.checkBoxUpdateUserListener.bind(this);
        this.selectValueDropDownUpdateUserListener = this.selectValueDropDownUpdateUserListener.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    clearFields(){
        this.setState({firstName: '',
            lastName: '',
            userName: '',
            password: '',
            email: '',
            userLevel: 'User Level',
            isActive: false,});
    }

    showUpdateUserModal() {
        this.setState(prevState => ({
            isShowUpdateUserModal: !prevState.isShowUpdateUserModal
        }));
    }

    showDropDownUpdateUserModal() {
        this.setState(prevState => ({
            isDropDownUpdateUserOpen: !prevState.isDropDownUpdateUserOpen
        }));
    }

    showModalToAddUser() {
        this.setState(prevState => ({
            isShowModalToAddUser: !prevState.isShowModalToAddUser
        }));
    }

    selectValueDropDownAddUserListener(e) {
        this.setState({userLevel: e.currentTarget.textContent})
    }

    selectValueDropDownUpdateUserListener(e) {
        this.setState({userLevelUpdate: e.currentTarget.textContent})
    }

    showDropDownAddUserModal() {
        this.setState(prevState => ({
            isDropDownAddUserOpen: !prevState.isDropDownAddUserOpen
        }));
    }

    checkBoxAddUserListener() {
        const checkBox = document.querySelector('#checkIsUserActive');
        this.setState({isActive: checkBox.checked});
    }

    checkBoxUpdateUserListener() {
        const checkBox = document.querySelector('#checkIsUserActiveUpdate');
        this.setState({isActiveUpdate: checkBox.checked});
    }

    async deleteUsersSelected() {
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

    handleValueTextChangeAddUserModal(event) {
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

    handleChangeUpdateUserModal(event) {
        const elementId = event.target.id;
        const value = event.target.value;
        switch (elementId) {
            case "firstNameUpdate":
                this.setState({firstNameUpdate: value});
                break;
            case "lastNameUpdate":
                this.setState({lastNameUpdate: value});
                break;
            case "userNameUpdate":
                this.setState({userNameUpdate: value});
                break;
            case "PasswordUpdate":
                this.setState({passwordUpdate: value});
                break;
            case "emailUpdate":
                this.setState({emailUpdate: value});
                break;
            default:
        }
        // console.log(updatedUser);
    }

    updateUser(){
        this.showUpdateUserModal();
        const updatedUser = this.getUserUpdatedFromState();
        this.putUser(updatedUser);
        console.log(updatedUser);
    }

    async putUser(user) {
        const url = "http://localhost:8080/Online-Shop/webapi/application/users/update";
        const response = await fetch(url, {
            method: 'PUT',
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
                NotificationManager.success("User Updated");
                this.getUsers();
            } else {
                NotificationManager.error("Error updating user", "Failed");
                console.log(value.message);
            }
        });

    }

    async saveUser() {
        this.showModalToAddUser();
        const user = this.getUserFromState();
        await this.postUser(user);
        this.setState({users: []})
        await this.getUsers();
        this.clearFields();
    }

    getUserUpdatedFromState() {
        const password = document.getElementById('passwordUpdate').value;
        const updatedUser = this.state.updatedUser;

        return {
            id: this.state.updatedUser.id,
            firstName: this.state.firstNameUpdate.length === 0 ? updatedUser.firstName : this.state.firstNameUpdate,
            lastName: this.state.lastNameUpdate.length === 0 ? updatedUser.lastName : this.state.lastNameUpdate,
            userName: this.state.userNameUpdate.length === 0 ? updatedUser.userName : this.state.userNameUpdate,
            password: password.length === 0 ? updatedUser.password : password ,
            email: this.state.emailUpdate.length === 0 ? updatedUser.email : this.state.emailUpdate,
            userLevel: this.state.userLevelUpdate,
            isActive: this.state.isActiveUpdate
        };
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

    filterUserDataTable(event){
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

    showModalToUpdateUser(event){
        const value = event.target.value;
        const set = this.state.userSet;
        set.forEach(user => {
            if(user.id === Number(value)) {
                console.log(user.email);
                this.setState({updatedUser:user})
            }
        })
        this.showUpdateUserModal();
    }

    render() {
        return (
            <div>
                <AddUSerModal isShowModal={this.state.isShowModalToAddUser}
                              showModalListener={this.showModalToAddUser}
                              handleChangeModal={this.handleValueTextChangeAddUserModal}
                              isDropDownOpen={this.state.isDropDownAddUserOpen}
                              showDropDownListener={this.showDropDownAddUserModal}
                              userLevel={this.state.userLevel}
                              userLevels={this.state.userLevels}
                              selectValueDropDownListener={this.selectValueDropDownAddUserListener}
                              checkBoxAddUserListener={this.checkBoxAddUserListener}
                              handleSubmitUser={this.saveUser} />

                <UpdateUSerModal isShowModal={this.state.isShowUpdateUserModal}
                                 showModalListener={this.showUpdateUserModal}
                                 handleChangeModal={this.handleChangeUpdateUserModal}
                                 isDropDownOpen={this.state.isDropDownUpdateUserOpen}
                                 showDropDownListener={this.showDropDownUpdateUserModal}
                                 userLevel={this.state.userLevel}
                                 userLevels={this.state.userLevels}
                                 selectValueDropDownListener={this.selectValueDropDownUpdateUserListener}
                                 checkBoxAddUserListener={this.checkBoxUpdateUserListener}
                                 handleSubmitUser={this.updateUser}
                                 updatedUser={this.state.updatedUser}/>

                <div className="container">
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-md-5">
                            <input className="form-control" type="text" placeholder="Search User"
                                   aria-label="default input example" style={{width: "100%"}} onChange={this.filterUserDataTable}/>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="d-grid gap-2 d-md-block">
                            <button className="btn btn-primary" onClick={this.showModalToAddUser} style={{marginRight:"10px"}} type="button">Add
                            </button>
                            <button className="btn btn-danger" onClick={this.deleteUsersSelected} type="button">Delete
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <UserDataTable data={this.state.users} checkBoxListener={this.checkBoxDeleteUserListener} handleUpdateUser={this.showModalToUpdateUser}
                                       />
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        );
    }

}

export default User;
