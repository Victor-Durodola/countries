import { useState, useEffect } from 'react'

import Nav from "./Nav"
import Search from './Search'
import Country from "./Country-template"

function App() {
  // const countryElements = [{
  //   "name": "Belgium",
  //   "topLevelDomain": [".be"],
  //   "alpha2Code": "BE",
  //   "alpha3Code": "BEL",
  //   "callingCodes": ["32"],
  //   "capital": "Brussels",
  //   "altSpellings": [
  //     "BE",
  //     "België",
  //     "Belgie",
  //     "Belgien",
  //     "Belgique",
  //     "Kingdom of Belgium",
  //     "Koninkrijk België",
  //     "Royaume de Belgique",
  //     "Königreich Belgien"
  //   ],
  //   "subregion": "Western Europe",
  //   "region": "Europe",
  //   "population": 11555997,
  //   "latlng": [50.83333333, 4],
  //   "demonym": "Belgian",
  //   "area": 30528,
  //   "gini": 27.2,
  //   "timezones": ["UTC+01:00"],
  //   "borders": ["FRA", "DEU", "LUX", "NLD"],
  //   "nativeName": "België",
  //   "numericCode": "056",
  //   "flags": {
  //     "svg": "https://flagcdn.com/be.svg",
  //     "png": "https://flagcdn.com/w320/be.png"
  //   },
  //   "currencies": [
  //     {
  //       "code": "EUR",
  //       "name": "Euro",
  //       "symbol": "€"
  //     }
  //   ],
  //   "languages": [
  //     {
  //       "iso639_1": "nl",
  //       "iso639_2": "nld",
  //       "name": "Dutch",
  //       "nativeName": "Nederlands"
  //     },
  //     {
  //       "iso639_1": "fr",
  //       "iso639_2": "fra",
  //       "name": "French",
  //       "nativeName": "français"
  //     },
  //     {
  //       "iso639_1": "de",
  //       "iso639_2": "deu",
  //       "name": "German",
  //       "nativeName": "Deutsch"
  //     }
  //   ],
  //   "translations": {
  //     "br": "Belgia",
  //     "pt": "Bélgica",
  //     "nl": "België",
  //     "hr": "Belgija",
  //     "fa": "بلژیک",
  //     "de": "Belgien",
  //     "es": "Bélgica",
  //     "fr": "Belgique",
  //     "ja": "ベルギー",
  //     "it": "Belgio",
  //     "hu": "Belgium"
  //   },
  //   "flag": "https://flagcdn.com/be.svg",
  //   "regionalBlocs": [
  //     {
  //       "acronym": "EU",
  //       "name": "European Union"
  //     }
  //   ],
  //   "cioc": "BEL",
  //   "independent": true
  // }]
  const url = './data.json'
  const [countries, setCountries] = useState([])
  const [countryElements, setCountryElements] = useState([])
  const [selectedRegion, setSelectedRegion] = useState("Africa")
  const [query, setQuery] = useState("")
  const [pairValue, setPairValue] = useState([])
  
  
  function queryFunc(e) {
    let value = e.target.value
    setQuery(value)
  }

  function filteredCountries(){
    let filtered =  countries.filter((item)=> {
      return item.name.toLowerCase().includes(query.toLocaleLowerCase())
    })

    return filtered.map((element, index) => {
      let languagesFromCountries = element.languages.map((item, index) => {
        const lastItem = element.languages.length - 1
        if(index != lastItem ) {
          return item.name + ", "
        } else {
          return item.name
        }
      })
      let currencies

      if (element.currencies){
        currencies = element.currencies.map(item => item.name)
      }
      let bordersCountry
        if (element.borders) {
          const bordersArray = element.borders
          bordersCountry = bordersArray.map(code => {
            for(const obj of pairValue) {
              if (code == Object.keys(obj).toString()) {
                 return Object.values(obj).toString()
              }
            }
          })
        }
      return <Country 
            key={index} 
            name = {element.name}
            alpha2Code = {element.alpha2Code}
            nativeName = {element.nativeName}
            flag = {element.flags.png} 
            population = {element.population} 
            region = {element.region} 
            subRegion ={element.subRegion}
            capital = {element.capital} 
            topLevelDomain = {element.topLevelDomain[0]}
            currencies = {currencies}
            languages = {languagesFromCountries}
            borders={bordersCountry}
            />
    })

    
  }
  
  async function getData() {
    try {const response = await fetch(url)
    const data = await response.json()
    setCountries (data)}
    catch (error){
      console.error("error");
    }
  }

  
  
    let nestedElements = countryElements.map((element, index) => { // index needed
      let languagesFromCountries = element.languages.map((item, index) => {
        const lastItem = element.languages.length - 1
        if(index != lastItem ) {
          return item.name + ", "
        } else {
          return item.name
        }
      })
      let currencies

      if (element.currencies){
        currencies = element.currencies.map(item => item.name)
      }
      let bordersCountry
        if (element.borders) {
          const bordersArray = element.borders
          bordersCountry = bordersArray.map(code => {
            for(const obj of pairValue) {
              if (code == Object.keys(obj).toString()) {
                 return Object.values(obj).toString()
              }
            }
          })
        }
      
      return <Country 
              key={index} 
              name = {element.name}
              alpha2Code = {element.alpha2Code}
              nativeName = {element.nativeName}
              flag = {element.flags.png} 
              population = {element.population} 
              region = {element.region} 
              subRegion ={element.subregion}
              capital = {element.capital} 
              topLevelDomain = {element.topLevelDomain[0]}
              currencies = {currencies}
              languages = {languagesFromCountries}
              borders = {bordersCountry}
              />
      
    })
  


  function handleSelect(e) {
    const currentRegion = e.target.value
    setSelectedRegion(currentRegion)
  }

 
  useEffect (()=> {
    getData();
    
   }, []);

  useEffect(() => {
    if (selectedRegion == "Africa") {
      let current = []
      countries.forEach(element => {
        if (element.region == "Africa"){
          current.push(element) 
        }
      })
      setCountryElements(current)
    } else if (selectedRegion == "America") {
      let current = []
      countries.forEach(element => {
        if (element.region == "Americas"){
          current.push(element) 
        }
      })
      setCountryElements(current)
    } else if (selectedRegion == "Asia") {
      let current = []
      countries.forEach(element => {
        if (element.region == "Asia"){
          current.push(element) 
        }
      })
      setCountryElements(current)
    } else if (selectedRegion == "Europe") {
      let current = []
      countries.forEach(element => {
        if (element.region == "Europe"){
          current.push(element) 
        }
      })
      setCountryElements(current)
    } else {
      let current = []
      countries.forEach(element => {
        if (element.region == "Oceania"){
          current.push(element) 
        }
      })
      setCountryElements(current)
    }
    
  
    
  },[countries, selectedRegion])

useEffect(() => {
  const val = true
  if (val == true){
    let mappedPair = countries.map((country) =>{
      return {[country.alpha3Code]: country.name};
    })
    setPairValue(mappedPair)
  }
},[countries])

  return (
    <>
      <Nav />

      <main>
        <Search query = {query} queryFunc= {queryFunc} selectFunction = {handleSelect}/>

        <div className="countries-container">
          {query == ""? nestedElements : filteredCountries()}
          {/* {nestedElements} */}
        </div>
      </main>
    </>
  )
}

export default App

