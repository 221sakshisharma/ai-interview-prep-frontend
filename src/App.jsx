import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {  Dashboard, InterviewPrep, LandingPage } from './pages/index.js'
import UserProvider from './context/userContext.jsx'
function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
        </Routes>
      </BrowserRouter>


      <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize: '13px',
        }
        }}
      />

    </UserProvider>
  )
}

export default App
