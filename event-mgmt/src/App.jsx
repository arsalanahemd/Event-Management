import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
// import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Event from './pages/Event'
import Signup from './components/Signup'
import Login from './components/Login'
import ChangePass from './components/ChangePass'
import ShowMessages from './pages/Showmessages'
import YourRegistration from './pages/YourRegistration'
import AddCompany from './pages/AddCompany'
// import ShowCompany from './pages/ShowCompany'
// import ShowCompany from './components/ShowCompany'
// import ShowCompany from './pages/ShowCompany'
import ShowCompany from './pages/ShowCompany'
import ParticipateExpo from './pages/ParticipateExpo'
import Yourparticipation from './pages/YourParticipations'
import Rating from "./pages/Rating";

function App() {

  return (
    <>
    <Router>
        <Nav/>
      <Routes>
        <Route path="/rating" element={<Rating />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/events' element={<Event/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/changePass' element={<ChangePass/>}/>
        <Route path='/showmsg' element={<ShowMessages/>}/>
        <Route path='/your-registration' element={<YourRegistration/>}/>
        <Route path='/addYourCompany' element={<AddCompany/>}/>
        <Route path='/showCompany' element={<ShowCompany/>}/>
        <Route path='/participateExpo/:id' element={<ParticipateExpo/>}/>
        <Route path='/Yourparticipation' element={<Yourparticipation/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
    </>
  )
}

export default App
