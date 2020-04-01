export function todoListReducer(state, action) {
	const newState = Array.from(state);

	switch (action.type) {
		case 'ADD_ITEM':
			newState.push(action.item);
			break;
		case 'DELETE_ITEM':
			newState.splice(action.key, 1);
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

export function dispatchFactory(dispatch, key) {
	return (...actions) =>
		actions.forEach((action) => dispatch({ ...action, key }));
}
