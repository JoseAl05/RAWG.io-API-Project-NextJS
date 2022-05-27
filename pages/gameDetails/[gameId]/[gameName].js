import React from "react";
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { useQuery, QueryClient, dehydrate } from "react-query";
import styles from '../../../styles/gameDetails.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useMediaQuery } from 'react-responsive';


const GameDetails = ({images}) => {
    const isServer = typeof window === 'undefined';
    console.log(isServer);
    const router = useRouter();
    const {gameName} = router.query;
    const gameId = typeof router.query?.gameId === 'string' ? parseInt(router.query.gameId) : router.query.gameId;

    const isBigScreen = useMediaQuery({ query: '(min-width:1824px)' });
    const isMobile = useMediaQuery({ query: '(max-width:1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const gameNameWithoutSpaces = gameName.replace(/ /g,'-');

    const parsedGameName = gameNameWithoutSpaces.toLowerCase();

    const { isSuccess, data, isLoading, isError } = useQuery(
        ['getGameDetail',gameId],
        async() =>{
            try{
                const res = await axios.get(`http://localhost:3000/api/gameDetails/${gameId}`)
                return res.data;
            }catch(error){
                console.log(error);
                return error;
            }
        },
        {
            enabled:gameId!== 0,
            staleTime: Infinity
        }
    )
    console.log(data);
    if(isSuccess){
        return (
          <>
            <Head>
              <title>{gameName}</title>
            </Head>
            {isServer && <h1>We are server side! :D</h1>}
            <div>
              {images ? (
                <div className={styles.images}>
                  {images.map((imageProps, index) => {
                    return (
                      <div key={index}>
                        <input
                          className={styles.input_image}
                          type="radio"
                          id={`trigger ${index}`}
                          name="slider"
                          defaultChecked
                          autoFocus
                        />
                        {isBigScreen && (
                          <label
                            className={styles.label_image_mobile_large}
                            htmlFor={`trigger ${index}`}
                          ></label>
                        )}
                        {isMobile && (
                          <label
                            className={styles.label_image_mobile}
                            htmlFor={`trigger ${index}`}
                          ></label>
                        )}
                        <div className={styles.slide}>
                          <Image
                            {...imageProps}
                            placeholder="blur"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No Images</div>
              )}
              <div className={styles.banner_content}>
                <div className={styles.banner_conent_metacritic}>
                  <h1>{gameName}</h1>
                  <h4>Metacritic Scores: </h4>
                  <a
                    href={`https://www.metacritic.com/game/pc/${parsedGameName}`}
                    className={styles.highlight_metacritic_href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Go to Metacritic Site!
                  </a>
                  {data ? (
                    data.metacritic !== null ? (
                      data.metacritic_platforms.length !== 0 ? (
                        data.metacritic_platforms.map((meta, index) => {
                          if (meta.platform.name === "PC") {
                            return (
                              <span className={styles.highlight_pc} key={index}>
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "Xbox") {
                            return (
                              <span className={styles.highlight_xbox} key={index}>
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (
                            meta.platform.name.split(" ")[0] === "PlayStation" ||
                            meta.platform.name.split(" ")[0] === "PS"
                          ) {
                            return (
                              <span
                                className={styles.highlight_playstation}
                                key={index}
                              >
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "Nintendo") {
                            return (
                              <span
                                className={styles.highlight_nintendo}
                                key={index}
                              >
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "macOS") {
                            return (
                              <span
                                className={styles.highlight_macOS}
                                key={index}
                              >
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "Linux") {
                            return (
                              <span
                                className={styles.highlight_linux}
                                key={index}
                              >
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "Web") {
                            return (
                              <span className={styles.highlight_web} key={index}>
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                          if (meta.platform.name.split(" ")[0] === "iOS") {
                            return (
                              <span className={styles.highlight_iOS} key={index}>
                                {meta.platform.name} {meta.metascore}/100
                              </span>
                            );
                          }
                        })
                      ) : (
                        <p>No data of the Scores... :(</p>
                      )
                    ) : (
                      <div className={styles.no_data_metacritic}>
                        No metacritic
                      </div>
                    )
                  ) : (
                    <div>No data</div>
                  )}
                </div>
                <div className={styles.banner_conent_developer}>
                  <h1>Developers</h1>
                  {data ?
                    data.developers ?
                      data.developers.length !== 0 ?
                        data.developers.map((dev,index) => {
                          return <p>{dev.name}</p>
                        })
                      :
                      <></>
                    :
                    <h2>No data of developres</h2>
                  :
                  <h2>No data</h2>
                  }
                </div>
                <div className={styles.banner_conent_distributor}>
                  <h1>Distributor</h1>
                  {data ?
                    data.publishers ?
                      data.publishers.length !== 0 ?
                        data.publishers.map((pub,index) => {
                          return <p>{pub.name}</p>
                        })
                      :
                      <></>
                    :
                    <h2>No data of Distributors</h2>
                  :
                  <h2>No data</h2>
                  }
                </div>
              </div>
              {data ? (
                <>
                  <div className={styles.description_content}>
                    <p>{data.description_raw}</p>
                  </div>
                  <div className={styles.game_details_content}>
                    <div className={styles.tag_grid}>
                      <h1>Platfroms</h1>
                      <ul>
                        {data.platforms.map((platform, index) => {
                          return <li key={index}>{platform.platform.name}</li>;
                        })}
                      </ul>
                      <h1>Genres</h1>
                      {data.genres.map((genre, index) => {
                        return <p key={index}>{genre.name}</p>;
                      })}
                    </div>
                    <div className={styles.pc_req_grid}>
                      <h1>PC Minimum Requeriments</h1>
                      {data.platforms ?
                        data.platforms.length !== 0 ?
                          data.platforms.map((platform,index) => {
                            const isPC = Object.values(platform.platform).indexOf('PC') !== -1 ? true : false;
                            const isMinimum = Object.keys(platform.requirements).indexOf('minimum') !== -1 ? true : false;

                            if(isPC){
                              if(!isMinimum){
                                return <p>No data of minimum PC requirements...</p>
                              }
                              return <p>{platform.requirements.minimum}</p>
                            }
                          })
                        :
                        <p>No data of PC requirements</p>
                      :
                      <p>No data of PC requirements</p>
                      }
                      <h1>PC Recommended Requirements</h1>
                      {data.platforms ?
                        data.platforms.length !== 0 ?
                          data.platforms.map((platform,index) => {
                            const isPC = Object.values(platform.platform).indexOf('PC') !== -1 ? true : false;
                            const isRecommended = Object.keys(platform.requirements).indexOf('recommended') !== -1 ? true : false;

                            if(isPC){
                              if(!isRecommended){
                                return <p>No data of recommended PC requirements...</p>
                              }
                              return <p>{platform.requirements.recommended}</p>
                            }
                          })
                        :
                        <p>No data of PC requeriments</p>
                      :
                      <p>No data of PC requeriments</p>
                      }
                    </div>
                  </div>
                </>
              ) : (
                <FontAwesomeIcon icon={faSpinner} className={styles.loading} size='3x' spin/>
              )}
            </div>
          </>
        );
    }

    if (isLoading) {
        return (
            <>
                <Head>
                    <title>{gameName}</title>
                </Head>
                <div className={styles.is_loading}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.loading} size='3x' spin/>
                </div>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Head>
                    <title>Not Found {gameName}</title>
                </Head>
                <div style={{textAlign:'center',color:'white'}}>
                    We couldnt find your pokemon{" "}
                    <span role="img" aria-label="sad">
                    😢
                    </span>
                </div>
            </>
        );
    }
    return <></>

}

export const getServerSideProps = async (context) => {
    const screenshots =
      typeof context.query.ss === "undefined"
        ? []
        : JSON.parse(context.query.ss);
    const gameId =
      typeof context.params?.gameId === "string"
        ? parseInt(context.params.gameId)
        : context.params.gameId;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["getGameDetail", gameId], async() =>{
        try{
            const details = await Promise.resolve(
                axios.get(`http://localhost:3000/api/gameDetails/${gameId}`)
            ).then(values => values)
            return details.data;
        }catch(error){
            console.log(error);
            return error;
        }
    });

    const images = await Promise.all(
      screenshots.map(async (ss, index) => {
        const { base64, img } = await getPlaiceholder(ss.image);
        return {
          ...img,
          alt: "Game Screenshots",
          title: context.query.gameName,
          blurDataURL: base64,
        };
      })
    ).then((values) => values);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        images: images,
      },
    };


  };


export default GameDetails;