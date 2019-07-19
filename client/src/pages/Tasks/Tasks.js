import React, { Component } from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import Jumbotron from '../../components/Jumbotron';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, FormBtn } from '../../components/Form';

class Tasks extends Component {
	state = {
		task_log: [],
		empId: '',
		barcode: '',
		mc: '',
		qtyIn: '',
		qtyOut: '',
		date: '',
		timeIn: '',
		timeOut: '',
	};

	componentDidMount() {
		this.loadTasks();
	}

	loadTasks = () => {
		API.getTasks()
			.then(res => this.setState({ task_log: res.data, empId: '', barcode:'', mc:'', 
			qtyIn: '', qtyOut:'', date:'', timeIn:'', timeOut:'' }))
			.catch(err => console.log(err));
	};

	deleteTask = id => {
		API.deleteTask(id)
			.then(res => this.loadTasks())
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.empId && this.state.qtyIn) {
			API.saveTask({
				empId: this.state.empId,
				barcode: this.state.barcode,
				mc: this.state.mc,
				qtyIn: this.state.qtyIn,
				qtyOut: this.state.qtyOut,
				date: this.state.date,
				timeIn: this.state.timeIn,
				timeOut: this.state.timeOut
			})
				.then(res => this.loadTasks())
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Tasks Should I Complete?</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.empId}
								onChange={this.handleInputChange}
								name="empId"
								placeholder="Emp Id (required)"
							/>
							<Input
								value={this.state.barcode}
								onChange={this.handleInputChange}
								name="barcode"
								placeholder="barcode (required)"
							/>
							<Input
								value={this.state.mc}
								onChange={this.handleInputChange}
								name="mc"
								placeholder="M/C # (required)"
							/>
							<Input
								value={this.state.qtyIn}
								onChange={this.handleInputChange}
								name="qtyIn"
								placeholder="Qty In (required)"
							/>
							<Input
								value={this.state.qtyOut}
								onChange={this.handleInputChange}
								name="qtyOut"
								placeholder="Qty Out (required)"
							/>
							<Input
								value={this.state.date}
								onChange={this.handleInputChange}
								name="date"
								placeholder="Date (required)"
							/>
							<Input
								value={this.state.timeIn}
								onChange={this.handleInputChange}
								name="timeIn"
								placeholder="Time In (required)"
							/>
							<Input
								value={this.state.timeOut}
								onChange={this.handleInputChange}
								name="timeOut"
								placeholder="Time Out (required)"
							/>

							<FormBtn
								disabled={!(this.state.qtyIn && this.state.empId)}
								onClick={this.handleFormSubmit}
							>
								Submit Task
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Tasks On My List</h1>
						</Jumbotron>
						{this.state.task_log.length ? (
							<List>
								{this.state.task_log.map(task => (
									<ListItem key={task._id}>
										<Link to={'/task_log/' + task._id}>
											<strong>
												{task.empId} by {task.qtyIn}
											</strong>
										</Link>
										<DeleteBtn onClick={() => this.deleteTask(task._id)} />
									</ListItem>
								))}
							</List>
						) : (
							<h3>No Results to Display</h3>
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Tasks;