import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default  function Search(props) {

    return(
        <div className="search-filter">
          <label htmlFor="search" className='search-label'>
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
            <input type="search" 
                    value = {props.query}
                    onChange={props.queryFunc}
                    id="search" 
                    className="search" 
                    placeholder='Search for a country...'/>
          </label>
          <label htmlFor="select-region" className='select'>
            <select id='select-region' name='select-region' defaultValue='Africa' onChange={props.selectFunction}>
              <option value="Africa">Africa</option>
              <option value="America">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </label>
        </div>
    )
}

Search.propTypes = {
  query: PropTypes.string,
  queryFunc: PropTypes.func,
  selectFunction: PropTypes.func
}