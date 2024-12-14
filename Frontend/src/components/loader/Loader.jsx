import {Box, Divider, Paper, Skeleton} from "@mui/material";

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

export function ProjectCardLoadingIndicator() {
    return (
        <>
            {Array.from({length: 3}, (item, index) =>
                <Paper variant="outlined"
                       key={index}
                       sx={{
                           display: "flex",
                           flexDirection: "column",
                           gap: "0.2rem",
                           minWidth: "14rem",
                           padding: "0.5rem"
                       }}>
                    <Skeleton variant="rounded" height={"2.5rem"} animation={"wave"}/>
                    <Divider sx={{margin: "0.5rem 0"}}/>
                    <Skeleton variant="rounded" height={"8.5rem"} animation={"wave"}/>
                    <Divider sx={{margin: "0.5rem 0"}}/>
                    <Skeleton variant="rounded" height={"4.5rem"} animation={"wave"}/>
                </Paper>)}
        </>
    );
}

export function DashboardProjectCardLoadingIndicator() {
    return (
        <>
            {Array.from({length: 4}, (item, index) =>
                <Paper variant="outlined"
                       key={index}
                       sx={{
                           display: "flex",
                           flexDirection: "column",
                           gap: "0.2rem",
                           minWidth: "14rem",
                           padding: "0.5rem"
                       }}>
                    <Skeleton variant="rounded" height={"2.5rem"} animation={"wave"}/>
                    <Divider sx={{margin: "0.5rem 0"}}/>
                    <Skeleton variant="rounded" height={"4.5rem"} animation={"wave"}/>
                </Paper>)}
        </>
    );
}

export function CommentsLoadingIndicator() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        }}>
            {Array.from({length: 4}, (item, index) =>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem"
                }} key={index}>
                    <Skeleton variant="circular" width={24} height={24} animation="wave"/>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        flex: 1
                    }}>
                        <Skeleton variant="rounded" height={"1rem"} animation={"wave"}/>
                        <Skeleton variant="rounded" height={"2.5rem"} animation={"wave"}/>
                    </Box>
                </Box>)
            }
        </Box>
    );
}