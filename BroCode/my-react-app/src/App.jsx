import './App.css';
import Student from './componets/student/Student.jsx';
import Card from './componets/card/Card.jsx';

function App() {
  return (
    <>
      <Card></Card>
      <Student profilePic="https://picsum.photos/250" name="Person" details="The temporary details of person"></Student>
      <Student profilePic="https://picsum.photos/251" name="Person" details="The temporary details of person"></Student>
      <Student profilePic="https://picsum.photos/252" name="Person" details="The temporary details of person"></Student>

    </>
  );
}

export default App
