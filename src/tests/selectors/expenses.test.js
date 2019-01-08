import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

const filters = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};

test('should filter by text value', () => {
	const tfilters = {
		...filters,
		text: 'e'
	};
	const result = selectExpenses(expenses, tfilters);
	expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by start date', () => {
	const tfilters = {
		...filters,
		startDate: moment(0)
	};
	const result = selectExpenses(expenses, tfilters);
	expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by end date', () => {
	const tfilters = {
		...filters,
		endDate: moment(0).add(1,'days')
	};
	const result = selectExpenses(expenses, tfilters);
	expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date', () => {
	const tfilters = {
		...filters
	};
	const result = selectExpenses(expenses, tfilters);
	expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
	const tfilters = {
		...filters,
		sortBy: 'amount'
	};
	const result = selectExpenses(expenses, tfilters);
	expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});

