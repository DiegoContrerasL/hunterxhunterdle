import { Box, Typography } from "@mui/material";
import GuessBox from "./GuessBox";

export default function InformationTable() {
    return (
        <Box
            bgcolor={'black'}
            border={2}
            borderColor={'white'}
            borderRadius={4}
            padding={3}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            marginY={2}
        >
            <Typography
                color={'white'}
                fontSize={20}
            >
                Color Indicators
            </Typography>
            <Box
                display={'flex'}
                flexDirection={'row'}
                mt={2}
                gap={1}
            >
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100px'}
                    width={'75px'}
                    gap={1}
                    alignItems={'center'}
                >
                    <GuessBox data={['']} state='right'/>
                    <Typography color="white" fontSize={14}>Right</Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100px'}
                    width={'75px'}
                    gap={1}
                    alignItems={'center'}
                >
                    <GuessBox data={['']} state='wrong'/>
                    <Typography color="white" fontSize={14}>Wrong</Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100px'}
                    width={'75px'}
                    gap={1}
                    alignItems={'center'}
                >
                    <GuessBox data={['']} state='partial'/>
                    <Typography color="white" fontSize={14}>Partial</Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100px'}
                    width={'75px'}
                    gap={1}
                    alignItems={'center'}
                >
                    <GuessBox data={['']} state='higher'/>
                    <Typography color="white" fontSize={14}>Lower</Typography>
                </Box>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    height={'100px'}
                    width={'75px'}
                    gap={1}
                    alignItems={'center'}
                >
                    <GuessBox data={['']} state='lower'/>
                    <Typography color="white" fontSize={14}>Higher</Typography>
                </Box>
            </Box>
        </Box>
    )
}