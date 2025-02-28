import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/PrincipalPage';
import ProfesorForm from './pages/profesorFormulario';
import { AuthProvider } from "./context/auth.context";
import { ThemeProvider } from "./context/theme.context";
import Alumnos from './pages/Alumnos';

function App(){
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage /> }/>
          <Route path='/login' element={ <LoginPage /> }/>
          <Route path='/home' element={ <HomePage /> }/>
          <Route path='/add_profesor' element={ <ProfesorForm /> }/>
          <Route path='/alumnos' element={ <Alumnos /> }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>

  )
}

export default App;