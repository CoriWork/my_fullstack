import { useState, useEffect } from 'react'
import phoneService from './services/phones'
import {Filter, PersonForm, Persons} from './components/phoneComponents'
import Notification from './components/notificatoin'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('useEffect :>> ');
    phoneService.getAll()
    .then(initPersons => setPersons(initPersons))
  }, [])

  const filteredPersons = persons.filter(
    person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    console.log('existingPerson :>> ', existingPerson);
    if(existingPerson){
      const is_confirmed = window.confirm(`${newName} is already added to phonebook, replace the older number with the new one?`)
      if(is_confirmed){
        const changedPerson = {...existingPerson, number : newPhoneNumber}
        phoneService.update(existingPerson.id, changedPerson).then(updatedPerson => persons.map(person => person.id === updatedPerson ? changedPerson : person))
        setNewName('')
        setNewPhoneNumber('')
      }
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
    setMessage(`Added ${newPerson.name}`)
    setTimeout(() => setMessage(null), 2000)
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
    const is_confirmed = window.confirm(`You are going to delete ${person.name}!`)
    if(!is_confirmed) return
    phoneService.remove(person.id).then(removedPerson => setPersons(persons.filter(person => person.id !== removedPerson.id)))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <h1>add a new</h1>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handlePhoneNumberChange={handlePhoneNumberChange} newName={newName} newPhoneNumber={newPhoneNumber} />
      <h1>Numbers</h1>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} /> 
    </div>
  )
}

export default App