import React from 'react';

const SearchGameForm = (setSearchValue,searchValue) => {


    return(
        <>
            <input
                type="text"
                onChange={({ target: { value } }) => setSearchValue(value)}
                value={searchValue}
            />
        </>
    )
}

export default SearchGameForm;