import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import Home from './components/pages/Home';
import UsingLine from './components/pages/UsingLine';
import SendMessage from './components/pages/SendMessage';
import BroadCast from './components/pages/BroadCast';
import GreetingMessage from './components/pages/GreetingMessage';
import Activity_a from './components/pages/Activity_a'
import Activity_b from './components/pages/Activity_b'
import Activity_c from './components/pages/Activity_c'
import Activity_d from './components/pages/Activity_d'
import Activity_e from './components/pages/Activity_e'
import Activity_f from './components/pages/Activity_f'
import Activity_all from './components/pages/Activity_all';
import LineVoom from './components/pages/LineVoom';
import MophAlert from './components/pages/MophAlert';
import Liff from './components/pages/Liff';
import GreetingImpression from './components/pages/GreetingImpression';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/line_oa_report' element={<Home />} />
          <Route path='/using-line' element={<UsingLine />} />
          <Route path='/liff' element={<Liff />} />
          <Route path='/send-message' element={<SendMessage />} />
          <Route path='/broadcast' element={<BroadCast />} />
          <Route path='/greeting-message' element={<GreetingMessage />} />
          <Route path='/greeting-ms-impression' element={<GreetingImpression />} />
          <Route path='/activity-a' element={<Activity_a />} />
          <Route path='/activity-b' element={<Activity_b />} />
          <Route path='/activity-c' element={<Activity_c />} />
          <Route path='/activity-d' element={<Activity_d />} />
          <Route path='/activity-e' element={<Activity_e />} />
          <Route path='/activity-f' element={<Activity_f />} />
          <Route path='/activity-all' element={<Activity_all />} />
          <Route path='/line-voom' element={<LineVoom />} />
          <Route path='/moph-alert' element={<MophAlert />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
