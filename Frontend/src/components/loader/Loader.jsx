import {Box, Paper, Skeleton} from "@mui/material";

export function Rounded2Half() {
    return (
        <Skeleton variant="rounded" height={"2.5rem"} animation={"wave"}/>
    );
}

export function RoundedText1Half2Lines() {
    return (
        <>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"}/>
        </>
    );
}

export function DescriptionLoadingIndicator() {
    return (
        <Paper variant="outlined" sx={{padding: "1rem"}}>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"80%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"60%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"60%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"70%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"60%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"60%"}/>
            <Skeleton variant="text" sx={{fontSize: '1.5rem'}} animation={"wave"} width={"80%"}/>
        </Paper>
    );
}

export function FeatureJiraLoadingIndicator() {
    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
            <Skeleton variant="rounded" height={"3rem"} animation={"wave"}/>
            <Skeleton variant="rounded" height={"3rem"} animation={"wave"}/>
            <Skeleton variant="rounded" height={"3rem"} animation={"wave"}/>
            <Skeleton variant="rounded" height={"3rem"} animation={"wave"}/>
        </Box>
    );
}