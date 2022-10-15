import React from "react";

export default function UserDataTable(props) {
    return <table className="table">
        <thead>
        <tr>
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
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.userName}</td>
                    <td>{item.userLevel}</td>
                    <td>{item.isActive ? "true":"false"}</td>
                    <td>{item.registerDate}</td>
                    <td><input className="form-check-input" type="checkbox" value={item.id}
                               id={"checkUser" + item.id} onChange={props.checkBoxListener}/></td>
                </tr>
            );
        })}
        </tbody>
    </table>
}