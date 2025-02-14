import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image'

type GuessBoxProps = {
    data: string[] | number;
    state: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const getFontSize = (data: string | string[]) => {
    const text = Array.isArray(data) ? data.join(' ') : data;
    const charCount = text.length; // Count total characters

    if (charCount > 25) return '0.6rem'; // Smallest font for large text
    if (charCount > 8) return '0.7rem';
    if (charCount > 6) return '0.9rem';
    return '1.2rem'; // Default largest font for short text
};

export default function GuessBox(props : GuessBoxProps) {
    const { data, state } = props;

    return (
        <Grid2 component={'div'} size={1.08}>
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
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: Array.isArray(data) ? getFontSize(data) : '1.2rem', // Dynamically adjust the font size
                        lineHeight: 1.2,
                        textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black',
                        zIndex: 1,
                    }}
                >
                    {Array.isArray(data) ? data.join(',\n') : data}
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