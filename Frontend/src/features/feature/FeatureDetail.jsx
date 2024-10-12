import {useParams} from "react-router-dom";

function FeatureDetail() {

    const {projectKey, featureKey} = useParams();

    return (
        <div>
            Project Id: {projectKey}
            <br/>
            Feature Id: {featureKey}
        </div>
    );
}

export default FeatureDetail;