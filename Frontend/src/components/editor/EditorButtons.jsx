import {
    Code,
    CodeOff,
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    FormatSize,
    Looks3,
    Looks4,
    Looks5,
    Looks6,
    LooksOne,
    LooksTwo,
    StrikethroughS,
    Subject
} from "@mui/icons-material";

import {ListItemIcon, ListItemText, Menu, MenuItem, Typography} from "@mui/material";
import {useState} from "react";
import EditorBaseButton from "../button/EditorBaseButton.jsx";

export function BoldButton({editor}) {
    return (
        <EditorBaseButton
            icon={<FormatBold/>}
            clickHandler={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}/>
    );
}

export function ItalicButton({editor}) {
    return (
        <EditorBaseButton
            icon={<FormatItalic/>}
            clickHandler={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}/>
    );
}

export function CodeButton({editor}) {

    const is_already_in_code_mode = editor.isActive('codeBlock')

    return (
        <EditorBaseButton
            icon={is_already_in_code_mode ? <CodeOff/> : <Code/>}
            clickHandler={() => editor.chain().focus().toggleCodeBlock().run()}
        />
    );
}

export function BulletListButton({editor}) {
    return (
        <EditorBaseButton
            icon={<FormatListBulleted/>}
            clickHandler={() => editor.chain().focus().toggleBulletList().run()}/>
    );
}

export function OrderedListButton({editor}) {
    return (
        <EditorBaseButton
            icon={<FormatListNumbered/>}
            clickHandler={() => editor.chain().focus().toggleOrderedList().run()}/>
    );
}

export function BlockQuoteButton({editor}) {
    return (
        <EditorBaseButton
            icon={<FormatQuote/>}
            clickHandler={() => editor.chain().focus().toggleBlockquote().run()}/>
    );
}

export function StrikeThroughButton({editor}) {
    return (
        <EditorBaseButton
            icon={<StrikethroughS/>}
            clickHandler={() => editor.chain().focus().toggleStrike().run()}/>
    );
}

export function AlignText({editor}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function openMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    return (
        <>
            <EditorBaseButton
                icon={<Subject/>}
                clickHandler={(event) => openMenu(event)}
            />
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
            >
                <MenuItem onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <ListItemIcon>
                        <FormatAlignCenter fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            Center
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <ListItemIcon>
                        <FormatAlignLeft fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            Left
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <ListItemIcon>
                        <FormatAlignRight fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            Right
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                    <ListItemIcon>
                        <FormatAlignJustify fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            Justify
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

export function HeadingFont({editor}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    function openMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function closeMenu() {
        setAnchorEl(null);
    }

    return (
        <>
            <EditorBaseButton
                icon={<FormatSize/>}
                clickHandler={(event) => openMenu(event)}
            />
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
            >
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 1}).run()}>
                    <ListItemIcon>
                        <LooksOne fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H1
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 2}).run()}>
                    <ListItemIcon>
                        <LooksTwo fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H2
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 3}).run()}>
                    <ListItemIcon>
                        <Looks3 fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H3
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 4}).run()}>
                    <ListItemIcon>
                        <Looks4 fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H4
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 5}).run()}>
                    <ListItemIcon>
                        <Looks5 fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H5
                        </Typography>
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => editor.chain().focus().setHeading({level: 6}).run()}>
                    <ListItemIcon>
                        <Looks6 fontSize={"small"} color={"primary"}/>
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">
                            H6
                        </Typography>
                    </ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}