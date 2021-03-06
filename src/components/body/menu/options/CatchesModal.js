import React from 'react';
import { Modal, Button,
  FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

import StickyTable from 'components/other/StickyTable';

import PokeSlot from 'components/pokemon/slot/PokeSlot';
import { switchBox, switchSlot, failCatch } from 'actions';

class CatchesModal extends React.Component {
  constructor() {
    super();
    this.state = {location: ''};
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEnter() {
    this.setState({location: ''});
    this.input.focus();
  }

  handleClick(slot) {
    const {onHide, onSwitchBox, onSwitchSlot} = this.props;
    if (slot.party >= 0) {
      onHide();
      onSwitchBox(1);
      onSwitchSlot(1, slot.party);
    } else if (slot.pc >= 0) {
      onHide();
      onSwitchBox(2);
      onSwitchSlot(2, slot.pc);
    } else if (slot.cemetery >= 0) {
      onHide();
      onSwitchBox(3);
      onSwitchSlot(3, slot.cemetery);
    }
  }

  handleSubmit(e) {
    this.props.onFailCatch(this.state.location);
    this.setState({location: ''});
    e.preventDefault();
  }
  
  render() {
    const {location} = this.state;

    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Catches</h2></Modal.Header>
        <Modal.Body>
          <StickyTable>
            <StickyTable.THead>
              <tr>
                <th width='50%'>Location</th>
                <th width='50%'>Catch</th>
              </tr>
            </StickyTable.THead>
            <StickyTable.TBody height='400px'>
              {this.props.pokemon.map((pokemon, index) => {
                //const slot = pokemon.slot;
                return (
                  <tr key={index}>
                    <td width='50%'>{pokemon.location}</td>
                    <td width='50%'>
                      {pokemon.species ? /*(
                        <Button onClick={() => this.handleClick(slot)}>*/
                          <PokeSlot pokemon={pokemon} />
                          /*{slot ? (
                            slot.party >= 0 ?
                              'Party: ' + (parseInt(slot.party) + 1) :
                            slot.pc >= 0 ?
                              'PC: ' + (parseInt(slot.pc) + 1) :
                            slot.cemetery >= 0 ?
                              'Cemetery: ' + (parseInt(slot.cemetery) + 1) : ''
                          ) : ''}
                        </Button>
                      )*/ : <span>Failed catch</span>}
                    </td>
                  </tr>
                )
              })}
            </StickyTable.TBody>
          </StickyTable>
          <br />
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Record Failed Catch:</ControlLabel>
              <InputGroup>
                <FormControl placeholder='Enter location' value={location}
                  onChange={e => this.setState({location: e.target.value})}
                  inputRef={ref => this.input = ref} />
                <InputGroup.Button>
                  <Button type='submit' bsStyle='danger' disabled={!location}>
                    Record
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSwitchBox: box => dispatch(switchBox(box)),
    onSwitchSlot: (box, slot) => dispatch(switchSlot(box, slot)),
    onFailCatch: location => dispatch(failCatch(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatchesModal);