import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import React from "react";

class UpdateUSerModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            userLevel: "props.updatedUser.userLevel",
            userLevels: [],
            isActive: false,
            isDropDownOpen: false
        };
        this.completeAction = this.completeAction.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.checkBoxListener = this.checkBoxListener.bind(this);
        this.DropDownListener = this.DropDownListener.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
    }
    completeAction() {
        this.props.completeAction(this.getUserUpdatedFromState());
    }

    getUserUpdatedFromState() {
        const password = document.getElementById('password').value;
        const updatedUser = this.props.updatedUser;

        return {
            id: updatedUser.id,
            firstName: this.state.firstName.length === 0 ? updatedUser.firstName : this.state.firstName,
            lastName: this.state.lastName.length === 0 ? updatedUser.lastName : this.state.lastName,
            userName: this.state.userName.length === 0 ? updatedUser.userName : this.state.userName,
            password: password.length === 0 ? updatedUser.password : password ,
            email: this.state.email.length === 0 ? updatedUser.email : this.state.email,
            userLevel: this.state.userLevel,
            isActive: this.state.isActive
        };
    }

    checkBoxListener() {
        const checkBox = document.querySelector('#checkIsUserActive');
        this.setState({isActive: checkBox.checked});
    }

    showDropDown() {
        this.setState(prevState => ({
            isDropDownOpen: !prevState.isDropDownOpen
        }));
    }

    DropDownListener(e) {
        this.setState({userLevel: e.currentTarget.textContent})
    }

    handleTextChange(event) {
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
            case "email":
                this.setState({email: value});
                break;
            default:
        }
    }

    render() {
        return(
            <Modal isOpen={this.props.isShowModal} toggle={this.props.showModalListener} style={{width: '70%'}}>
                <ModalHeader toggle={this.props.showModalListener}>Edit User</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <input id="firstName" type="text" className="form-control" placeholder="First Name"
                                   onChange={this.handleTextChange} defaultValue={this.props.updatedUser.firstName} />
                        </div>
                        <div className="mb-3">
                            <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                                   onChange={this.handleTextChange} defaultValue={this.props.updatedUser.lastName}/>
                        </div>
                        <div className="mb-3">
                            <input id="userName" type="text" className="form-control" placeholder="User Name"
                                   onChange={this.handleTextChange} defaultValue={this.props.updatedUser.userName}/>
                        </div>
                        <div className="mb-3">
                            <input id="password" type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="mb-3">
                            <input id="email" type="text" className="form-control" placeholder="Email"
                                   onChange={this.handleTextChange} defaultValue={this.props.updatedUser.email}/>
                        </div>

                        <Dropdown isOpen={this.state.isDropDownOpen} onChange={this.props.listener} toggle={this.showDropDown}
                                  direction={"down"}>
                            <DropdownToggle caret>{this.state.userLevel}</DropdownToggle>
                            <DropdownMenu>
                                {
                                    this.props.userLevels.map(value => {
                                        return (
                                            <DropdownItem key={value}
                                                          onClick={this.DropDownListener}>{value}</DropdownItem>
                                        );
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                        <br/>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="checkIsUserActive"
                                   onChange={this.checkBoxListener} defaultChecked={this.props.updatedUser.isActive}/>
                            <label className="form-check-label" htmlFor="checkIsUserActive">Is Active?</label>
                        </div>


                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.completeAction}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.props.showModalListener}>Cancel</Button>
                </ModalFooter>

            </Modal>
        );
    }
}
export default UpdateUSerModal;