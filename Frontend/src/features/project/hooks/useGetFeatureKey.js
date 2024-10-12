import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {getFeatureKeyService} from "../../../services/feature/featureService.js";

export function useGetFeatureKey() {

    // hit endpoint to get user details with email and password
    const {mutate: getFeatureKey, isPending: isFetchingFeatureKey} = useMutation({
        mutationFn: getFeatureKeyService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            }
        }
    });

    return {getFeatureKey, isFetchingFeatureKey};
}