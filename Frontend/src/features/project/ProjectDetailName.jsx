import {useProjectDetailContext} from "./ProjectDetailContext.jsx";
import {Rounded2Half} from "../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../components/loader/LoadOrFetchWrapper.jsx";
import {Typography} from "@mui/material";

function ProjectDetailName() {

    // contexts
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectDetail}
            fetching={fetchingProjectDetail}
            loader={<Rounded2Half/>}>
            <Typography variant={"h5"} gutterBottom>
                {projectDetail?.name}
            </Typography>
        </LoadOrFetchWrapper>
    );
}

export default ProjectDetailName;