import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setTrainer } from '../store/slices/trainer.slice';
import { useNavigate } from 'react-router-dom';
import "./styles/homePage.css"

const HomePage = () => {

    const dispatch = useDispatch();

    const textInput = useRef();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setTrainer(textInput.current.value.trim()));
        textInput.current.value = '';
        navigate('/pokedex');
    }

  return (
    <div className='hp__main'>
      {/* <figure>
        <img className='hp__img' src='/img/background2.jpeg' alt=""/>
      </figure> */}
        <h1>Hi Trainer</h1>
        <h2>Type in your name to start</h2>
        <form onSubmit={handleSubmit}>
            <input ref={textInput} type="text"/>
            <button>Start</button>
        </form>
    </div>
  )
}

export default HomePage