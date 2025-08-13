import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './ui/components/layouts/Layout';
import HomePage from './ui/Pages/Camper/HomePage';
import CamperPage from './ui/Pages/Camper/CamperPage';
import RoomTable from './ui/components/Room/RoomTable';
import Login from './ui/Pages/User/Login';
import GrantedCodePage from './ui/Pages/GrantedCode/GrantedCodePage';
import RoomPage from './ui/Pages/Room/RoomPage';
import PaymentPage from './ui/Pages/Payments/PaymentPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('jwtToken');

  const LayoutWrapper = () => (
    <Layout>
      <Outlet />
    </Layout>
  );

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutWrapper />}>
          <Route index element={<HomePage />} />
          <Route 
            path="directivo/campers" 
            element={
              <ProtectedRoute>
                <CamperPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="directivo/rooms" 
            element={
              <ProtectedRoute>
                <RoomTable />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="directivo/granted-codes" 
            element={
              <ProtectedRoute>
                <GrantedCodePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="directivo/rooms" 
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            } 
          />

          <Route 
          path="directivo/payments" 
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } 
          />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;