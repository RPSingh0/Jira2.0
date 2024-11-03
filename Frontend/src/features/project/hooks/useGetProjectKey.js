import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {generateProjectKeyService} from "../../../services/project/projectService.js";

export function useGenerateProjectKey() {

    // hit endpoint to get user details with email and password
    const {mutate: generateProjectKey, isPending: isFetchingProjectKey} = useMutation({
        mutationFn: generateProjectKeyService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            }
        }
    });

    return {generateProjectKey, isFetchingProjectKey};
}