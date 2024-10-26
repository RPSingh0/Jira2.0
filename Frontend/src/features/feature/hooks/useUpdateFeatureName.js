import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateFeatureNameService} from "../../../services/feature/featureService.js";

export function useUpdateFeatureName() {

    const {mutate: updateFeatureName, isPending: isUpdating} = useMutation({
        mutationFn: updateFeatureNameService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Feature name updated`);
            }
        }
    });

    return {updateFeatureName, isUpdating};
}