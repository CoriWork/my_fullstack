import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterName, handleFilterNameChange}) => {
  return (
    <div>
      filter shown with <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, handleNameChange, newPhoneNumber, handlePhoneNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({filteredPersons}) => {
  return (
    <div>
      <table>
        <thead><tr><th>Name</th><th>Number</th></tr></thead>
        <tbody>{filteredPersons.map(person => <tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('useEffect :>> ');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response :>> ', response);
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('')
      return
    }
    const newPersons = persons.concat({name : newName, number : newPhoneNumber, id : persons.length + 1})
    setPersons(newPersons)
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value);
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <h1>add a new</h1>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber} />
      <h1>Numbers</h1>
      <Persons filteredPersons={filteredPersons} /> 
    </div>
  )
}

export default App