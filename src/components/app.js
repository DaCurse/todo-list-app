import React from 'react';
import '../css/app.scss';
import { TodoList } from './todo-list';

export function App() {
	// Some sample items
	const items = [
		{ content: 'Hello World', date: new Date(), done: false },
		{ content: 'Lorem ipsum', date: new Date('6/10/2002'), done: false },
		{ content: '123456789', date: new Date(0), done: false },
	];

	return (
		<div className="app">
			<TodoList items={items} />
		</div>
	);
}
