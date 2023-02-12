/* eslint-disable react/prop-types */
import React from 'react';
import {
  Menu, MenuItem,
} from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const LessonMenu = ({
  anchorEl,
  openMenu,
  handleClickOpenLinkModal,
  handleClickOpenDateModal,
  handleMenuClose,
}) => (
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={openMenu}
    onClose={handleMenuClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <MenuItem onClick={handleClickOpenDateModal}>
      <CompareArrowsIcon sx={{ marginRight: '19px' }} />
      Перенести
    </MenuItem>
    <MenuItem onClick={handleClickOpenLinkModal}>
      <InsertLinkIcon sx={{ marginRight: '19px' }} />
      Изменить ссылку
    </MenuItem>
  </Menu>
);

export default LessonMenu;
