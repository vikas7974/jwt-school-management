import './App.css';
import Login from './screens/Login';
import SignupS from './screens/SignupS';
import SignupT from './screens/SignupT';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import StudentList from './screens/StudentList';
import TeacherList from './screens/TeacherList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupT />} />
        <Route path="/studentSignup" element={<SignupS />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/slist" element={<StudentList></StudentList>}></Route>
        <Route path="/allt" element={<TeacherList></TeacherList>}></Route>
      </Routes>
    </Router>


  );
}

export default App;
