import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';

type GuessIconBoxProps = {
    name: string;
    file: string;
}

export default function GuessIconBox(props : GuessIconBoxProps) {
    const { name, file } = props;

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
                    {name}
                </Typography>
                <img
                    src={file}
                    height={'100%'}
                    width={'100%'}
                    alt={name}
                    style={{position: 'absolute'
                    }}
                />
            </Box>
        </Grid2>
    );
}