import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {getProjectKeyService} from "../../services/project/projectService.js";

export function useGetProjectKey() {

    // hit endpoint to get user details with email and password
    const {mutate: getProjectKey, isPending: isFetchingProjectKey} = useMutation({
        mutationFn: getProjectKeyService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            }
        }
    });

    return {getProjectKey, isFetchingProjectKey};
}