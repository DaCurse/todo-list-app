import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import '../css/todo-item.scss';

export function TodoItem(props) {
	const { content, date, done } = props.item;
	const dispatch = props.dispatch;
	const [editing, setEditing] = useState(false);
	const contentInput = useRef(null);
	window.dispatch = dispatch;

	function handleCheckboxChange(e) {
		dispatch({
			type: 'UPDATE_ITEM',
			item: { done: e.target.checked },
		});
	}

	function handleContentClick() {
		if (done) {
			return;
		}
		setEditing(true);
	}

	function handleFormSubmit(e) {
		e.preventDefault();

		const newContent = contentInput.current.value;
		if (newContent.replace(/\s/g, '').length === 0) {
			return;
		}

		dispatch({
			type: 'UPDATE_ITEM',
			item: { content: newContent, date: new Date() },
		});
		setEditing(false);
	}

	useEffect(() => {
		if (editing) {
			contentInput.current.value = content;
			contentInput.current.select();
		}
	}, [editing]);

	return (
		<div className={classNames('todo-item', { done })}>
			<input type="checkbox" onChange={handleCheckboxChange} checked={done} />
			<div className="content">
				<div
					className="content-body"
					onClick={handleContentClick}
					hidden={editing}
				>
					{content}
				</div>
				<form
					className="edit-item-form"
					onSubmit={handleFormSubmit}
					hidden={!editing}
				>
					<input
						type="text"
						className="content-input"
						ref={contentInput}
						onBlur={() => setEditing(false)}
					/>
				</form>
			</div>
			<div className="footer">
				<span className="date">
					{date ? date.toLocaleString() : 'Invalid date'}{' '}
				</span>
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
