import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image'

type GuessBoxProps = {
    data: string[];
    state: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function GuessBox(props : GuessBoxProps) {
    const { data, state } = props;

    return (
        <Grid2 component={'div'} size={1.7}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    bgcolor: state == 'right' ? '#09c12c' : state == 'partial' ? '#dd850e' : '#d51411',
                    border: '2px solid',
                    borderColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black',
                    position: 'relative'
                }}>
                <Typography
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',   // Hide overflow text
                        textOverflow: 'ellipsis', // Show an ellipsis if text overflows
                        fontSize: 'calc(0.9rem + 0.09vw)', // Dynamically adjust the font size based on viewport width
                        lineHeight: 1.2, // Ensure the line height adjusts if there are multiple lines
                        textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black',
                        zIndex: 1,
                    }}
                >
                    {data.join(',\n')}
                </Typography>
                <img
                    src={`${basePath}/img/arrow.png`}
                    width={'100%'}
                    height={'100%'}
                    alt=""
                    style={{position: 'absolute',
                            transform: state == 'lower' ? '' : 'rotate(180deg)',
                            visibility: state == 'lower' || state == 'higher' ? 'visible' : 'hidden'
                    }}
                />
            </Box>
        </Grid2>
    );
}