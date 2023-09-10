import formatEmail from "./formatEmail";

import axios from "axios";

const searchExpences = async (userEmail, searchValue) => {

    try {
        if (userEmail) {
            const { data } = await axios.get(
                `https://expencify-26abb-default-rtdb.asia-southeast1.firebasedatabase.app/${formatEmail(
                    userEmail
                )}/Expences.json`
            );

            if (data) {

                const expenceListArray = Object.keys(data).map((firebaseId) => ({
                    firebaseId,
                    ...data[firebaseId],
                }));

                // for sorting the array
                const sortedExpence = expenceListArray.sort((a, b) => {
                    const dateA = new Date(a.expenceDate);
                    const dateB = new Date(b.expenceDate);
                    return dateB - dateA;
                });

                const filteredArray = sortedExpence.filter((item) => {
                    return item.expenceName
                        .toLowerCase()
                        .includes(searchValue.toLowerCase().trim());
                });

                return filteredArray;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export default searchExpences