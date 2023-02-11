/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Button, Dialog, Grid, Typography, TextField, DialogActions, DialogContent,
} from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

const LinkModal = ({
  isOpenModal, handleClose, name, date, timeInterval,
}) => {
  const [link, setLink] = useState('');
  const [linkId, setLinkId] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const getValidationFormErrorMessages = () => {
    let linkError;
    if (link === '') return;
    if (!link.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
      linkError = 'Ссылка дожна быть в формате URL';
    }

    setValidationErrors({
      ...validationErrors,
      linkError,
    });
  };

  return (
    <div>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={e => {
          e.preventDefault();
        }}
        >
          <DialogContent sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>

            <Grid container>

              <Grid container item sx={{ alignItems: 'center', justifyContent: 'space-between', paddingBottom: '26px' }}>
                <Typography id="alert-dialog-title" sx={{ fontSize: '18px', color: '#212529' }}>
                  Изменить ссылку
                </Typography>
                <CloseIcon
                  sx={{
                    width: '14px', height: '14px', color: '#6C757D', cursor: 'pointer',
                  }}
                  onClick={handleClose}
                />
              </Grid>

              <Typography sx={{ fontSize: '16px', color: '#212529' }}>
                {name}
              </Typography>

              <Grid container item sx={{ paddingBottom: '16px' }}>
                <Typography mr="16px" sx={{ color: 'text.secondary' }}>
                  <DateRangeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                  {date}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <AccessTimeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                  {timeInterval}
                </Typography>
              </Grid>

              <Grid container item sx={{ justifyContent: 'space-between', columnGap: '4%' }}>
                <TextField
                  id="lesson_link"
                  label="Ссылка на занятие"
                  name="link"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  required
                  sx={{ width: '48%' }}
                  error={!!validationErrors?.linkError}
                  helperText={validationErrors?.linkError}
                />
                <TextField
                  id="lesson_link"
                  label="Данные для доступа"
                  name="conferenceId"
                  value={linkId}
                  onChange={e => setLinkId(e.target.value)}
                  placeholder="Идентификатор конференции"
                  sx={{ width: '48%' }}
                  error={!!validationErrors?.linkId}
                  helperText={validationErrors?.linkId}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={getValidationFormErrorMessages} autoFocus type="submit">
              Изменить
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default LinkModal;
