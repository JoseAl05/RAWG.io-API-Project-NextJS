import React, {useState,Suspense,lazy } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import _ from 'lodash';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import { getPlaiceholder } from 'plaiceholder';
import PaginationButton from '../../../components/paginationButton/PaginationButton';
import styles from '../../../../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchGameForm from '../../../components/searchGameForm/SearchGameForm';
import SearchResults from '../../../components/searchResults/searchResults';
import Sidebar from '../../../components/sidebar/Sidebar.server';

const GamesGrid = lazy(() => import('../../../components/gamesGrid/gamesGrid.server'));



const GamesByGenre = ({images,qGames}) => {

    const [searchValue, setSearchValue] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const router = useRouter();
    const {currentFilteredPage} = router.query;
    const {genre} = router.query;
    const parsedCurrentFilteredPage = parseInt(currentFilteredPage);
    const isMobile = useMediaQuery({ query: '(max-width:1280px)' })

    return (
      <>
        <Head>
          <title>Games List Page {currentFilteredPage}</title>
        </Head>
        <Sidebar genre={selectedGenre} setGenre={setSelectedGenre}/>
        <div className={styles.games}>
          <SearchGameForm setSearchValue={setSearchValue} searchValue={searchValue}/>
          <div className={styles.game_searched}>
            <SearchResults searchValue={searchValue}/>
          </div>
          <Suspense fallback={
            <div className={styles.is_loading}>
              <FontAwesomeIcon icon={faSpinner} className={styles.loading} size='3x' spin/>
            </div>
          }>
            <GamesGrid isMobile={isMobile} images={images}/>
          </Suspense>
          <PaginationButton
            qGames={qGames}
            storedParsedCurrentPage={parsedCurrentFilteredPage}
            url={`/dashboard/games/${genre.toLowerCase()}`}
          />
        </div>
      </>
    );
}

export async function getServerSideProps(context) {
    const {params} = context;
    try{
        const res = params.currentFilteredPage ?
        await axios.get(`http://localhost:3000/api/gamesByGenre/${params.genre}/${params.currentFilteredPage}`,{withCredentials:true})
        :
        await axios.get(`http://localhost:3000/api/gamesByGenre/${params.genre}/1`,{withCredentials:true});
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

export default GamesByGenre;