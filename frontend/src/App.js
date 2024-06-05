import { BrowserRouter } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel'
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <div className="App">
      
      <AdminPanel/>
      {/* <UpdateProfile/> */}
  
    </div>
  );
}

export default App;
