import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';

type GuessBoxProps = {
    data: string;
    state: number;
}

export default function GuessBox(props : GuessBoxProps) {
    const { data, state } = props;

    return (
        <Grid2 component={'div'} size={3}>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                }}>
                <Typography variant="h6" component="h6" align="center">{data}</Typography>
            </Box>
        </Grid2>
    );
}