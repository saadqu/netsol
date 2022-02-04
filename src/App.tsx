import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Feed from './Pages/Feed';
import Login from './Pages/Login';
import { State, StoreProvider } from './Store';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={
            <Navigate to="/" />
          } />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  
  const token = useSelector((state: State) => state.auth.authToken)
  const location = useLocation();
  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
