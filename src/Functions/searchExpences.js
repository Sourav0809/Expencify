
const searchExpences = (searchValue, expenceListArray) => {
    // for sorting the array

    const filteredArray = expenceListArray.filter((item) => {

        const searchVal = searchValue.toLowerCase().trim()
        return item.expenceName
            .toLowerCase()
            .includes(searchVal) || item.expencePrice.includes(searchVal);
    });
    const sortedExpence = filteredArray.sort((a, b) => {
        const dateA = new Date(a.expenceDate);
        const dateB = new Date(b.expenceDate);
        return dateB - dateA;
    });

    return sortedExpence;



}


export default searchExpences