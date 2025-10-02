import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Leads from '../Leads/Leads';
import Chat from '../Chat/Chat';
import Others from '../Others/Others';
import Attendance from '../Attendance/Attendance';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/leads" element={<Layout><Leads /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
          <Route path="/others" element={<Layout><Others /></Layout>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
