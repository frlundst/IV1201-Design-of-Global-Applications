import { Button } from '@mui/material'
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './Component/Views/Home/Component';
import { textFormatter } from './Internalization/textFormatter';
import { ViewBaseProps } from './Internalization/ViewBaseProps';
import { Login } from './Component/Views/Login/Component';

function App() {

  const navigate = useNavigate();

  // Authentication router

  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if(!authenticated) {
      navigate('/login');
    }
  }, [authenticated])

  // Set up ViewBaseProps

  const [language, setLanguage] = React.useState('en');

  function formatText(code: string) {
    return textFormatter(code, language);
  }

  const viewBaseProps = {
    formatText: formatText
  } as ViewBaseProps

  return (
    <Routes>
      <Route 
        path="/"
        element={<Home {...viewBaseProps} />}
      />

      <Route
        path="/login"
        element={<Login {...viewBaseProps} />}
      />
    </Routes>
  )
}

export default App
