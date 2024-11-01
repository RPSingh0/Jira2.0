import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateProjectDescriptionService} from "../../../services/project/projectService.js";

export function useUpdateProjectDescription() {

    const {mutate: updateProjectDescription, isPending: isUpdating} = useMutation({
        mutationFn: updateProjectDescriptionService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Project description updated`);
            }
        }
    });

    return {updateProjectDescription, isUpdating};
}