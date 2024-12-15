import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {createFeatureCommentService} from "../../../services/comments/commentsService.js";

export function useCreateFeatureComment() {

    // hit endpoint to get user details with email and password
    const {mutate: createFeatureComment, isPending: isCreating} = useMutation({
        mutationFn: createFeatureCommentService,
        onSettled: (data, error) => {
            if (error) {
                toast.error(error.message);
            } else {
                toast.success("SingleComment added...");
            }
        }
    });

    return {createFeatureComment, isCreating};
}