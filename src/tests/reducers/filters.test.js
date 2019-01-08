import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT'});
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SET_SORTBY_FILTER', sortBy: 'amount' });
	expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SET_SORTBY_FILTER', sortBy: 'date' };
	const state = filtersReducer(currentState, action);
	expect(state.sortBy).toBe('date');
});

test('should set text filter to "bill"', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	};
	const text = "bill";
	const action = { type: 'SET_TEXT_FILTER', text };
	const state = filtersReducer(currentState, action);
	expect(state.text).toBe(text);
});

test('should set startDate to 12/1/2018', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	};
	const action = { type: 'SET_START_DATE', startDate: moment('2018-12-01') };
	const state = filtersReducer(currentState, action);
	expect(state.startDate.valueOf()).toBe(moment('2018-12-01').valueOf());
});

test('should set endDate to 12/31/2018', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'date'
	};
	const action = { type: 'SET_END_DATE', endDate: moment('2018-12-31') };
	const state = filtersReducer(currentState, action);
	expect(state.endDate.valueOf()).toBe(moment('2018-12-31').valueOf());
});
