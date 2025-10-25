
import './App.css';
import { useState } from 'react';
import LoginPage from './components/Auth/Login';
import CreatorDashboard from './components/Dashboard/CreatorDashboard';
import MarketingDashboard from './components/Dashboard/MarketingDashboard';


function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => setRole(null);

  return (
    <div>
      {!role && <LoginPage onLogin={setRole} />}
      {role === "creator" && <CreatorDashboard onLogout={handleLogout} />}
      {role === "marketing" && <MarketingDashboard onLogout={handleLogout} />}
    </div>
  );
}
export default App;
