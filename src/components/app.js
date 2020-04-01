import React from 'react';
import { v4 as uuid } from 'uuid';
import '../css/app.scss';
import { TodoList } from './todo-list';

export function App() {
	// Some sample items
	const items = {};
	items[uuid()] = { content: 'Hello World', date: new Date() };
	items[uuid()] = { content: 'Lorem ipsum', date: new Date('6/10/2002') };
	items[uuid()] = { content: '123456789', date: new Date(0) };

	return (
		<div className="app">
			<TodoList items={items} />
		</div>
	);
}
