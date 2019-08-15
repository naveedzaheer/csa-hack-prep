import React, { Component } from 'react';
import axios from 'axios';

export default class EditTask extends Component {

    constructor(props) {
        super(props);

        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onChangeTaskOwner = this.onChangeTaskOwner.bind(this);
        this.onChangeTaskType = this.onChangeTaskType.bind(this);
        this.onChangeTaskStatus = this.onChangeTaskStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task_description: '',
            task_owner: '',
            task_type: '',
            task_status: ''
        }
    }

    componentDidMount() {
        const headers = {
            'Ocp-Apim-Subscription-Key': ''
        };

        var apiUrl = "https://nzcsahackwin.azurewebsites.net/api/taskItems";
        axios.get(apiUrl + '/' + this.props.match.params.id, { headers })
            .then(response => {
                this.setState({
                    task_description: response.data.description,
                    task_owner: response.data.owner,
                    task_status: response.data.status
                })
            })
            .catch(function (error) {
                alert(JSON.stringify(error));
            })
    }

    onChangeTaskDescription(e) {
        this.setState({
            task_description: e.target.value
        });
    }

    onChangeTaskOwner(e) {
        this.setState({
            task_owner: e.target.value
        });
    }

    onChangeTaskType(e) {
        this.setState({
            task_type: e.target.value
        });
    }

    onChangeTaskStatus(e) {
        this.setState({
            task_status: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Task Description: ${this.state.task_description}`);
        console.log(`Task Owner: ${this.state.task_owner}`);
        console.log(`Task Status: ${this.state.task_status}`);

        const newTask = {
            description: this.state.task_description,
            owner: this.state.task_owner,
            type: 'Work',
            status: this.state.task_status,
            id: this.props.match.params.id
        }

        const headers = {
            'Ocp-Apim-Subscription-Key': ''
        };

        var apiUrl = 'https://prod-121.westus.logic.azure.com:443/workflows/67df82d2bd64468b89e8ee6719f12e87/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XoJtaCl4GvwUT-x2pxV1W5C6Tt1hiZYshzrMg25x6A4';
        axios.post(apiUrl, newTask, { headers })
            .then(response => {
                this.props.history.push('/');
            }).catch(function (error) {
                alert(JSON.stringify(error));
            })
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.task_description}
                            onChange={this.onChangeTaskDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Owner: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.task_owner}
                            onChange={this.onChangeTaskOwner}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.task_status}
                            onChange={this.onChangeTaskStatus}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}