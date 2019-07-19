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
		tasks: [],
		title: '',
		author: ''
	};

	componentDidMount() {
		this.loadTasks();
	}

	loadTasks = () => {
		API.getTasks()
			.then(res => this.setState({ tasks: res.data, title: '', author: '' }))
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
		if (this.state.title && this.state.author) {
			API.saveTask({
				title: this.state.title,
				author: this.state.author
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
							<h1>What Tasks Should I Read?</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Title (required)"
							/>
							<Input
								value={this.state.author}
								onChange={this.handleInputChange}
								name="author"
								placeholder="Author (required)"
							/>

							<FormBtn
								disabled={!(this.state.author && this.state.title)}
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
						{this.state.tasks.length ? (
							<List>
								{this.state.tasks.map(task => (
									<ListItem key={task._id}>
										<Link to={'/tasks/' + task._id}>
											<strong>
												{task.title} by {task.author}
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