import * as React from 'react';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Toolbar,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import { useStoreState } from '../../Store/StoreHooks';
import { gun } from '../../gun.instance';

const Home: React.FC = () => {
    interface ITweet {
        fullName: string;
        userName: string;
        userAvatar: string;
        text: string;
    }
    const [tweets, setTweets] = React.useState([] as ITweet[]);
    const [tweetText, setTweetText] = React.useState('');
    const tweetButtong = React.useRef(null as null | HTMLButtonElement);
    
    const userInstance = useStoreState(state => state.user.userInstance);

    const tweetsRef = React.useRef([] as ITweet[]);

    const updateTweets = (tweet: any) => {
        const tw: ITweet = {
            fullName: tweet.fullName,
            userName: tweet.userName,
            userAvatar: tweet.userAvatar,
            text: tweet.text,
        }
        // tweetsRef.current.push(tw);
        // setTweets([...tweetsRef.current]);
        setTweets([...tweets, tw]);
    }

    React.useEffect(() => {
        const gunApp = gun.get('app');
        const subscription = gunApp.get('tweets').map().on(tweet => {
            updateTweets(tweet);
        });
        
        return () => {
            subscription.off();
        }
    }, []);

    // const tweets = [
    //     {
    //         fullName: 'John Doe',
    //         userName: '@johndoe',
    //         userAvatar: 'https://picsum.photos/200/300',
    //         content: {
    //             text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis fugiat deserunt laborum distinctio provident molestias vel earum voluptatem nisi ipsam quibusdam consectetur saepe nam, sed autem enim illo numquam inventore."
    //         }
    //     },
    //     {
    //         fullName: 'John Doe',
    //         userName: '@johndoe',
    //         userAvatar: 'https://picsum.photos/200/300',
    //         content: {
    //             text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dicta ipsa, assumenda fugit temporibus sed iure cupiditate ab, impedit, culpa eligendi blanditiis. Dignissimos error rerum sequi. Itaque placeat in doloribus."
    //         }
    //     },
    //     {
    //         fullName: 'John Doe',
    //         userName: '@johndoe',
    //         userAvatar: 'https://picsum.photos/200/300',
    //         content: {
    //             text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dicta ipsa, assumenda fugit temporibus sed iure cupiditate ab, impedit, culpa eligendi blanditiis. Dignissimos error rerum sequi. Itaque placeat in doloribus."
    //         },
    //     }
    // ]

    // const rooms = [
    //     'Call Of Duty',
    //     'Fortnite',
    //     'League Of Legends',
    //     'Minecraft',
    //     'Rainbow Six Siege',
    //     'Rocket League',
    //     'The Witcher',
    //     'World Of Warcraft',
    // ]

    const tweet = (message: string) => {
        if (userInstance) {
            const gunApp = gun.get('app');
            const gunTweets = gunApp.get('tweets');

            const myTweet = {
                fullName: userInstance.displayName,
                userName: userInstance.phoneNumber,
                userAvatar: `https://avatars.dicebear.com/api/micah/${userInstance?.phoneNumber}.svg?background=%23000000`,
                text: message,
            }
            gunTweets.set(myTweet);
            setTweetText('');

        } else alert('no user logged in!')
    }

    return (
        <React.Fragment>
            <Toolbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    p: 2,
                }}
            >
                {/* Tweets */}
                <Box
                    flex={'1 1 70%'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 2,
                    }}
                    textAlign={'left'}
                >
                    {/* Tweet Form */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2
                        }}
                    >
                        <Box>
                            <Avatar sx={{ width: 65, height: 65 }} alt="User DP" src={`https://avatars.dicebear.com/api/micah/${userInstance ? userInstance.phoneNumber : 'nomi'}.svg?background=%23000000`} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                gap: 2,
                            }}
                        >
                            <TextField
                                id="standard-textarea"
                                placeholder="Tweet!"
                                variant="standard"
                                value={tweetText}
                                onChange={(e) => setTweetText(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        tweetButtong.current?.click();
                                    }
                                }}
                            />
                            <Box
                                sx={{ textAlign: 'right' }}
                            >
                                <Button
                                    ref={tweetButtong}
                                    variant="contained"
                                    color="primary"
                                    size='large'
                                    onClick={() => tweet(tweetText)}
                                >Tweet</Button>
                            </Box>
                        </Box>
                    </Box>
                    {/* Tweet Form End */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            gap: 2,
                            p: 2,
                        }}
                    >
                        {/* Tweet */}
                        {
                            tweets.map((tweet, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        borderTopStyle: 'solid',
                                        borderTopWidth: '2px',
                                        borderTopColor: '#e0e0e0',
                                        mt: 4,
                                        pt: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Avatar sx={{ width: 65, height: 65 }} alt="User DP" src={tweet.userAvatar} />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexGrow: 1,
                                            gap: 2,
                                        }}
                                    >
                                        {/* Content */}
                                        <Box>
                                            <Typography variant="h6">
                                                {tweet.fullName}<a href="#">{tweet.userName}</a>
                                            </Typography>
                                            <Typography variant="body1">
                                                {tweet.text}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }
                        {/* Tweet End */}
                    </Box>

                </Box>

                {/* Hash Tags */}
                {/* <Box
                    flex={'1 1 30%'}
                    position={'relative'}
                    >
                    <Box
                        sx={{
                            boxSizing: 'border-box',
                            borderColor: 'gray.600',
                            borderLeftStyle: 'inset',
                            borderLeftWidth: '2px',
                            height: '86vh',
                            p: 2,
                        }}
                        position={'fixed'}
                    >
                        <Typography variant="h5">
                            Rooms
                        </Typography>
                        <Box>
                            { rooms.map((room, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: 2,
                                        alignItems: 'center',
                                        p: 2,
                                    }}
                                >
                                    <Button variant="contained" color="primary" size='small'>
                                        {room}
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box> */}
            </Box>

            {/* Fab Button */}
            {/* <Box
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                }}
            >
                <Fab color="primary" aria-label="Tweet">
                    <EditIcon />
                </Fab>
            </Box> */}
        </React.Fragment>
    )
}

export default Home;