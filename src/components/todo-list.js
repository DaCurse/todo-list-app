import React, { useReducer, useRef } from 'react';
import { TodoItem } from './todo-item';

export function TodoList(props) {
	const [state, dispatch] = useReducer(reducer, props.items);
	const itemInput = useRef(null);

	function reducer(state, action) {
		const newState = Array.from(state);

		switch (action.type) {
			case 'ADD_ITEM':
				newState.push(action.item);
				break;
			case 'DELETE_ITEM':
				delete newState[action.key];
				break;
			case 'SET_CONTENT':
				newState[action.key].content = action.content;
				break;
			case 'SET_DATE':
				newState[action.key].date = action.date;
				break;
			case 'SET_DONE':
				newState[action.key].done = action.done;
				break;
		}

		return newState;
	}

	function dispatchFactory(key) {
		return (...actions) => {
			if (actions.length === 1 && actions[0].constructor === Array) {
				actions = actions[0];
			}
			actions.forEach((action) => dispatch({ ...action, key }));
		};
	}

	function handleSubmit(e) {
		e.preventDefault();

		const content = itemInput.current.value;
		if (content.replace(/\s/g, '').length === 0) {
			return;
		}

		const item = { content, date: new Date() };
		dispatch({ type: 'ADD_ITEM', item });
		itemInput.current.value = '';
	}

	const itemsToRender = state
		.sort((curr, next) => next.date - curr.date)
		.map((item, idx) => (
			<TodoItem key={idx} item={item} dispatch={dispatchFactory(idx)} />
		));

	return (
		<div className="todo-list">
			<form className="item-form" onSubmit={handleSubmit}>
				<span>Add item: </span>
				<input type="text" id="item-content" ref={itemInput} />
				<input type="submit" value="Add" />
			</form>
			<div className="items">{itemsToRender}</div>
		</div>
	);
}
