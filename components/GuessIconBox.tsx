import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

type GuessIconBoxProps = {
    name: string;
    file: string;
};

const getFontSize = (data: string) => {
    const charCount = data.length;
    if (charCount > 25) return '0.6rem';
    if (charCount > 8) return '0.7rem';
    if (charCount > 6) return '0.9rem';
    return '1.2rem';
};

export default function GuessIconBox(props: GuessIconBoxProps) {
    const { name, file } = props;
    const [hover, setHover] = useState(false);

    return (
        <Grid2 component={'div'} size={1.08}>
            <Box
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                sx={{
                    width: '75px',
                    height: '75px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    border: '2px solid',
                    borderColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                <img
                    src={file}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                />
                {hover && (
                    <Typography
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: getFontSize(name),
                            lineHeight: 1.2,
                            textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black',
                            zIndex: 2,
                            position: 'absolute',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '4px',
                            borderRadius: '4px'
                        }}
                    >
                        {name}
                    </Typography>
                )}
            </Box>
        </Grid2>
    );
}