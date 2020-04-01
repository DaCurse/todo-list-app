import React, { useReducer, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { TodoItem } from './todo-item';

export function TodoList(props) {
	// State
	const [state, dispatch] = useReducer(reducer, props.items);
	// Refs
	const itemInput = useRef(null);

	// State reducer
	function reducer(state, action) {
		// Clone the state in order to mutate it
		const newState = Object.assign({}, state);

		switch (action.type) {
			case 'ADD_ITEM':
				newState[uuid()] = action.item;
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

	// Creates a dispatch function for a specific item
	function dispatchFactory(key) {
		return (...actions) => {
			if (actions.length === 1 && actions[0].constructor === Array) {
				actions = actions[0];
			}
			actions.forEach((action) => dispatch({ ...action, key }));
		};
	}

	// Event listeners
	function onFormSubmit(e) {
		e.preventDefault();
		const content = itemInput.current.value;
		if (content.replace(/\s/g, '').length === 0) {
			return;
		}
		const item = { content, date: new Date() };
		dispatch({ type: 'ADD_ITEM', item });
		itemInput.current.value = '';
	}

	// Sort items by date and create a list of elements to render
	const itemsToRender = Object.keys(state)
		.sort((curr, next) => state[next].date - state[curr].date)
		.map((key) => (
			<TodoItem item={state[key]} key={key} dispatch={dispatchFactory(key)} />
		));

	return (
		<div className="todo-list">
			<form className="item-form" onSubmit={onFormSubmit}>
				<label htmlFor="item-content">Add item: </label>
				<input type="text" id="item-content" ref={itemInput} />
				<input type="submit" value="Add" />
			</form>
			<div className="items">{itemsToRender}</div>
		</div>
	);
}
