import React, { useState, useEffect } from "react";
import EditTodo from "./components/EditTodo";
import CreateTodo from "./components/CreateTodo";
import "./Todos.scss";
const Todos = () => {
	const [todos, setTodos] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [showCompleted, setShowCompleted] = useState(false);
	const [selectedTasks, setSelectedTasks] = useState([]);
	const [editTaskId, setEditTaskId] = useState(null);
	const [editedTaskTitle, setEditedTaskTitle] = useState("");
	const [editedTaskCompleted, setEditedTaskCompleted] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const response = await fetch("https://jsonplaceholder.typicode.com/todos");
		const data = await response.json();
		setTodos(data);
	};

	const changePageSize = (size) => {
		setPageSize(size);
	};

	const changeShowCompleted = () => {
		setShowCompleted((prevShowCompleted) => !prevShowCompleted);
	};

	const handleSelectTask = (id) => {
		setSelectedTasks((prevSelectedTasks) => {
			if (prevSelectedTasks.includes(id)) {
				return prevSelectedTasks.filter((taskId) => taskId !== id);
			}
			return [...prevSelectedTasks, id];
		});
	};
	const handleCreate = (e) => {
		e.preventDefault();
		var obj = {
			id: todos.length + 1,
			title: newTitle,
			completed: false,
		};
		if (obj) {
			setTodos((prevData) => [...prevData, obj]);
		}
		setNewTitle("");
	};
	console.log(todos);
	const deleteSelectedTasks = () => {
		setTodos((prevTodos) =>
			prevTodos.filter((todo) => !selectedTasks.includes(todo.id))
		);
		setSelectedTasks([]);
	};
	const editTask = (taskId) => {
		const editedTask = todos.find((todo) => todo.id === taskId);
		if (editedTask) {
			setEditTaskId(taskId);
			setEditedTaskTitle(editedTask.title); // Populate the edited task title
		}
	};
	const handleEditFormSubmit = (e) => {
		e.preventDefault();
		const updatedTodos = todos.map((todo) =>
			todo.id === editTaskId
				? { ...todo, title: editedTaskTitle, completed: editedTaskCompleted }
				: todo
		);
		setTodos(updatedTodos);
		setEditTaskId(null);
		setEditedTaskTitle("");
		setEditedTaskCompleted(false); // Reset the edited task completed state
	};
	const filteredTodos = showCompleted
		? todos
		: todos.filter((todo) => !todo.completed);

	const sortedTodos = [...filteredTodos].sort((a, b) => {
		if (a.completed && !b.completed) {
			return 1;
		}
		if (!a.completed && b.completed) {
			return -1;
		}
		return 0;
	});

	const paginatedTodos = sortedTodos.slice(0, pageSize);

	return (
		<div className="todos_main">
			<div className="todos">
				<div className="todos__block">
					<div className="todos_main__create-input">
						<CreateTodo
							handleCreate={handleCreate}
							newTitle={newTitle}
							setNewTitle={setNewTitle}
						/>
					</div>
					<div className="todos_main__completed">
						<p>Show completed:</p>
						<input
							type="checkbox"
							checked={showCompleted}
							onChange={changeShowCompleted}
						/>
					</div>
				</div>
				<div className="todos__block">
					<div className={"todos_main__pagination"}>
						<p>Page size:</p>
						<select
							value={pageSize}
							onChange={(e) => changePageSize(Number(e.target.value))}
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
							<option value={sortedTodos.length}>All</option>
						</select>
					</div>
					<div className={"todos_main__delete--btn"}>
						<button
							onClick={deleteSelectedTasks}
							disabled={selectedTasks.length === 0}
						>
							Delete Selected Tasks
						</button>
					</div>
				</div>
			</div>
			<div className="cards">
				<ul>
					{paginatedTodos.map((todo) => (
						<div className="todos__card">
							<li
								key={todo.id}
								style={{
									textDecoration: todo.completed ? "line-through" : "none",
								}}
							>
								<div className="todos__card__block">
									<input
										type="checkbox"
										checked={selectedTasks.includes(todo.id)}
										onChange={() => handleSelectTask(todo.id)}
									/>
									<div className="todos__card__inside">
										<span>{todo.id}</span>
										<p>{todo.title}</p>
									</div>
								</div>
								<button onClick={() => editTask(todo.id)}>Edit</button>
							</li>
						</div>
					))}
				</ul>
			</div>
			{editTaskId !== null && (
				<EditTodo
					handleEditFormSubmit={handleEditFormSubmit}
					editedTaskTitle={editedTaskTitle}
					setEditedTaskTitle={setEditedTaskTitle}
					editedTaskCompleted={editedTaskCompleted}
					setEditedTaskCompleted={setEditedTaskCompleted}
					setEditTaskId={setEditTaskId}
				/>
			)}
		</div>
	);
};

export default Todos;
