import React from "react";

export default function UserDataTable(props) {
    return <table className="table">
        <thead>
        <tr>
            <th scope="col"><input className="form-check-input" type="checkbox"
                                   id={"checkAllUser"} onChange={props.checkBoxAllUserListener}/>
            </th>
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
        {props.data.map(item => {
            return (
                <tr key={item.id}>
                    <td><input className="form-check-input" type="checkbox" value={item.id}
                               id={"checkUser" + item.id} onChange={props.checkBoxUserListener}/></td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.userName}</td>
                    <td>{item.userLevel}</td>
                    <td>{item.isActive ? "true":"false"}</td>
                    <td>{item.registerDate}</td>
                    <td><button className="btn btn-primary" type="button" onClick={props.handleUpdateUser} value={item.id}>Update
                        </button></td>
                </tr>
            );
        })}
        </tbody>
    </table>
}