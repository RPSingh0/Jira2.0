import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateFeatureDescriptionService} from "../../../services/feature/featureService.js";

export function useUpdateFeatureDescription() {

    const {mutate: updateFeatureDescription, isPending: isUpdating} = useMutation({
        mutationFn: updateFeatureDescriptionService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Feature description updated`);
            }
        }
    });

    return {updateFeatureDescription, isUpdating};
}