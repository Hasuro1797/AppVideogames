import { Route, Switch }from 'react-router-dom';
import Landing from './Pages/Landing/Landing.jsx';
import Home from './Pages/home/Home.jsx';
import Videogame from './Pages/Videogame/Videogame.jsx';
import AddVideogame from './Pages/Addvideogames/AddVideogame.jsx';
import Error404 from './Pages/Error404/Error404.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import './App.css';




function AppVideoGames() {
  return (
      <>
      <Route path = '/home' component = {NavBar}/>
      <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = "/home/videogame/:id" component = {Videogame}/>
        <Route exact path = "/home/addvideogame" component = {AddVideogame}/>
        <Route exact path = '/*' component = {Error404}/>
      </Switch>
      <Route path = '/home' component = {Footer}/>

      </>
  );
}

// function Homepages(){
//   return (
//     <>
//     <Route path = '/' component = {NavBar}/>
//     <Switch>
//       <Route path = "/videogame/:id" component = {Videogame}/>
//       <Route path = "/addvideogame" component = {AddVideogame}/>
//       <Route exact path = '/' component = {Home}/>
//     </Switch>
//     <Route  path = '/' component = {Footer}/>
    
//     </>
//   )
// }

export default AppVideoGames;
