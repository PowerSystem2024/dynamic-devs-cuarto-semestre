import { Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import TareasPage from './pages/TareasPage'
import TareasFormPage from './pages/TareasFormPage'
import Navbar from './components/navbar/Navbar';
import { Container } from './components/ui/Container';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { useAuth } from './context/AuthContext'
import { TareaProvider } from './context/TareasContext';

function App() {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return <h1>Cargando...</h1>
    }

    return (<>
        <Navbar />
        <Container className="py-5">
            <Routes>
                <Route element={<ProtectedRoutes isAllowed={!isAuth} redirectTo={'/tareas'} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route element={<ProtectedRoutes isAllowed={isAuth} redirectTo={'/login'} />}>
                    <Route path="/perfil" element={<ProfilePage />} />
                    <Route element={
                        <TareaProvider>
                            <Outlet />
                        </TareaProvider>
                    }>
                        <Route path="/tareas" element={<TareasPage />} />
                        <Route path="/tareas/crear" element={<TareasFormPage />} />
                        <Route path="/tareas/:id/editar" element={<TareasFormPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    </>)
}

export default App;