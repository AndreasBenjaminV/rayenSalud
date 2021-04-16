import {PrimarySearchAppBar} from './components/AppBar'
import InputBase from '@material-ui/core/InputBase'
import {MakeUserGrid} from './components/TableContent'
import {SearchBox} from './components/SearchBox'
import {React} from 'react'
import './App.css';




function App() {
  return (
    <div className="App">

      <PrimarySearchAppBar></PrimarySearchAppBar>

      <MakeUserGrid></MakeUserGrid>
            


    </div>
  );
}

export default App;
