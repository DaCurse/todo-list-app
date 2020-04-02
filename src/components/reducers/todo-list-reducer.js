export function todoListReducer(state, action) {
	const newState = Array.from(state);

	switch (action.type) {
		case 'ADD_ITEM':
			newState.push(action.item);
			break;
		case 'DELETE_ITEM':
			newState.splice(action.key, 1);
			break;
		case 'UPDATE_ITEM':
			for (let field in newState[action.key]) {
				if (field in action.item) {
					newState[action.key][field] = action.item[field];
				}
			}
			break;
	}

	return newState;
}

export function dispatchFactory(dispatch, key) {
	return (action) => dispatch({ ...action, key });
}
