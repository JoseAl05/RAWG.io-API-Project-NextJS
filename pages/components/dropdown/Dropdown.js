import styles from '../../../styles/sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
const Dropdown = ({ value, options, onChange }) => {
    return (

            <select className={styles.filter} value={value} onChange={onChange}>
                <option className={styles.options}>All</option>
                {options.map((option,index) => (
                    <option className={styles.options} value={option.name} key={index}><a href='#'>{option.name}</a></option>
                ))}
            </select>
    );
}

export default Dropdown;