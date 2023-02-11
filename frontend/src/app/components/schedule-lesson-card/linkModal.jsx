/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import {
  Button, Dialog, Grid, Typography, TextField, DialogActions, DialogContent, Snackbar, Stack,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import getLessons from '../../services/shedule';

const LinkModal = ({
  isOpenModal, handleClose, name, date, timeInterval, handleMenuClose,
}) => {
  const [link, setLink] = useState('');
  const [linkId, setLinkId] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSendForm, setIsSendForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

  const getValidationFormErrorMessages = () => {
    let linkError;
    if (!link.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
      linkError = 'Ссылка дожна быть в формате URL';
    }
    if (link === '') {
      linkError = 'Обязательное поле';
    }

    setValidationErrors({
      ...validationErrors,
      linkError,
    });
  };

  const handleOpenAlert = () => {
    getValidationFormErrorMessages();
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const postNewLink = () => {
    getLessons()
      .then(handleClose())
      .then(handleMenuClose())
      .then(setIsSendForm(true));
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
          postNewLink();
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

              <Grid container item sx={{ paddingBottom: '16px', paddingTop: '5px' }}>
                <Typography mr="16px" sx={{ color: 'text.secondary' }}>
                  <DateRangeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                  {date}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  <AccessTimeOutlinedIcon fontSize="20" sx={{ mr: '6px', verticalAlign: '-2px', color: '#0D6EFD' }} />
                  {timeInterval}
                </Typography>
              </Grid>

              <Grid container item sx={{ justifyContent: 'space-between', flexDirection: pointForAdaptiveToSM ? 'column' : 'row', columnGap: '4%' }}>
                <TextField
                  id="lesson_link"
                  label="Ссылка на занятие"
                  name="link"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  required
                  sx={{ width: pointForAdaptiveToSM ? '100%' : '48%', margin: pointForAdaptiveToSM ? '10px 0 10px 0' : '0' }}
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
                  sx={{ width: pointForAdaptiveToSM ? '100%' : '48%' }}
                  error={!!validationErrors?.linkId}
                  helperText={validationErrors?.linkId}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: pointForAdaptiveToSM ? 'space-around' : 'right' }}
          >
            <Button onClick={handleClose} sx={{ fontSize: pointForAdaptiveToSM ? '16px' : '14px' }}>Отмена</Button>
            <Stack
              spacing={2}
              sx={{ width: 'auto' }}
            >
              <Button onClick={handleOpenAlert} type="submit" sx={{ fontSize: pointForAdaptiveToSM ? '16px' : '14px' }}>
                Изменить
              </Button>
              {isSendForm ? (
                <Snackbar bodystyle={{ backgroundColor: '#2E7D32' }} open={openAlert} autoHideDuration={500000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                  <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#212121' }}>
                    <Typography sx={{ fontSize: '16px', color: '#212121', fontWeight: '500' }}>
                      Ссылка на занятие изменена
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#212121', fontWeight: '400' }}>
                      Информация отправлена на проверку и обновится в ближайшее время
                    </Typography>
                  </Alert>
                </Snackbar>
              ) : ''}
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default LinkModal;
