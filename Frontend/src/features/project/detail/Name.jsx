import {useProjectContext} from "../context/ProjectContext.jsx";
import {Rounded2Half} from "../../../components/loader/Loader.jsx";
import LoadOrFetchWrapper from "../../../components/loader/LoadOrFetchWrapper.jsx";
import TypographyH5Heading from "../../../components/heading/TypographyH5.jsx";

function Name() {

    // contexts
    const {loadingProjectDetail, fetchingProjectDetail, projectDetail} = useProjectContext();

    return (
        <LoadOrFetchWrapper
            loading={loadingProjectDetail}
            fetching={fetchingProjectDetail}
            loader={<Rounded2Half/>}>
            <TypographyH5Heading text={`${projectDetail?.name} (${projectDetail?.completionPercentage}% complete)`}/>
        </LoadOrFetchWrapper>
    );
}

export default Name;