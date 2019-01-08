// Set Text Filter
export const setTextFilter = (text = "") => ({
	type: 'SET_TEXT_FILTER',
	text
});

// Sort by Date
export const sortByDate = () => ({
	type: 'SET_SORTBY_FILTER',
	sortBy: 'date'
});

// Sort By Amount
export const sortByAmount = () => ({
	type: 'SET_SORTBY_FILTER',
	sortBy: 'amount'
});

// Set startdate
export const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
});

// Set enddate
export const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});

