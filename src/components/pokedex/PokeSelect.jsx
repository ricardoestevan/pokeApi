import React, { useEffect, useRef } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/pokeSelect.css'

const PokeSelect = ({setSelectValue}) => {

    const [types, getTypes] = useFetch ();
        
    useEffect(() => {
      const url = 'https://pokeapi.co/api/v2/type/';
      getTypes(url)
    }, [])
    
    const selectOption = useRef();

     const handleChange = () =>{
        setSelectValue(selectOption.current.value)
     } 


  return (
    <select className='dropdown' ref={selectOption} onChange={handleChange}>
        <option value="">All Pokemons</option>
        {
            types?.results.map(type =>(
                <option className='dropdown__content' key={type.url} value= {type.url}>{type.name}</option>
            ))
        }
    </select>
  )
}

export default PokeSelect