import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import '../css/todo-item.scss';

export function TodoItem(props) {
	// State
	const { content, date, done } = props.item;
	const dispatch = props.dispatch;
	const [editing, setEditing] = useState(false);
	// Refs
	const contentInput = useRef(null);

	// Event listeners
	function onCheckboxChange(e) {
		dispatch({ type: 'SET_DONE', done: e.target.checked });
	}

	function onContentClick() {
		if (done) {
			return;
		}
		setEditing(true);
	}

	function onInputChange(e) {
		dispatch([
			{ type: 'SET_CONTENT', content: e.target.value },
			{ type: 'SET_DATE', date: new Date() },
		]);
	}

	function onInputKeyDown(e) {
		if (e.key !== 'Enter') {
			return;
		}
		setEditing(false);
	}

	// Effects
	useEffect(() => {
		if (editing) {
			contentInput.current.select();
		}
	}, [editing]);

	return (
		<div className={classNames('todo-item', { done })}>
			<input type="checkbox" onChange={onCheckboxChange} />
			<div className="content">
				<div className="content-body" onClick={onContentClick} hidden={editing}>
					{content}
				</div>
				<input
					type="text"
					className="content-input"
					ref={contentInput}
					value={content}
					onChange={onInputChange}
					onKeyDown={onInputKeyDown}
					onBlur={() => setEditing(false)}
					hidden={!editing}
				/>
			</div>
			<div className="footer">
				<span className="date">{date.toLocaleString()} </span>
				<button
					className="delete-item"
					onClick={() => dispatch({ type: 'DELETE_ITEM' })}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
