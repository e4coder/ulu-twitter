import {
    Box,
    TextField,
    MenuItem,
    Button,
    AlertColor,
    Snackbar,
    Alert,
} from '@mui/material';
import * as React from 'react';
import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth'

import { authentication } from '../../firebase';

const prefixes = [
    {
        value: '+92',
        label: '+92'
    },
    {
        value: '+1',
        label: '+1'
    }
]

const Auth: React.FC = () => {
    interface ISnack {
        message: string;
        severity: AlertColor;
    }
    const snacks: ISnack[] = [
        {
            message: 'Please enter a valid phone number',
            severity: 'error',
        },
        {
            message: 'SMS Sent',
            severity: 'success',
        },
        {
            message: 'Invalid OTP',
            severity: 'error',
        },
    ]
    const [snack, setSnack] = React.useState(null as ISnack | null);
    const [snackOpen, setSnackOpen] = React.useState(true);

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('+92');
    const [code, setCode] = React.useState('');
    const [signInDisabled, setSignInDisabled] = React.useState(true);
    const [messageSent, setMessageSent] = React.useState(false);

    const numberField = React.useRef<HTMLInputElement | null>(null);
    const numberSubmit = React.useRef<HTMLButtonElement | null>(null);
    const codeField = React.useRef<HTMLInputElement | null>(null);
    const codeSubmit = React.useRef<HTMLButtonElement | null>(null);

    const generateRecaptcha = () => {
        (window as any).recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication);
    }

    const onRequestOtp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPersistence(authentication, browserLocalPersistence)
            .then(() => {
                if (numberField.current?.value.length !== 10) {
                    setSnack(snacks[0]);
                    setSnackOpen(true);
                    return;
                }
                codeField.current?.classList.remove('hidden');
                codeSubmit.current?.classList.remove('hidden');
                generateRecaptcha();
                const fullNumber: string = `${countryCode}${phoneNumber}`;

                return signInWithPhoneNumber(authentication, fullNumber, (window as any).recaptchaVerifier)
                    .then(async (confirmationResult) => {
                        (window as any).confirmationResult = confirmationResult;
                        setSnack(snacks[1]);
                        setSnackOpen(true);
                        setMessageSent(true);
                    }).catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const verifyOTP = (event: React.ChangeEvent<HTMLInputElement>) => {
        let otp = event.target.value;
        setCode(otp);

        if (otp.length === 6) {
            setSignInDisabled(false);
        } else setSignInDisabled(true);
    }

    const onSignIn = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const confirmationResult: ConfirmationResult = (window as any).confirmationResult;
        confirmationResult.confirm(code).then(async (result) => {
            const user = result.user;
            // console.log(user);
            // nav('/profile', {});
            alert('Signed in as ' + user.phoneNumber);
        }).catch((error) => {

        });
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    height: '100vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '350px',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                        }}
                    >
                        <TextField
                            sx={{
                                flex: '1',
                            }}
                            select
                            label='Country Code'
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                        >
                            {prefixes.map((prefix) => (
                                <MenuItem key={prefix.value} value={prefix.value}>{prefix.label}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            inputRef={numberField}
                            placeholder='Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onKeyUp={(event) => {
                                if (event.key === 'Enter') {
                                    numberSubmit.current?.click();
                                }
                            }}
                        ></TextField>
                    </Box>
                    <Button
                        ref={numberSubmit}
                        variant='contained'
                        size="large"
                        onClick={onRequestOtp}
                    >Request OTP</Button>
                    <TextField
                        inputRef={codeField}
                        disabled={!messageSent}
                        placeholder='OTP'
                        value={code}
                        onChange={verifyOTP}
                    ></TextField>
                    <Button
                        ref={codeSubmit}
                        disabled={signInDisabled}
                        variant='contained'
                        size="large"
                        onClick={onSignIn}
                    >Verify OTP</Button>
                </Box>
            </Box>

            {
                snack && (
                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={3000}
                        onClose={() => setSnackOpen(false)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    // message={message}
                    >
                        <Alert onClose={() => setSnackOpen(false)} severity={snack.severity} sx={{ width: '100%' }}>
                            {snack.message}
                        </Alert>
                    </Snackbar>
                )
            }
            <div id="recaptcha-container"></div>
        </React.Fragment>
    );
}

export default Auth;