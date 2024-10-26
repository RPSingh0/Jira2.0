import {Box, Paper, styled, Typography} from "@mui/material";

const StyledProjectDetailAsideBox = styled(Paper)(({theme}) => ({
    width: "23%",
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

const StyledProjectDetailAsideItemBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
}));

const StyledProjectDetailAsideLeadByBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
}));

function ProjectDetailAside() {

    return (
        <StyledProjectDetailAsideBox variant="outlined">
            <StyledProjectDetailAsideLeadByBox>
                <Typography variant="body1" gutterBottom>
                    Lead By
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Xenovia Gremory
                </Typography>
            </StyledProjectDetailAsideLeadByBox>
            <AsideItem itemKey={"Open Issues"} itemValue={30}/>
            <AsideItem itemKey={"Done Issues"} itemValue={400}/>
            <AsideItem itemKey={"Started"} itemValue={"22/12/2024"}/>
            <AsideItem itemKey={"End (Expected)"} itemValue={"26/12/2024"}/>
            <AsideItem itemKey={"Day Spent"} itemValue={"500 Days"}/>
        </StyledProjectDetailAsideBox>
    );
}

function AsideItem({itemKey, itemValue}) {
    return (
        <StyledProjectDetailAsideItemBox>
            <Typography variant="body1" gutterBottom>
                {itemKey}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {itemValue}
            </Typography>
        </StyledProjectDetailAsideItemBox>
    );
}

export default ProjectDetailAside;