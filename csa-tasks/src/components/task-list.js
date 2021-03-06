import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function deleteTask(id, e) {
    e.preventDefault();
    var result = window.confirm("Are you sure you wish to delete this item?");
    if (result == true) {
        const headers = {
            'Ocp-Apim-Subscription-Key': 'cbe13a8601f641549f6d8f6d90ef46ec;product=evaluation',
            'content-type': 'application/json'
        };
        var apiUrl = 'https://nzcsahack.azure-api.net/Tasks/delete';
        var postData = "{'id':'" + id + "'}";
        axios.post(apiUrl, postData, { headers })
        .then(response => {
            window.location.reload();
        })
        .catch(function (error) {
            alert(JSON.stringify(error));
        })
    }
}

const Todo = props => (
    <tr>
        <td>{props.task.description}</td>
        <td>{props.task.owner}</td>
        <td>{props.task.status}</td>
        <td>
            <Link to={"/edit/" + props.task.id}>Edit</Link>
        </td>
        <td>
            <a href="#" onClick={(e) => deleteTask(props.task.id, e)}>
                Delete
                </a>
        </td>
    </tr>
)

export default class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = { tasks: [] };
    }

    componentDidMount() {
        const headers = {
            'Ocp-Apim-Subscription-Key': 'cbe13a8601f641549f6d8f6d90ef46ec;product=evaluation'
        };
        console.log("Componnet did mount...");

        var apiUrl = "https://nzcsahack.azure-api.net/Tasks/taskitems";
        axios.get(apiUrl, { headers })
            .then(response => {
                this.setState({ tasks: response.data });
            })
            .catch(function (error) {
                alert(JSON.stringify(error));
            })
    }

    taskList() {
        return this.state.tasks.map(function (currentTodo, i) {
            return <Todo task={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Task List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.taskList()}
                    </tbody>
                </table>
            </div>
        )
    }
}