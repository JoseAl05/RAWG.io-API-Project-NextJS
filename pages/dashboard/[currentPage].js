import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import _ from 'lodash';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import { getPlaiceholder } from 'plaiceholder';
import PaginationButton from '../components/paginationButton/PaginationButton';
import useDebounce from '../../hooks/useDebounce';
import styles from '../../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';



const Dashboard = ({images,qGames}) => {
    const isServer = typeof window === 'undefined'
    console.log(isServer);
    const [searchValue, setSearchValue] = useState('');
    const debounedSearchValue = useDebounce(searchValue, 300);
    const router = useRouter();
    const {currentPage} = router.query;
    const parsedCurrentPage = parseInt(currentPage);
    const isMobile = useMediaQuery({ query: '(max-width:1280px)' })

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

    const renderResult = () => {
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
            {isServer && <h1>We are server side! :D</h1>}
            {data ?
              data.results.map((game, index) => {
                return (
                  <div className={styles.quote_container} key={index}>
                    <Link
                      href={{
                        pathname: `/gameDetails/${game.id}/${encodeURI(
                          game.name
                        )}`,
                        query: { ss: JSON.stringify(game.short_screenshots) },
                      }}
                    >
                      <a className={styles.game_name}>{game.name}</a>
                    </Link>
                    <div className={styles.quote_game_name}>
                      {game.genres.length === 0 ? (
                        <>
                          <h3>Genres: </h3>
                          <span className={styles.highlight_no_data}>
                            No Data
                          </span>
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
                          <span className={styles.highlight_no_data}>
                            No Data
                          </span>
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
                                <span
                                  className={styles.highlight_xbox}
                                  key={index}
                                >
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
                            if (
                              platform.platform.name.split(" ")[0] === "macOS"
                            ) {
                              return (
                                <span
                                  className={styles.highlight_macOS}
                                  key={index}
                                >
                                  {platform.platform.name}
                                </span>
                              );
                            }
                            if (
                              platform.platform.name.split(" ")[0] === "Linux"
                            ) {
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
                                <span
                                  className={styles.highlight_web}
                                  key={index}
                                >
                                  {platform.platform.name}
                                </span>
                              );
                            }
                            if (platform.platform.name.split(" ")[0] === "iOS") {
                              return (
                                <span
                                  className={styles.highlight_iOS}
                                  key={index}
                                >
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
          :
          <div>No Data</div>
          }
          </>
        );
      }
      return <></>;
    };

    return (
      <>
        <Head>
          <title>Games List Page {currentPage}</title>
        </Head>
        <div className={styles.games}>
          <h1>Search Your Game</h1>
          <div className={styles.form_search_game}>
            <input
              type="text"
              className={styles.search_game}
              onChange={({ target: { value } }) => setSearchValue(value)}
              value={searchValue}
            />
          </div>
          <div className={styles.game_searched}>{renderResult()}</div>
            <div className={styles.games_grid}>
              {isMobile ? (
                <>
                    {images.map((imageProps, index) => {
                      const { gameData, ...gameExtracted } = imageProps;
                      return (
                        <div className={styles.games_images_mobile} key={index}>
                          <Image
                            {...gameExtracted}
                            width={700}
                            height={475}
                            placeholder="blur"
                          />
                          <div
                            className={styles.game_info_mobile}
                            key={imageProps.gameData.id}
                            id='details'
                          >
                            <h1>{imageProps.gameData.name}</h1>
                            <p>Realease Date: {imageProps.gameData.released}</p>
                            <p>Last Update: {imageProps.gameData.updated}</p>
                            <ul>
                              <p>Platforms: </p>
                              {imageProps.gameData.platforms.map((platforms) => {
                                return (
                                  <li key={platforms.platform.id}>
                                    {platforms.platform.name}
                                  </li>
                                );
                              })}
                            </ul>
                            <Link
                              href={{
                                pathname: `/gameDetails/${imageProps.gameData.id}/${imageProps.gameData.name}`,
                                query: {
                                  ss: JSON.stringify(
                                    imageProps.gameData.short_screenshots
                                  ),
                                },
                              }}
                            >
                              <a className={styles.details_mobile}>
                                Details
                                <FontAwesomeIcon icon={faArrowAltCircleRight} />
                              </a>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                </>
              ) : (
                <>
                  <div className={styles.games_grid}>
                    {images.map((imageProps, index) => {
                      const { gameData, ...gameExtracted } = imageProps;
                      return (
                        <div className={styles.games_images} key={index}>
                          <Image
                            {...gameExtracted}
                            width={700}
                            height={475}
                            placeholder="blur"
                          />
                          <div
                            className={styles.game_info}
                            key={imageProps.gameData.id}
                          >
                            <h1>{imageProps.gameData.name}</h1>
                            <p>Realease Date: {imageProps.gameData.released}</p>
                            <p>Last Update: {imageProps.gameData.updated}</p>
                            <ul>
                              <p>Platforms: </p>
                              {imageProps.gameData.platforms.map((platforms) => {
                                return (
                                  <li key={platforms.platform.id}>
                                    {platforms.platform.name}
                                  </li>
                                );
                              })}
                            </ul>
                            <Link
                              href={{
                                pathname: `/gameDetails/${imageProps.gameData.id}/${imageProps.gameData.name}`,
                                query: {
                                  ss: JSON.stringify(
                                    imageProps.gameData.short_screenshots
                                  ),
                                },
                              }}
                            >
                              <a className={styles.details}>
                                Details
                                <FontAwesomeIcon icon={faArrowAltCircleRight} />
                              </a>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          <PaginationButton
            qGames={qGames}
            storedParsedCurrentPage={parsedCurrentPage}
          />
        </div>
      </>
    );
}

export async function getServerSideProps(context) {
    const {params} = context; //params = currentPage
    try{
        const res = params.currentPage ?
        await axios.get(`http://localhost:3000/api/games/${params.currentPage}`,{withCredentials:true})
        :
        await axios.get('http://localhost:3000/api/games/1',{withCredentials:true});
        if(res.status === 200){
            const qGames = res.data.count;
            const images = await Promise.all(
                res.data.results.map(async(gameData,index) => {
                    const {base64,img} = await getPlaiceholder(gameData.background_image);
                    return {
                        ...img,
                        alt:'Games Banner Image',
                        title:gameData.name,
                        blurDataURL:base64,
                        gameData:gameData
                    }
                })
            ).then(values => values);
            return {
                props:{
                    games:res.data,
                    images:images,
                    qGames:qGames,
                },
            };
        }
    }catch(error){
        console.log(error)
        return {
            notFound: true,
          }
    }
}

export default Dashboard;