import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App () {
  const [pokemon, setPokemon] = useState("");
  const [result, setResult] = useState("")
  const [loadState, setLoadState] = useState("No input for search detected");
  const [error, setError] = useState("");

  const baseLink = 'https://pokeapi.co/api/v2/pokemon/';

  const getPokemon = async () => {
    let response;

    try {
      if(pokemon !== "") {
        response = await axios.get(baseLink+pokemon)
        setLoadState('Pokemon found')
        setResult(response.data);
      }    
    } catch (error) {
      setLoadState('Pokemon not found')
      setError(error);      
      setResult("");
    }
  }

  const searchBox = (e) => {
    if(e.target.value === "") {
      setLoadState("No input for search detected");
    } else {
      setPokemon(e.target.value.toLowerCase().trim());
    }
  }

  useEffect(() => {
    getPokemon();
  }, [pokemon]);


  return  ( <>
    <h1>Pokemon search!</h1>
    <form>
      <label htmlFor="pokeSearch">Search for a pokemon</label>
      <input type='text' id="pokeSearch" onChange={(e) => searchBox(e)}></input>
    </form>
    {pokemon && <p>{loadState}</p>}
    {result &&
    <div className='pokeDisplay'>
      <p><span>Name:</span> {result.name}</p>
      <p><span>Height:</span> {parseFloat((result.height * 0.1).toPrecision(3))} m</p>
      <p><span>Weight:</span> {parseFloat((result.weight * 0.1).toPrecision(3))} kg</p>
      <img src={result.sprites.other.home.front_default} />
    </div>}
  </>)
};

export default App;
