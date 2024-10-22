
import './App.css'
import AuthProvider from './context/AuthContext'
import Page from './page/Page'

function App() {

  return (
    <>
    <AuthProvider>
      <Page/>
    </AuthProvider>
    </>
  )
}

export default App
