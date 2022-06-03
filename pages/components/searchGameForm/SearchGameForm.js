import React from 'react';
import styles from '../../../styles/dashboard.module.css';

const SearchGameForm = ({setSearchValue,searchValue}) => {


    return(
        <>
          <h1>Search Your Game</h1>
          <div className={styles.form_search_game}>
            <input
              type="text"
              className={styles.search_game}
              onChange={({ target: { value } }) => setSearchValue(value)}
              value={searchValue}
            />
          </div>
        </>
    )
}

export default SearchGameForm;