import Grid2 from '@mui/material/Grid2';
import GuessIconBox from './GuessIconBox';
import GuessBox from './GuessBox';

type GuessBoxProps = {
    data: string[] | number;
    state: string;
}

type GuessIconBoxProps = {
    name: string;
    file: string;
}

type GuessRowProps = {
    icon: GuessIconBoxProps;
    guesses: GuessBoxProps[];
}


export default function GuessRow(props : GuessRowProps) {
    const { icon, guesses } = props;

    return (
        <Grid2 container component={'div'} size={12} spacing={1} sx={{ width: '100%', height: '75px', minWidth: '400px' }}>
            <GuessIconBox name={icon.name} file={icon.file} />
            {guesses.map((guess, index) => {
                return (
                    <GuessBox key={index} data={guess.data} state={guess.state} />
            )})}
        </Grid2>
    );
}