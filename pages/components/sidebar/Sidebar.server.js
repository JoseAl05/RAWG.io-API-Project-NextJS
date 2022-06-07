import { useState } from "react";
import { useQuery } from "react-query";
import Link from 'next/link';
import styles from '../../../styles/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faFilter } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Dropdown from "../dropdown/Dropdown";


const Sidebar = ({genre,setGenre}) => {

    const handleChange = (event) => {
        setGenre(event.target.value);
    };

    const { isSuccess, data, isLoading, isError } = useQuery(
        'genres',
        async()=>{
            try{
                const res = await axios.get('http://localhost:3000/api/genres/allGenres',{withCredentials:true});
                return res.data;
            }catch(error){
                console.log(error);
                return error;
            }
        },
        {
            refetchOnMount:false
        }
    )

    console.log(genre);


    return (
      <>
        <div className={styles.area}></div>
        <nav className={styles.main_menu}>
            <ul>
                <li>
                <a href="#">
                    <FontAwesomeIcon icon={faHome} className={`${styles.fa} ${styles.fa_2x}`} color='white'/>
                    <span className={styles.nav_text}>Dashboard</span>
                </a>
                </li>
                <li className="has-subnav">
                    <span className={`${styles.filter_button}`}>
                        {/* <FontAwesomeIcon icon={faFilter} className={`${styles.fa} ${styles.fa_2x}`} color='white'/> */}
                        {/* <span className={styles.nav_text}>Filters</span> */}
                        {isSuccess && <Dropdown options={data.results} value={genre} onChange={handleChange}/>}
                        {isSuccess &&
                            <Link href={{pathname: `/dashboard/games/${genre.toLowerCase()}/1`,}}>
                                <a>
                                    Apply Filter
                                </a>
                            </Link>
                        }
                    </span>
                </li>
            </ul>
        </nav>
      </>
    );
}

export default Sidebar;