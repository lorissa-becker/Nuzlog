import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton,
  ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './Party.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';
import LevelModal from './LevelModal';

const six = [...Array(6).keys()];

class PartyView extends React.Component {
  constructor() {
    super();
    this.state = {
      value: -1,
      levelOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.openLevel = this.openLevel.bind(this);
    this.closeLevel = this.closeLevel.bind(this);
  }

  handleChange(value) {
    this.setState({value});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.value)
      this.setState({value: -1});
  }

  openLevel() {
    this.setState({levelOpen: true});
  }

  closeLevel() {
    this.setState({levelOpen: false});
  }

  render() {
    return (
      <Panel id='party'>
        <div id='party-tabs' className='pull-left'>
          <ToggleButtonGroup vertical
            type='radio'
            name='party'
            value={this.state.value}
            onChange={this.handleChange}>
            {six.map(index => (
              <ToggleButton value={index} key={index}
                disabled={!this.props.party[index]}
                onClick={this.handleClick}>
                <PokeSlot pokemon={this.props.party[index]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <ButtonGroup id='party-options' vertical block>
            <Button href='#' bsStyle='primary' onClick={this.openLevel}
              disabled={this.state.value == -1}>Level Up</Button>
            <Button href='#' bsStyle='warning'
              disabled={this.state.value == -1}>Moves</Button>
            <Button href='#' bsStyle='warning'
              disabled={this.state.value == -1}>Item</Button>
            <Button href='#' bsStyle='success'
              disabled={this.state.value == -1}>Evolve</Button>
            <Button href='#' bsStyle='info'
              disabled={this.state.value == -1}>Deposit</Button>
            <Button href='#' bsStyle='danger'
              disabled={this.state.value == -1}>Death</Button>
          </ButtonGroup>
        </div>
        <div className='pull-right'>
          <PokeCard pokemon={this.props.party[this.state.value]} />
        </div>

        <LevelModal show={this.state.levelOpen} onHide={this.closeLevel} />
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const Party = connect(mapStateToProps)(PartyView);
export default Party;