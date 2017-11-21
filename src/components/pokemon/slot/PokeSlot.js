import React from 'react';
import { Media } from 'react-bootstrap';

import './PokeSlot.css';

import male from 'img/male-small.png';
import female from 'img/female-small.png';

import getFullname from 'utilities/getFullname';

import PokeIcon from '../PokeIcon';

export default class PokeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: props.pokemon};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pokemon: nextProps.pokemon});
  }

  render() {
    const {pokemon} = this.state;
    const name = getFullname(pokemon);

    return (
      <div className='poke-slot clearfix'>
        <div className='icon pull-left'>
          <PokeIcon pokemon={pokemon} />
        </div>
        <div className={pokemon ? '' : 'invisible'}>
          <div className='info pull-left'>
            <div className='clearfix'>
              <div className='name pull-left'>{name ? name : '?'}</div>
              <img className='gender pull-left' src={pokemon ?
                pokemon.gender == 'M' ? male :
                pokemon.gender == 'F' ? female : '' : ''} />
            </div>
            <p className='pull-left'>
              <span className={pokemon && pokemon.level ? '' : 'invisible'}>
                Level {pokemon ? pokemon.level : ''}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}