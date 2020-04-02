import React, { useReducer, useRef } from 'react';
import { dispatchFactory, todoListReducer } from './reducers/todo-list-reducer';
import { TodoItem } from './todo-item';

export function TodoList(props) {
	const [state, dispatch] = useReducer(todoListReducer, props.items || []);
	const itemInput = useRef(null);

	function handleFormSubmit(e) {
		e.preventDefault();

		const content = itemInput.current.value;
		if (content.replace(/\s/g, '').length === 0) {
			return;
		}

		const item = { content, date: new Date(), done: false };
		dispatch({ type: 'ADD_ITEM', item });
		e.target.reset();
	}

	const itemsToRender = state
		.sort((curr, next) => next.date - curr.date)
		.map((item, idx) => (
			<TodoItem
				key={idx}
				item={item}
				dispatch={dispatchFactory(dispatch, idx)}
			/>
		));

	return (
		<div className="todo-list">
			<form className="add-item-form" onSubmit={handleFormSubmit}>
				<label>Add item: </label>
				<input type="text" className="item-content" ref={itemInput} />
				<input type="submit" value="Add" />
			</form>
			<div className="items">{itemsToRender}</div>
		</div>
	);
}
