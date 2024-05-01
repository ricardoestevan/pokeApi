import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import "./styles/pokeInfo.css"

const PokeInfo = () => {

  const params = useParams();

  const [pokemon, getPokemon] = useFetch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
    getPokemon(url)
  }, [])

  console.log(pokemon)

  return (
    <section   className='poke__main'>
    <header>
      <img src="" alt=""/>
    </header>
      <figure>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon img" />
      </figure>
      <span className='poke__id'>#{pokemon?.id}</span>
      <h2>{pokemon?.name}</h2>
      <ul className='poke__lichar'>
        <li><span>weight </span><span>{pokemon?.weight}</span></li>
        <li><span>height </span><span>{pokemon?.height}</span></li>
      </ul>
      <div>
        <article className='poke__type'>
          <h3>Type</h3>
          <ul>
            {
              pokemon?.types.map(type => (
                <li key={type.type.url}>{type.type.name}</li>
              ))
            }
          </ul>
        </article>
        <article  className='poke__char'>
          <h3>Skills</h3>
          <ul className='poke__skills'>
            {
              pokemon?.abilities.map(skill => (
                <li key={skill.ability.url}>{skill.ability.name}</li>
              ))
            }
          </ul>
        </article>
        <h2>Stats</h2>
        <ul className='poke__stats'>
          {
            pokemon?.stats.map(stat => (
              <li key={stat.stat.url}>
                <span>{stat.stat.name}</span>
                <span> {stat.base_stat}/150</span>
                <progress className='poke_prog' value={stat.base_stat} max={150}></progress>
              </li>
            ))
          }
        </ul>
        <h2>Movements</h2>
        <ul className='poke__movements'>
          {
            pokemon?.moves.map(move =>(
              <li className='poke__movements' key={move.move.url}>{move.move.name}</li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default PokeInfo
