import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import FleetList from './components/FleetList';
import FleetMetrics from './components/FleetMetrics';
import './scss/main.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Map />
      <div className='main'>
        <Sidebar />
        <FleetList />
        <FleetMetrics />
      </div>
    </div>
  );
}

export default App;
