import {AutoCompleteRenderOptionDefault, AutoCompleteRenderOptionWithUserAvatar} from "./AutocompleteRenderOption.jsx";
import {AutoCompleteRenderInputDefault, AutoCompleteRenderInputWithUserAvatar} from "./AutoCompleteRenderInput.jsx";

export const RenderOptionMap = {
    'user-avatar': AutoCompleteRenderOptionWithUserAvatar,
    'default': AutoCompleteRenderOptionDefault
}

export const RenderInputMap = {
    'user-avatar': AutoCompleteRenderInputWithUserAvatar,
    'default': AutoCompleteRenderInputDefault
}