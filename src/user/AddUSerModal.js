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
    }
    render() {
        return(
            <Modal isOpen={this.props.isShowModal} toggle={this.props.showModalListener} style={{width: '70%'}}>
                <ModalHeader toggle={this.props.showModalListener}>Add User</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <input id="firstName" type="text" className="form-control" placeholder="First Name"
                                   onChange={this.props.handleChangeModal}/>
                        </div>
                        <div className="mb-3">
                            <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                                   onChange={this.props.handleChangeModal}/>
                        </div>
                        <div className="mb-3">
                            <input id="userName" type="text" className="form-control" placeholder="User Name"
                                   onChange={this.props.handleChangeModal}/>
                        </div>
                        <div className="mb-3">
                            <input id="password" type="password" className="form-control" placeholder="Password"
                                   onChange={this.props.handleChangeModal}/>
                        </div>
                        <div className="mb-3">
                            <input id="email" type="email" className="form-control" placeholder="Email"
                                   onChange={this.props.handleChangeModal}/>
                        </div>

                        <Dropdown isOpen={this.props.isDropDownOpen} onChange={this.props.listener} toggle={this.props.showDropDownListener}
                                  direction={"down"}>
                            <DropdownToggle caret>{this.props.userLevel}</DropdownToggle>
                            <DropdownMenu>
                                {
                                    this.props.userLevels.map(value => {
                                        return (
                                            <DropdownItem key={value}
                                                          onClick={this.props.selectValueDropDownListener}>{value}</DropdownItem>
                                        );
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                        <br/>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="checkIsUserActive"
                                   onChange={this.props.checkBoxAddUserListener}/>
                            <label className="form-check-label" htmlFor="checkIsUserActive">Is Active?</label>
                        </div>


                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.handleSubmitUser}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.props.showModalListener}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }

}

export default AddUSerModal;