import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './Component/Views/Home/Component';
import { textFormatter } from './Internalization/textFormatter';
import { ViewBaseProps } from './Internalization/ViewBaseProps';
import { Login } from './Component/Views/Login/Component';
import { Register } from './Component/Views/Register/Component';
import { Person } from './Types/Person';
import { URL } from './Resources/URL';

function App() {

  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(localStorage.getItem("token"));
  const [person, setPerson] = React.useState<Person | null>(null);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  React.useEffect(() => {
    if(token) {
      fetch(`${URL}/api/person/getPerson`, { 
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }).then(response => {
        console.log(response);

        if(response.status === 200) {
          response.json().then(data => {
            setPerson(data);

            if(data.role === "ADMIN") {
              navigate("/admin");
            } else {
              navigate("/");
            }
          });
        } else {
          console.error("Token is invalid");
          localStorage.removeItem("token");
          setToken(null);
        }
      });
    } else {
      navigate("/login");
    }
  }, [token]);

  // Set up ViewBaseProps

  const [language, setLanguage] = React.useState('sv');

  function formatText(code: string) {
    return textFormatter(code, language);
  }

  const viewBaseProps = {
    formatText: formatText,
    person: person
  } as ViewBaseProps

  return (
    <Routes>
      <Route 
        path="/"
        element={<Home {...viewBaseProps} />}
      />

      <Route
        path="/login"
        element={<Login {...viewBaseProps} setToken={setToken} />}
      />

      <Route 
        path="/register"
        element={<Register {...viewBaseProps} />}
      />
    </Routes>
  )
}

export default App
