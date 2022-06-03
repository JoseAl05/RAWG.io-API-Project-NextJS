import React, {useState,Suspense,lazy } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import _ from 'lodash';
import axios from "axios";
import { useMediaQuery } from 'react-responsive';
import { getPlaiceholder } from 'plaiceholder';
import PaginationButton from '../components/paginationButton/PaginationButton';
import styles from '../../styles/dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import SearchGameForm from '../components/searchGameForm/SearchGameForm';
import SearchResults from '../components/searchResults/searchResults';

const GamesGrid = lazy(() => import('../components/gamesGrid/gamesGrid.server'));



const Dashboard = ({images,qGames}) => {

    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const {currentPage} = router.query;
    const parsedCurrentPage = parseInt(currentPage);
    const isMobile = useMediaQuery({ query: '(max-width:1280px)' })


    return (
      <>
        <Head>
          <title>Games List Page {currentPage}</title>
        </Head>
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
            storedParsedCurrentPage={parsedCurrentPage}
          />
        </div>
      </>
    );
}

export async function getServerSideProps(context) {
    const {params} = context;
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