import { Routes, Route, useNavigate } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import LandingLayout from './layouts/LandingLayout';
import AppLayout from './layouts/AppLayout';
import { AuthProvider } from './hook/useAuth';
import ProtectedRoute from './routes/ProtectedRoute';
import { useEffect, useState } from 'react';
import axiosInstance from './api/axiosInstance';
import { MyBoxProvider } from './context/Mybox';

function App() {
  const Navigate = useNavigate();
    useEffect(() => {
      const checkTokenValid = async () => {
        const AccessToken = localStorage.getItem('accessToken');
        if (!AccessToken) {
          return;
        }
        try {
          const response = await axiosInstance.get('/auth/verify-token');
          
          const { success } = response.data;

          if (success) {
            // Navigate('/dashboard');
          }
        } catch (error) {
         
        }
      };

      checkTokenValid();
    }, []);

  const [expense, setShowExpense] = useState(false);
  const [income, setShowIncome] = useState(false);

  return (
    <AuthProvider>
      <MyBoxProvider
        value={{ expense, setShowExpense, income, setShowIncome }}
      >
        <Routes>
          {/* Public Routes */}
          {AppRoutes.filter((route) => !route.protection).map(
            (route, index) => {
              const Layout =
                route.layout === 'landing' ? LandingLayout : AppLayout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Layout>{route.element}</Layout>}
                ></Route>
              );
            }
          )}

          {/* Protected Routes (nest under ProtectedRoute) */}
          <Route element={<ProtectedRoute />}>
            {AppRoutes.filter((route) => route.protection).map(
              (route, index) => {
                const Layout =
                  route.layout === 'landing' ? LandingLayout : AppLayout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<Layout>{route.element}</Layout>}
                  >
                    {route.childpath
                      ? route.childpath.map((item, index) => {
                          return (
                            <Route
                              key={index}
                              path={item.path}
                              element={item.element}
                            ></Route>
                          );
                        })
                      : null}
                  </Route>
                );
              }
            )}
          </Route>
        </Routes>
      </MyBoxProvider>
    </AuthProvider>
  );
}

export default App;
