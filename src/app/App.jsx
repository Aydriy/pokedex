import React from "react";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board.jsx";
import PokemonCard from "./components/pokemon/PokemonCard.jsx";
import ButtonLeadMore from "./components/ButtonLeadMore.jsx";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="d-flex">
          <div className="container container-custom">
            <div className="row justify-content-md-center pokedex">
              <div className="col-md-auto ">
                <h1>
                  <img
                    src="https://fontmeme.com/permalink/200319/0846c5f29cb94866d7f697d546dbefeb.png"
                    alt="pokemon-font"
                    border="0"
                  />
                </h1>
              </div>
            </div>
            <Switch>
              {/* <Link to={{ pathname: "/pokemon" }} label="pokemon">
                <Board />
              </Link> */}
              <Route exact path="/" component={Board} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
            </Switch>
            <div className="single-card"></div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
