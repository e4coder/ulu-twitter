import * as React from 'react';
import {
    Box,
    TextField,
    Avatar,
    Button,
    Fab,
} from '@mui/material';
import { updateProfile } from 'firebase/auth';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import { useStoreState } from '../../Store/StoreHooks';

const Profile: React.FC = () => {
    const userInstance = useStoreState(state => state.user.userInstance);
    const [name, setName] = React.useState(userInstance?.displayName ?? '');
    const nav = useNavigate();

    const onFabClick = () => {
        nav('/home');
    }

    const handleUpdateProfile = () => {
        if (userInstance) {
            updateProfile(userInstance, {
                displayName: name
              }).then(() => {
                  alert('profile updated!')
              }).catch((error) => {
                  alert('Error: Profile could not be updated!')
              });
        }
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: '279px'
                    }}
                >
                    <Avatar sx={{height: 125, width: 125}} alt={"User"} src={`https://avatars.dicebear.com/api/micah/${userInstance?userInstance.phoneNumber: 'nomi'}.svg?background=%23000000`} />
                    <TextField value={name} onChange={(e) => setName(e.currentTarget.value)} label="Name" placeholder='Display Name' fullWidth/>
                    <Button onClick={handleUpdateProfile} variant={'contained'} fullWidth> Save </Button>
                </Box>
            </Box>
            {/* Fab Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                }}
            >
                <Fab color="primary" onClick={(e) => {onFabClick()}} aria-label="Tweet">
                    <EditIcon />
                </Fab>
            </Box>
        </React.Fragment>
    )
}

export default Profile;