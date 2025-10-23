import { useEffect, useState } from 'react'
import countryServices from './services/countryServices'
import axios from "axios";

const Filter = ({ filterValue, handleFilterValueChange }) => {
  return (
    <div>
      find countries <input value={filterValue} onChange={handleFilterValueChange} />
    </div>
  )
}

const CountryCard = ({ country }) => {
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

const WeatherCard = ({ city, latlng }) => {
  const [weather, setWeather] = useState(null)
  const [isCityAvailable, setIsCityAvailable] = useState(true)
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'

  useEffect(() => {
    if (!city && latlng.length !== 2) {
      setIsCityAvailable(false)
      return
    }

    axios.get(`${baseUrl}q=${city}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [city, latlng])

  if (!city && latlng.length !== 2) setIsCityAvailable(false)
  console.log('1')
  if (!isCityAvailable) return null
  console.log('2')
  if (!weather) return null
  console.log('3')
  const temperature = weather.main.temp
  const iconCode = weather.weather[0].icon
  const weatherIconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null
  const windSpeed = weather.wind.speed
  return (
    <div>
      <h2>{`Weather in ${city}`}</h2>
      <p>{`Temperature ${temperature} Celsius`}</p>
      <img src={weatherIconUrl} alt={`weather icon`} />
      <p>{`Wind ${windSpeed} m/s`}</p>
    </div>
  )
}

const CountryDisplay = ({ countryList, handleShowChange }) => {
  if (countryList.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (countryList.length === 1) {
    const country = countryList[0];
    return (
      <div>
        <CountryCard country={country} />
        <WeatherCard city={country.capital[0]} latlng={country.capitalInfo.latlng} />
      </div>
    )
  }
  else {
    return (
      <ul>
        {countryList.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleShowChange(country)}>show</button></li>)}
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

  const handleShowChange = (selectedCountry) => {
    setCountries(countries.filter(country => country.name.common === selectedCountry.name.common))
  }

  if (!countries) return
  return (
    <div>
      <Filter filterValue={filterCountry} handleFilterValueChange={handleFilterCountryChange} />
      <CountryDisplay countryList={countries} handleShowChange={handleShowChange} />
    </div>
  )
}
export default App
