import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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
      <div>
        filter shown with <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h1>add a new</h1>
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
      <h1>Numbers</h1>
      <div>
        <table>
          <thead><tr><th>Name</th><th>Number</th></tr></thead>
          <tbody>{filteredPersons.map(person => <tr key={person.id}><td>{person.name}</td><td>{person.number}</td></tr>)}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default App