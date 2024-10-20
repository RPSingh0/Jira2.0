import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {updateJiraFeatureService} from "../../../services/jira/jiraService.js";

export function useUpdateJiraFeature() {

    const {mutate: updateJiraFeature, isPending: isUpdating} = useMutation({
        mutationFn: updateJiraFeatureService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success(`Jira feature updated`);
            }
        }
    });

    return {updateJiraFeature, isUpdating};
}