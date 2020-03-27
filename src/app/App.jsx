import React, { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Board from "./components/Board.jsx";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/pokemon/Pokemon";
import { getMore, pokemonStore } from "./store";

function App() {
  let [pokemons, setPokemonStore] = useState(pokemonStore.pokemons);
  const getMorePokemons = () => getMore(setPokemonStore);
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
              <Route
                exact
                path="/"
                render={props => (
                  <Board
                    {...props}
                    pokemons={pokemons}
                    getMore={getMorePokemons}
                  />
                )}
              />
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
