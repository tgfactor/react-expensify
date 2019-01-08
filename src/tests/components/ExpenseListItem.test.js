import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

const expense = expenses[0];

test('should render ExpenseListItem with expense', () => {

	const wrapper = shallow(<ExpenseListItem {...expense} />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});