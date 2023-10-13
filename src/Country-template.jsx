import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function BorderCountry(props){
  return(
    <div className="borderItem">{props.name}</div>
  )
}

export default function Country(props) {
  const [openDetails, setOpenDetails] = useState(false)

  openDetails? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"

  let value = "none"
  openDetails? value = "flex": value = "none"
  let borderCountry
  if (props.borders){
    borderCountry = props.borders.map((item, index) => {
      return <BorderCountry key={index} name={item}/>
    })
  }
  

  useEffect(() =>{
    function toggle(){
      setOpenDetails(!openDetails)
    }
    document.querySelector(`.${props.alpha2Code}`).addEventListener("click", (toggle))
  },[openDetails, props.alpha2Code])

    return (
      <>
        <div className={`country ${props.alpha2Code}`}>
          <img src={props.flag} alt="country flag" />
          <div className="country-details">
            <h2 className="country-name">{props.name}</h2>
            <p>population: <span>{props.population.toLocaleString("en-US")}</span></p>
            <p>Region: <span>{props.region}</span></p>
            <p>Capital: <span>{props.capital}</span></p>
          </div>
        </div>

        <div className='country-detail-info' style={{display: value}}>
          <button onClick={() => {setOpenDetails(!openDetails)}}>
            <FontAwesomeIcon icon={faArrowLeft} className='leftArrow'/> Back
          </button>
          <img src={props.flag} alt="country flag" className='detail-country-flag'/>
          <div className="facts">
            <h2 className="country-name">{props.name}</h2>
            <div className="eight-details">
              <div className="sides">
                <p>Native Name:<span>{props.nativeName}</span></p>
                <p>Population:<span>{props.population.toLocaleString("en-US")}</span></p>
                <p>Region:<span>{props.region}</span></p>
                <p>Sub Region:<span>{props.subRegion}</span></p>
                <p>Capital:<span>{props.capital}</span></p>
              </div>
              <div className="sides">
                <p>Top Level Domain:<span>{props.topLevelDomain}</span></p>
                <p>Currencies:<span>{props.currencies}</span></p>
                <p>Languages:<span>{props.languages}</span></p>
              </div>
            </div>
            <div className="border-countries">
              <h3>Border Countries:</h3>
              <div className="countryList">
                {borderCountry}
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

Country.propTypes = {
  name: PropTypes.string,
  flag: PropTypes.string,
  alpha2Code: PropTypes.string,
  population: PropTypes.number,
  region: PropTypes.string,
  capital: PropTypes.string,
  nativeName: PropTypes.string,
  subRegion: PropTypes.string,
  topLevelDomain: PropTypes.string,
  currencies: PropTypes.array,
  languages: PropTypes.array,
  borders: PropTypes.array
}

BorderCountry.propTypes = {
  name: PropTypes.string
}