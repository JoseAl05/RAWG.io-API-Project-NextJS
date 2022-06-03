import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/dashboard.module.css';


const GamesGrid = ({isMobile,images}) => {
    return (
      <>
        <div className={styles.games_grid}>
          {isMobile ? (
            <>
              {images.map((imageProps, index) => {
                const { gameData, ...gameExtracted } = imageProps;
                const releaseDate = imageProps.gameData.released;
                const lastUpdate = imageProps.gameData.updated;
                const newDate = new Date(releaseDate);
                const updateDate = new Date(lastUpdate);
                console.log(imageProps.gameData);
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
                      id="details"
                    >
                      <h1>{imageProps.gameData.name}</h1>
                      <p>Realease Date: {newDate.toDateString()}</p>
                      <p>Last Update: {updateDate.toDateString()}</p>
                      <div className={styles.tag}>
                        {imageProps.gameData.tags.map((tag, index) => {
                          return (
                            <p>{tag.name}</p>
                          )
                        }
                        )}
                      </div>
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
                  const releaseDate = imageProps.gameData.released;
                  const lastUpdate = imageProps.gameData.updated;
                  const newDate = new Date(releaseDate);
                  const updateDate = new Date(lastUpdate);
                  return (
                    <div className={styles.games_images} key={index}>
                      <Image
                        {...gameExtracted}
                        width={400}
                        height={275}
                        placeholder="blur"
                      />
                      <div
                        className={styles.game_info}
                        key={imageProps.gameData.id}
                      >
                        <h1>{imageProps.gameData.name}</h1>
                        <p>Realease Date: {newDate.toDateString()}</p>
                        <p>Last Update: {updateDate.toDateString()}</p>
                        <div className={styles.tag}>
                          {imageProps.gameData.tags.map((tag, index) => {
                            return (
                              <p>{tag.name}</p>
                            )
                          }
                          )}
                        </div>
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
      </>
    );
}

export default GamesGrid;