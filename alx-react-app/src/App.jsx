import './App.css'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'

function App() {
  return (
    <>
      <Header />
      <UserProfile name="Uzogo Onyinyechi" age={25} bio="Loves yoghurt drink" />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
