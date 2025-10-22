import { useState, useEffect } from 'react'
import phoneService from './services/phones'
import {Filter, PersonForm, Persons} from './components/phoneComponents'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('useEffect :>> ');
    phoneService.getAll()
    .then(initPersons => setPersons(initPersons))
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
    const newPerson = {
      name : newName,
      number : newPhoneNumber,
      id : `${Math.floor(Date.now())}`
    }
    phoneService.create(newPerson).then(addedPerson => setPersons(persons.concat(addedPerson)))
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

  const handleDelete = (person) => {
    window.confirm(`You are going to delete ${person.name}!`)
    phoneService.remove(person.id).then(removedPerson => setPersons(persons.filter(person => person.id !== removedPerson.id)))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <h1>add a new</h1>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber} />
      <h1>Numbers</h1>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} /> 
    </div>
  )
}

export default App