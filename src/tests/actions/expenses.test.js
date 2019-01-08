import { addExpense, editExpense, removeExpense} from  '../../actions/expenses';
import moment from 'moment';

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	}); 
});

test('should setup edit expense action object', () => {
	const createdOf = moment();
	const action = editExpense('123abc', {description:"test",amount:"100",createdAt:createdOf,note:"test"});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			description:"test",
			amount:"100",
			createdAt:createdOf,
			note:"test"			
		}
	})
});

test('should setup add expense action object with provided values', () => {
	const expenseData = {
		description: 'Rent',
		amount: '109500',
		createdAt: 1000,
		note: 'This was last months rent'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});


test('should setup add expense action object with default values', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			description:'',
			amount:0,
			note:'',
			createdAt:0,
			id: expect.any(String)
		}
	})
});