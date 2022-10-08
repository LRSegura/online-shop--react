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

export default function AddUSerModal(props) {
    return <Modal isOpen={props.isShowModal} toggle={props.showModalListener} style={{width: '70%'}}>
        <ModalHeader toggle={props.showModalListener}>Add User</ModalHeader>
        <ModalBody>
            <form>
                <div className="mb-3">
                    <input id="firstName" type="text" className="form-control" placeholder="First Name"
                           onChange={props.handleChangeModal}/>
                </div>
                <div className="mb-3">
                    <input id="lastName" type="text" className="form-control" placeholder="Last Name"
                           onChange={props.handleChangeModal}/>
                </div>
                <div className="mb-3">
                    <input id="userName" type="text" className="form-control" placeholder="User Name"
                           onChange={props.handleChangeModal}/>
                </div>
                <div className="mb-3">
                    <input id="password" type="password" className="form-control" placeholder="Password"
                           onChange={props.handleChangeModal}/>
                </div>
                <div className="mb-3">
                    <input id="email" type="email" className="form-control" placeholder="Email"
                           onChange={props.handleChangeModal}/>
                </div>

                <Dropdown isOpen={props.isDropDownOpen} onChange={props.listener} toggle={props.showDropDownListener}
                          direction={"down"}>
                    <DropdownToggle caret>{props.userLevel}</DropdownToggle>
                    <DropdownMenu>
                        {
                            props.userLevels.map(value => {
                                return (
                                    <DropdownItem key={value}
                                                  onClick={props.selectValueDropDownListener}>{value}</DropdownItem>
                                );
                            })
                        }
                    </DropdownMenu>
                </Dropdown>
                <br/>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="checkIsUserActive"
                           onChange={props.checkBoxAddUserListener}/>
                    <label className="form-check-label" htmlFor="checkIsUserActive">Is Active?</label>
                </div>


            </form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={props.handleSubmitUser}>Add</Button>{' '}
            <Button color="secondary" onClick={props.showModalListener}>Cancel</Button>
        </ModalFooter>
    </Modal>
}