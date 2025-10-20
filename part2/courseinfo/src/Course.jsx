const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
}
  
const Part = ({ name, exercises, id }) => {
    return (
      <p key={id}>{name} {exercises}</p>
    )
}
  
const Content = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum += part.exercises, 0)
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        <p><strong>total of {totalExercises} exercises</strong></p>
      </div>
    )
}
  
const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
}

export default Course