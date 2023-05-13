
import './App.css';
import Pomodoro from './components/Pomodoro';
import AudioPlayer from './components/AudioPlayer';
import { Header, Footer } from './components/HeaderFooter';

function App() {
  return (
    <div className="App">
        <Header />
        <Pomodoro />
        <AudioPlayer />
        <Footer />
    </div>
  );
}

export default App;
