import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavbarMinimal } from './components/Navbar/NavbarMinimal'
import { MantineContext, MantineProvider } from '@mantine/core'
import {AuthenticationForm} from './components/Login&Cadastro/Login&Cadastro'
import { FeaturesCard } from "./components/Carros/FeaturesCard";
import { Tabela } from "./components/Table/Table";

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      {<BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarMinimal />} />
          <Route path="/login" element={<AuthenticationForm />} />
          <Route path="/carros" element={<FeaturesCard />} />
          <Route path="/tabela" element={<Tabela />} />
          </Routes>
          </BrowserRouter>}
    </MantineProvider>
  )
}

export default App
