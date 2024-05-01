import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/pokemonCard.css'
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({url}) => {
   
    const [pokemon, getPokemon] = useFetch();

     const navigate = useNavigate ();

    useEffect(() => {
      getPokemon(url)
    }, [])

    const handlePokemon = () => {
        navigate (`/pokedex/${pokemon.id}`)
    }
 
  return (
    <article onClick={handlePokemon} className='pokecard'>
    <div className={`pokecard__back ${pokemon?.types[0].type.name}`}></div>
        <figure className='pokecard__img'>
            <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokecard_image"/>
        </figure>
        <h3 className='pokecard__name'>{pokemon?.name}</h3>
        <ul className='pokecard__types'>
            {
                pokemon?.types.map(type => ( 
                    <li className={`slot${type.slot}`} key={type.type.url}>{type.type.name}</li>
                ))
            }
        </ul>
        <span>type</span>
        <hr/>
        <ul className='pokecard__stats'>
            {
                pokemon?.stats.map(stat => (
                    !stat.stat.name.includes('-') &&
                    <li key={stat.stat.url}><span>{stat.stat.name}</span><span>{stat.base_stat}</span></li>
                ))
            }
        </ul>
    </article>
  )
}

export default PokemonCard



