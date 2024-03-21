import { useState, useEffect } from "react";

export default function Formulario() {
  const [pokemon, setPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (!pokemon) return;

      const timer = setTimeout( async () => {
          setPokemonData(null);
          setLoading(true);
          setError('');
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
              if (!response.ok) throw new Error("Pokemon no encontrado");
              const data = await response.json();
              setPokemonData(data);
          }
          catch(error) {
            setError(error.message);
          } finally {
            setLoading(false);
          };
      }, 1000);

      return () => clearTimeout(timer);
  }, [pokemon]);
  return (
      <>
      <h1>Pokedex</h1>
      <form>
        <label htmlFor="pokemon">Busca tu pokémon: </label>
        <input type='text' id='pokemon' value={pokemon} onChange={e=>setPokemon(e.target.value)} placeholder="ej. pikachu"/>
      </form>
      {loading && <div className="loading">Cargando...</div>}
      {error && <div className="error">{error}</div>}
      {pokemonData ? (
        <div className="pokemon">
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      ) : null}
  </>
  )
}