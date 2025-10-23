import { useEffect, useState } from 'react'
import countryServices from './services/countryServices'

const Filter = ({filterValue, value, handleFilterValueChange}) => {
  return (
    <div>
      find countries <input value={filterValue} onChange={handleFilterValueChange} />
    </div>
  )
}

const CountryDisplay = ({countryList}) => {
  if(countryList.length > 10){
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if(countryList.length === 1){
    const country = countryList[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>Capital</td>
              {console.log(country)}
              {country.capital.map(city => <td key={city}>{city}</td>)}
            </tr>
            <tr>
              <td>Area</td>
              <td>{country.area}</td>
            </tr>
          </tbody>
        </table>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => (<li key={language}>{language}</li>))}
        </ul>
        <img src={country.flags.png} alt="flags" />
      </div>
    )
  }
  else {
    return (
      <ul>
        {countryList.map(country => <li key={country.name.common}>{country.name.common}</li>)}
      </ul>
    )
  }
}

const App = () => {
  const [filterCountry, setFilterCountry] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryServices.getAll().
    then(allCountries => setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))))
    console.log('countries :>> ', countries);
  }, [filterCountry])

  const handleFilterCountryChange = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setFilterCountry(event.target.value)
  }

  if(!countries) return
  return (
    <div>
      <Filter filterValue={filterCountry} handleFilterValueChange={handleFilterCountryChange} />
      <CountryDisplay countryList={countries}/>
    </div>
   )
}
export default App
