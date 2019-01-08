import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT'});
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id:expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expenses if id is not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id:'-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add expense to expenses', () => {
	const expense = {
		id: '4',
		description: 'Water bill',
		note: '',
		amount: 2000,
		createdAt: moment(0).add(2, 'days').valueOf()
	};
	const action = {type: 'ADD_EXPENSE', expense};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit an existing expense', () => {
	const note = "testing";
	const action = {type: 'EDIT_EXPENSE', id: expenses[1].id, updates: {note}};
	const state = expensesReducer(expenses, action);
	expect(state[1].note).toBe(note);
});

test('should not edit an expense if id is not found', () => {
	const description = "Gas Bill";
	const action = {type: 'EDIT_EXPENSE', id: '-1', updates: {description}};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});