import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import moment from 'moment';
import { ExpenseListFilters }  from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters 
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test('should render ExpenseListFilters correctly', () => {
	expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilters with altData correctly', () => {
	wrapper.setProps({
		filters:altFilters
	});
	expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle text filter change', () => {
	const value = "water";
	wrapper.find('input').simulate('change', {
		target: { value }
	});
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should handle sort by date', () => {
	wrapper.setProps({
		filters:altFilters
	});
	const value = "date";
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByDate).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
	const value = "amount";
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByAmount).toHaveBeenCalled();
});

test('should handle startDate change', () => {
	const startDate = new moment();
	const endDate = new moment().add(3, 'days');
	wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date on focus changes', () => {
	const calendarFocused = "startDate";
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
