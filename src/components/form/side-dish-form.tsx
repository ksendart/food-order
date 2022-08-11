import React, { Component } from 'react';
import { SideDish, SideDishType } from '../../api/interfaces/side-dish';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';

interface SideDishFormProps {
  addSideDish: (sideDish: Partial<SideDish>) => void;
  dishId: string;
}

class SideDishForm extends Component<SideDishFormProps, Partial<SideDish>> {
  state = {
    name: '',
    type: SideDishType.sauce,
  }

  render() {
    const addSideDish = this.props.addSideDish;
    const id = this.props.dishId;
    const onSubmit = () => {
      addSideDish({...this.state, id });
    }
    const handleInputChange = (event: React.ChangeEvent<(HTMLInputElement)>) => {
      this.setState({ [event.target.name]: event.target.value }, onSubmit);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
      this.setState({[event.target.name]: event.target.value}, onSubmit);
    };
    return (
      <div className='form-container'>
          <TextField
            label="Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={handleInputChange}/>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select name="type" value={this.state.type} onChange={handleSelectChange}>
            <MenuItem value={SideDishType.sauce}>Sauce</MenuItem>
            <MenuItem value={SideDishType.garnish}>Garnish</MenuItem>
            <MenuItem value={SideDishType.topping}>Topping</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default SideDishForm;