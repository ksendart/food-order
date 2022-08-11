import { SideDish, SideDishType } from '../api/interfaces/side-dish';
import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SideDishForm from './form/side-dish-form';

interface SideDishProps {
  addSideDish: (sideDish: Partial<SideDish>) => void;
}

class NewSideDish extends Component<SideDishProps, { modalOpened: boolean; sideDish: Partial<SideDish>}> {
  dishId = 1;
  initialState = {
    modalOpened: false,
    sideDish: {
      name: '',
      type: SideDishType.sauce,
    }
  }
  state = {
    modalOpened: false,
    sideDish: {
      name: '',
      type: SideDishType.sauce,
    }
  };

  render() {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 620,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const handleOpen = () => this.setState({ modalOpened: true });
    const handleClose = () => this.setState({ modalOpened: false });

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      this.props.addSideDish({ ...this.state.sideDish});
      this.setState({ ...this.initialState });
    }
    const addSideDishToPlate = (sideDish: Partial<SideDish>) => {
      // @ts-ignore
      this.setState({ sideDish: sideDish });
    };
    return (
      <>
        <Button variant="contained" onClick={handleOpen}>Add SideDish</Button>
        <Modal
          open={this.state.modalOpened}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='form-container'>
              <SideDishForm dishId={'' + this.dishId++} addSideDish={addSideDishToPlate}></SideDishForm>
              <span className={'actions'}>
                <Button variant="contained" onClick={onSubmit}>Add to Plate</Button>
                <Button variant="contained" onClick={handleClose}>Close Modal</Button>
              </span>
            </div>
          </Box>
        </Modal>
      </>
    );
  }
}

export default NewSideDish;