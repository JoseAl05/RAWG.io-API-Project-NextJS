import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight,faAngleRight,faAngleDoubleLeft,faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from '../../../styles/paginationButton.module.css';

const PaginationButton = ({qGames,storedParsedCurrentPage}) => {

    const qPages = qGames / 5;
    let pageNumbers = [];
    let currentPage = storedParsedCurrentPage;

    for (let i = 1; i <= Math.trunc(qPages); i++) {
        if(i <= 7 || i === qPages || Math.abs(currentPage - i) <= 1){
            pageNumbers.push(i)
        }
    }

    return (
        <div className={styles.pagination_numbers}>
            {currentPage === 1 ?
                <>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} color='white' className={styles.icon_pagination_disabled}/>
                    <FontAwesomeIcon icon={faAngleLeft} color='white' className={styles.icon_pagination_disabled}/>
                </>
                :
                <>
                    <Link href={`/dashboard/${1}`}>
                        <a><FontAwesomeIcon icon={faAngleDoubleLeft} color='white' className={styles.icon_pagination}/></a>
                    </Link>
                    <Link href={`/dashboard/${currentPage - 1}`}>
                        <a><FontAwesomeIcon icon={faAngleLeft} color='white' className={styles.icon_pagination}/></a>
                    </Link>
                </>
            }
            <>
                {
                    pageNumbers.map((numPage,index) => (
                        <Link href={`/dashboard/${numPage}`} className={styles.curren_page} key={index}>
                            <a onClick={() => {currentPage = numPage}}>{numPage}</a>
                        </Link>
                    ))
                }
            </>
            {currentPage === Math.trunc(qPages) ?
                <>
                    <FontAwesomeIcon icon={faAngleRight} color='white' className={styles.icon_pagination_disabled}/>
                    <FontAwesomeIcon icon={faAngleDoubleRight} color='white' className={styles.icon_pagination_disabled}/>
                </>
                :
                <>
                    <Link href={`/dashboard/${currentPage + 1}`}>
                        <a><FontAwesomeIcon icon={faAngleRight} color='white' className={styles.icon_pagination}/></a>
                    </Link>
                    <Link href={`/dashboard/${Math.trunc(qPages) }`}>
                        <a><FontAwesomeIcon icon={faAngleDoubleRight} color='white' className={styles.icon_pagination}/></a>
                    </Link>
                </>
            }
        </div>
    );
}

export default PaginationButton;