import {Box, styled} from "@mui/material";
import {OutlinedButton} from "../../components/button/Buttons.jsx";
import {useState} from "react";
import CreateFeature from "../feature/CreateFeature.jsx";

const StyledProjectDetailToolbar = styled(Box)(() => ({}));

function ProjectDetailToolbar() {

    const [openCreateFeature, setOpenCreateFeature] = useState(false);

    return (
        <StyledProjectDetailToolbar>
            <OutlinedButton text={"Add Feature"} onClickHandler={() => setOpenCreateFeature(true)}/>
            <CreateFeature open={openCreateFeature} setOpen={setOpenCreateFeature} key={openCreateFeature}/>
        </StyledProjectDetailToolbar>
    );
}

export default ProjectDetailToolbar;