import { Plate, PlateType } from '../../api/interfaces/plate';
import React, { Component } from 'react';
import { SideDish } from '../../api/interfaces/side-dish';
import Button from '@mui/material/Button';
import NewSideDish from '../new-side-dish';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox, FormControl, FormControlLabel, InputLabel } from '@mui/material';

interface PlateProps {
  addPlateToDay: (plate: Partial<Plate>) => void;
}

class PlateForm extends Component<PlateProps,(Partial<Plate> | null)> {
  state = {
    name: '',
    type: PlateType.salad,
    hasSideDish: false,
    sideDish: [],
  };
  render() {
    const addPlateToDay = this.props.addPlateToDay;

    const onSubmit = () => {
      console.log(this.state);
      addPlateToDay(this.state);
    }
    const addSideDish = (newSideDish: Partial<SideDish>) => {
      // @ts-ignore
      this.setState(({ sideDish }) => ({ sideDish: [...sideDish, newSideDish] }), onSubmit);
    };
    const removeSideDish = (removedSideDish: SideDish) => {
      // @ts-ignore
      this.setState(({ sideDish }) => {
        const index = sideDish.findIndex((_: SideDish) => removedSideDish.name === _.name && removedSideDish.type === _.type);
        return {
          sideDish: [...sideDish.slice(0, index), ...sideDish.slice(index + 1)],
        }
      }, onSubmit);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.type === 'checkbox') {
        // @ts-ignore
        this.setState({ [event.target.name] : event.target.checked }, onSubmit);
      } else {
        this.setState({[event.target.name]: event.target.value}, onSubmit);
      }
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
      this.setState({[event.target.name]: event.target.value}, onSubmit);
    };
    return (
      <div>
        <div className='form-container'>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={handleInputChange} />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select label="Type" name="type" value={this.state.type} onChange={handleSelectChange}>
              <MenuItem value={PlateType.salad}>Salad</MenuItem>
              <MenuItem value={PlateType.main}>Main</MenuItem>
              <MenuItem value={PlateType.desert}>Desert</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            label="Has side dish"
            control={<Checkbox checked={this.state.hasSideDish}
                               onChange={handleInputChange}
                               name="hasSideDish"/>}/>
          { this.state.hasSideDish && this.state.sideDish.length ?
            (
              this.state.sideDish.map((sideDish: SideDish) => (
                <span key={sideDish.id}>
                  <span>{sideDish.name}, {sideDish.type}</span>
                  <span><Button variant="contained" onClick={() => removeSideDish(sideDish)}>remove</Button></span>
                </span>))
            ) : ''
          }
        </div>
        { this.state.hasSideDish && <NewSideDish addSideDish={addSideDish}/> }
      </div>
    )
  }
}

export default PlateForm;