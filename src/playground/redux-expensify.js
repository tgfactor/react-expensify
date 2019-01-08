import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD-Expense
const addExpense = (
		{ description = '', note = '', amount = 0, createdAt = 0} = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

// Remove-Expense
const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// Edit-Expense
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// Set Text Filter
const setTextFilter = (text = "") => ({
	type: 'SET_TEXT_FILTER',
	text
});

// Sort by Date
const sortByDate = () => ({
	type: 'SET_SORTBY_FILTER',
	sortBy: 'date'
});

// Sort By Amount
const sortByAmount = () => ({
	type: 'SET_SORTBY_FILTER',
	sortBy: 'amount'
});

// Set startdate
const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
});

// Set enddate
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});

// Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			];
		case 'REMOVE_EXPENSE':
			return state.filter(({id}) => action.id !== id);
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					};
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

// Filters Reducer

const filtersReducerDefaultState = {text:'', sortBy: 'date', startDate: undefined, endDate: undefined};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SET_SORTBY_FILTER':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			};
		default:
			return state;
	}
};

// timestamps (milliseconds)
// 
// 33400, 10, -203

// Get visible expenses
const getVisibleExpense = (expenses, {text, sortBy, startDate, endDate}) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		}
		if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	});
};

// Store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer, 
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpense(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));


//console.log(expenseOne,expenseTwo);

const demoState = {
	expenses: [{
		id: 'asdfbn',
		description: 'January Rent',
		note: 'This was the final payment for that address',
		amount: 54500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined 
	}

};

const user = {
	name:'Jen',
	age:24
};

console.log({
age:27,
...user,
location:'Philadelphia',
});