import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = "http://localhost:8080/Online-Shop/webapi/products/for/sales";

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
            const product = [];
            for (let i = 0; i < data.length; i++) {
                product.push(data[i]);
                this.setState(prevState => ({
                    products: [...prevState.products, data[i]]
                }));
            }
            // console.log(this.state.products);
            console.log(product);
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
                        {/*<table className="table">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        /!*{heading.map(head => <th>{head}</th>)}*!/*/}

                        {/*        <th scope="col">description</th>*/}
                        {/*        <th scope="col">price</th>*/}
                        {/*        <th scope="col">available</th>*/}
                        {/*        <th scope="col">productType</th>*/}
                        {/*        <th scope="col">stock</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {this.state.products.map(item => {*/}
                        {/*        return (*/}
                        {/*            <tr key={item.id}>*/}
                        {/*                <td>{ item.description }</td>*/}
                        {/*                <td>{ item.price }</td>*/}
                        {/*                <td>{ item.available }</td>*/}
                        {/*                <td>{ item.productType }</td>*/}
                        {/*                <td>{ item.stock }</td>*/}
                        {/*            </tr>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                    </div>

                    {this.state.products.map(item => {
                        return (<div>
                                <div className="row">
                                    <div className="card" style={{width: '40rem'}}>
                                        <img src="..." className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.description}</h5>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Price: {item.price}</li>
                                            <li className="list-group-item">Available: {item.available}</li>
                                            <li className="list-group-item">Product Type: {item.productType}</li>
                                        </ul>
                                        <div className="card-body">
                                            <button type="submit" className="btn btn-primary">Add to cart</button>
                                        </div>
                                    </div>

                                    {/*<div className="card">*/}
                                    {/*    <div className="card-body">*/}

                                    {/*        <button type="submit" className="btn btn-primary">Submit</button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <br/>
                            </div>
                        );
                    })}

                    {/*<div className="row">*/}
                    {/*    <div className="card">*/}
                    {/*        <div className="card-body">*/}
                    {/*            <button type="submit" className="btn btn-primary">Submit</button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                </div>
                <NotificationContainer/>
            </div>
        );
    }

}

export default Sales;
