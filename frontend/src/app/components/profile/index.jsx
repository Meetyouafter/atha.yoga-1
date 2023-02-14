/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Button, Grid, CardActions,
  Dialog, Box, Card, CardContent, CardMedia,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ProfileService from '../../services/auth/profile';
import defaultBackground from '../../../assets/public/defaultBackground.png';
import defaultAvatar from '../../../assets/public/menu-avatar.png';
import Achievement from './achievement';
import achievements from './data';
import './index.scoped.scss';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [openAllDesctiption, setOpenAllDesctiption] = useState(false);
  const [openAchieve, setOpenAchieve] = useState(false);

  const handleOpenAllDesctiption = () => setOpenAllDesctiption(true);
  const handleCloseAllDesctiption = () => setOpenAllDesctiption(false);
  const handleOpenAchieve = () => setOpenAchieve(true);
  const handleCloseAchieve = () => setOpenAchieve(false);

  const pointForAdaptiveToSM = useMediaQuery('(max-width:600px)');

  const navigate = useNavigate();

  useEffect(() => {
    ProfileService.getProfileData()
      .then(response => response.data.data)
      .then(data => setProfileData({ ...profileData, ...data }))
      .catch(error => setErrorMessage(error));
  }, []);

  const {
    about, avatar, first_name, last_name, username, background,
  } = profileData;

  return (
    { errorMessage }
      && (
        <Grid container sx={{ padding: pointForAdaptiveToSM ? '0' : '0px 10%', height: '100vh' }}>
          <Grid item>
            <Card
              variant="outlined"
            >
              {!background ? (
                <CardMedia
                  component="img"
                  height="168"
                  image={defaultBackground}
                  alt="user's background"
                />
              ) : (
                <CardMedia
                  component="img"
                  height="168"
                  image={background}
                  alt="user's background"
                />
              )}
              <CardContent sx={{ height: '100%' }}>
                <Grid item container sx={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    src={defaultAvatar && avatar}
                    sx={{
                      width: 128, height: 128, marginTop: '-80px', marginBottom: '12px',
                    }}
                  />
                  <Typography variant="iter_h1" sx={{ paddingBottom: '3px', display: 'block' }}>
                    {'Имя' && first_name}
                    {' '}
                    {'Фамилия' && last_name}
                  </Typography>
                  <Typography
                    variant="iter_h2"
                    sx={{ paddingBottom: '20px', color: '#6C757D', display: 'block' }}
                  >
                    @
                    {'username' && username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="iter_h2"
                    paragraph
                    my="16px"
                    sx={{
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {about}
                  </Typography>

                  <div>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ textTransform: 'none', left: 'calc(100% - 90px)', position: 'relative' }}
                      onClick={handleOpenAllDesctiption}
                    >
                      Показать ещё
                    </Button>
                    <Dialog
                      open={openAllDesctiption}
                      onClose={handleCloseAllDesctiption}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      sx={{ minWidth: '300px', minHeight: '100px' }}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }}>
                        <Typography variant="iter_h1" sx={{ padding: '0 50px 3px 7px', display: 'block' }}>
                          Описание
                        </Typography>
                        <IconButton
                          aria-label="close"
                          onClick={handleCloseAllDesctiption}
                          sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme => theme.palette.grey[500],
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>
                      <DialogContent>
                        <Typography
                          variant="iter_h2"
                        >
                          {about}
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseAllDesctiption}>
                          Закрыть
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>

                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item sx={{ width: '100%' }}>
            <Card>
              <CardContent>
                <Typography variant="iter_h1" sx={{ fontSize: '16px' }}>
                  Достижения
                </Typography>
                {' '}
                <Typography
                  variant="iter_h2"
                  sx={{ color: '#6C757D', fontSize: '16px' }}
                >
                  (8/30)
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  {achievements.map((achiev, index) => (
                    index <= 4
                      ? (
                        <Achievement
                          open={openAchieve}
                          handleOpen={handleOpenAchieve}
                          handleClose={handleCloseAchieve}
                          key={achiev.id}
                          title={achiev.title}
                          description={achiev.description}
                        />
                      ) : ''
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  size="small"
                  sx={{ textTransform: 'none', left: 'calc(100% - 113px)' }}
                  onClick={() => navigate('/achievement')}
                >
                  Показать больше
                </Button>
              </CardActions>
            </Card>
          </Grid>

        </Grid>
      )
  );
};

export default ProfileCard;
