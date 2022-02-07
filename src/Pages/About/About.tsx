import * as React from 'react';
import {
    Toolbar,
    Typography
} from '@mui/material';

const About : React.FC = () => {
    return (
        <React.Fragment>
            <Toolbar />
            <Typography variant="h1">
                About
            </Typography>
            <Typography variant="h5">
                Twitter like Decentralized Message Posting Application built with React, TypeScript, Gun.js, and Firebase.
            </Typography>
        </React.Fragment>
    )
}

export default About;