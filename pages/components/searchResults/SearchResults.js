import Link from 'next/link';
import useDebounce from '../../../hooks/useDebounce';
import { useQuery } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/dashboard.module.css';

const SearchResults = ({searchValue}) => {

    const debounedSearchValue = useDebounce(searchValue, 300);

    const {isLoading,isError,isSuccess,data} = useQuery(
        ['searchGames',debounedSearchValue],
        async() => {
          try{
              const res = await axios.get(`http://localhost:3000/api/gameSearched/${debounedSearchValue}`)
              return res.data;
          }catch(error){
              console.log(error);
              return error;
          }
        },
        {
          enabled: debounedSearchValue.length > 0
        }
    )
    if (isLoading) {
        return(
          <div className={styles.is_loading}>
            <FontAwesomeIcon icon={faSpinner} className={styles.loading} size='3x' spin/>
          </div>
        );
    }
    if (isError) {
    return <div> Something went wrong </div>;
    }
    if (isSuccess) {
        return (
        <>
            {data ? (
            data.results.map((game, index) => {
                return (
                <div className={styles.quote_container} key={index}>
                    <Link
                    href={{
                        pathname: `/gameDetails/${game.id}/${encodeURI(game.name)}`,
                        query: { ss: JSON.stringify(game.short_screenshots) },
                    }}
                    >
                    <a className={styles.game_name}>{game.name}</a>
                    </Link>
                    <div className={styles.quote_game_name}>
                    {game.genres.length === 0 ? (
                        <>
                        <h3>Genres: </h3>
                        <span className={styles.highlight_no_data}>No Data</span>
                        </>
                    ) : (
                        <>
                        <h3>Genres: </h3>
                        {game.genres.map((genres, index) => {
                            return (
                            <span className={styles.highlight} key={index}>
                                {genres.name}
                            </span>
                            );
                        })}
                        </>
                    )}
                    </div>
                    <div className={styles.quote_platforms}>
                    {game.platforms === null ? (
                        (game.platforms = [])
                    ) : game.platforms.length === 0 ? (
                        <>
                        <h3>Platforms: </h3>
                        <span className={styles.highlight_no_data}>No Data</span>
                        </>
                    ) : (
                        <>
                        <h3>Platforms: </h3>
                        {game.platforms.map((platform, index) => {
                            if (platform.platform.name === "PC") {
                            return (
                                <span className={styles.highlight_pc} key={index}>
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (platform.platform.name.split(" ")[0] === "Xbox") {
                            return (
                                <span className={styles.highlight_xbox} key={index}>
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (
                            platform.platform.name.split(" ")[0] ===
                                "PlayStation" ||
                            platform.platform.name.split(" ")[0] === "PS"
                            ) {
                            return (
                                <span
                                className={styles.highlight_playstation}
                                key={index}
                                >
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (
                            platform.platform.name.split(" ")[0] === "Nintendo"
                            ) {
                            return (
                                <span
                                className={styles.highlight_nintendo}
                                key={index}
                                >
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (platform.platform.name.split(" ")[0] === "macOS") {
                            return (
                                <span
                                className={styles.highlight_macOS}
                                key={index}
                                >
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (platform.platform.name.split(" ")[0] === "Linux") {
                            return (
                                <span
                                className={styles.highlight_linux}
                                key={index}
                                >
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (platform.platform.name.split(" ")[0] === "Web") {
                            return (
                                <span className={styles.highlight_web} key={index}>
                                {platform.platform.name}
                                </span>
                            );
                            }
                            if (platform.platform.name.split(" ")[0] === "iOS") {
                            return (
                                <span className={styles.highlight_iOS} key={index}>
                                {platform.platform.name}
                                </span>
                            );
                            }
                        })}
                        </>
                    )}
                    </div>
                </div>
                );
            })
            ) : (
            <div>No Data</div>
            )}
        </>
        );
    }
}

export default SearchResults;