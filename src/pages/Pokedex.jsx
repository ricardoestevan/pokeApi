
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Button } from '@mui/material';
import './styles/pokedex.css';
import useFetch from '../hooks/useFetch';
import PokemonCard from '../components/pokedex/PokemonCard';
import PokeSelect from '../components/pokedex/PokeSelect';

const Pokedex = () => {
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemons, getPokemons, getType] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const trainer = useSelector(store => store.trainer);

  useEffect(() => {
    if (selectValue) {
      getType(selectValue);
    } else {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${(currentPage - 1) * 30}`;
      getPokemons(url);
    }
  }, [selectValue, currentPage]);

  useEffect(() => {
    if (pokemons?.count) {
      setTotalPages(Math.ceil(pokemons.count / 30));
    }
  }, [pokemons]);

  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pokeSearch = poke => {
    const perName = poke.name.includes(inputValue);
    return perName;
  };

  return (
    <section className="pokedex">
      <h2 className="pokedex__title">
        <span>Welcome {trainer}, </span> here you can find your favorite Pokemon
      </h2>
      <div className="custom__select">
        <form onSubmit={handleSubmit}>
          <input ref={textInput} type="text" />
          <button>Search</button>
        </form>
        <PokeSelect setSelectValue={setSelectValue} />
      </div>
      <div className="pokedex__container">
        {pokemons?.results.filter(pokeSearch).map(poke => (
          <PokemonCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <div>
      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: '20px' }}>
        <Grid item>
          <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="contained">
            Previous
          </Button>
        </Grid>
        <Grid item>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
        </Grid>
        <Grid item>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
      </div>
    
    </section>
  );
};

export default Pokedex;
