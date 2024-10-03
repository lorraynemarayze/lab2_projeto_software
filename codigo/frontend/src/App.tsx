import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { NavbarMinimal } from './components/Navbar/NavbarMinimal'
import { MantineContext, MantineProvider } from '@mantine/core'
import {AuthenticationForm} from './components/Login&Cadastro/Login&Cadastro'

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      {<BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarMinimal />} />
          <Route path="/login" element={<AuthenticationForm />} />
          </Routes>
          </BrowserRouter>}
    </MantineProvider>
  )
}

export default App
