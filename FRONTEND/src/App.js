import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AddFeedback from './components/AddFeedback';
import AllFeedbacks from './components/AllFeedbacks';
import EditFeedback from './components/EditFeedback';

function App() {
  return (
    <div>
     <Header/>
     <Routes>
      <Route path='/allFeedbacks' exact element={<AllFeedbacks/>}></Route>
      <Route path='/addFeedback' exact element={<AddFeedback/>}></Route>
      <Route path='/editFeedback/:id' element={<EditFeedback />} />
     </Routes>
     
    </div>
  );
}

export default App;