
import Slider from './components/Slider'
import './App.css'
import Audio from '../src/assets/images/christmas.mp3';

function App() {
 
  return (
    <>
         <audio 
            id="background-music" 
            src={Audio}
            autoPlay 
            loop 
        />


         <Slider /> 
    </>
  )
}

export default App
