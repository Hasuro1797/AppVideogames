import './App.css';
import { Route, Switch }from 'react-router-dom';
import Landing from './Pages/Landing/Landing.jsx';
import Home from './Pages/home/Home.jsx';
import Videogame from './Pages/Videogame/Videogame.jsx';
import AddVideogame from './Pages/Addvideogames/AddVideogame.jsx';
import Error404 from './Pages/Error404/Error404.jsx';



function AppVideoGames() {
  return (
      <>
      <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = "/videogame/:id" component = {Videogame}/>
        <Route exact path = "/addvideogame" component = {AddVideogame}/>
        <Route path = '*' component = {Error404}/>
      </Switch>
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
