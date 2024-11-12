import {useProjectDetailContext} from "../context/ProjectDetailContext.jsx";
import {Rounded2Half} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import TypographyH5Heading from "../../../components/heading/TypographyH5.jsx";

function ProjectDetailName() {

    // contexts
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectDetailContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectDetail}
            fetching={fetchingProjectDetail}
            loader={<Rounded2Half/>}>
            <TypographyH5Heading text={`${projectDetail?.name} (${projectDetail?.completionPercentage}% complete)`}/>
        </LoadOrFetchWrapper>
    );
}

export default ProjectDetailName;