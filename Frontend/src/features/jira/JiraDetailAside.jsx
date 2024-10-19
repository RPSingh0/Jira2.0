import {Paper, styled} from "@mui/material";
import JiraDetailAssignedTo from "./JiraDetailAssignedTo.jsx";

const StyledProjectDetailAsideBox = styled(Paper)(({theme}) => ({
    width: "20%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    height: "min-content",

    [theme.breakpoints.down('c1360')]: {
        width: "25%"
    },

    [theme.breakpoints.down('lg')]: {
        width: "30%"
    },

    [theme.breakpoints.down('c1000')]: {
        width: "unset",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        gridAutoFlow: "column"
    },

    [theme.breakpoints.down('c660')]: {
        display: "flex",
    }

}));

function JiraDetailAside() {

    return (
        <StyledProjectDetailAsideBox variant="outlined">
            <JiraDetailAssignedTo/>
        </StyledProjectDetailAsideBox>
    );
}


export default JiraDetailAside;