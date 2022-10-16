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

class AddUSerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            userLevel: 'User Level',
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
        this.props.completeAction(this.getUserFromState());
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

    DropDownListener(e) {
        this.setState({userLevel: e.currentTarget.textContent})
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


    render() {
        return (
            <Modal isOpen={this.props.isShowModal} toggle={this.props.showModalListener} style={{width: '70%'}}>
                <ModalHeader toggle={this.props.showModalListener}>Add User</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <input id="firstName" type="text" className="form-control" placeholder="First Name"
                                   onChange={this.handleTextChange}/>
                        </div>
                        <div className="mb-3">
                            <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                                   onChange={this.handleTextChange}/>
                        </div>
                        <div className="mb-3">
                            <input id="userName" type="text" className="form-control" placeholder="User Name"
                                   onChange={this.handleTextChange}/>
                        </div>
                        <div className="mb-3">
                            <input id="password" type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="mb-3">
                            <input id="email" type="email" className="form-control" placeholder="Email"
                                   onChange={this.handleTextChange}/>
                        </div>

                        <Dropdown isOpen={this.state.isDropDownOpen} onChange={this.props.listener}
                                  toggle={this.showDropDown}
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
                                   onChange={this.checkBoxListener}/>
                            <label className="form-check-label" htmlFor="checkIsUserActive">Is Active?</label>
                        </div>


                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.completeAction}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.props.showModalListener}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }


}

export default AddUSerModal;