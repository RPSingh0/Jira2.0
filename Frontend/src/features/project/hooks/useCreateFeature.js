import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createFeatureService} from "../../../services/feature/featureService.js";

export function useCreateFeature() {

    // hit endpoint to get user details with email and password
    const {mutate: createFeature, isPending: isCreating} = useMutation({
        mutationFn: createFeatureService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("Feature created...");
            }
        }
    });

    return {createFeature, isCreating};
}