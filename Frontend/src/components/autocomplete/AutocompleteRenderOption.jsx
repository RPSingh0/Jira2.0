import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

/**
 * This renders autocomplete options with user avatar and name <br>
 * if used, a single option object should have the following properties:
 * > * profile_image
 * > * image_alt_text
 * > * option_text
 *
 * @param props
 * @param option
 * @returns {JSX.Element}
 * @constructor
 */
export function AutoCompleteRenderOptionWithUserAvatar(props, option) {
    const {key, ...other} = props;
    return (
        <ListItem key={key} {...other}>
            <ListItemAvatar>
                <Avatar alt={option['image_alt_text']} src={option['profile_image']}/>
            </ListItemAvatar>
            <ListItemText primary={option['option_text']}/>
        </ListItem>
    );
}

/**
 * This renders autocomplete options with name <br>
 * if used, a single option object should have the following properties:
 * > * option_text
 *
 * @param props
 * @param option
 * @returns {JSX.Element}
 * @constructor
 */
export function AutoCompleteRenderOptionDefault(props, option) {
    const {key, ...other} = props;
    return (
        <ListItem key={key} {...other}>
            <ListItemText primary={option['option_text']}/>
        </ListItem>
    );
}