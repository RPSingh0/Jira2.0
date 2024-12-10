import {EditorContent} from "@tiptap/react";
import {Paper, styled} from "@mui/material";
import EditorToolbar from "./EditorToolbar.jsx";
import {grey} from "@mui/material/colors";

const StyledEditorPaper = styled(Paper, {
    shouldForwardProp: prop => prop !== 'isEditorMode'
})(({theme, height, isEditorMode = false}) => ({
    padding: "0.5rem",
    border: isEditorMode ? `1px solid ${grey["400"]}` : '',
    color: theme.palette.defaultBlack.main,
    transition: "all 0.2s ease",

    "&:hover": {
        backgroundColor: isEditorMode ? '' : grey["200"],
    },

    "& .tiptap.ProseMirror": {
        outline: 'none',
        padding: '0 0.5rem 0.5rem 0.5rem',
        height: isEditorMode ? height || "12rem" : 'max-content',
        maxWidth: "100%",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        overflowX: "auto",


        "& div:first-of-type": {
            marginTop: "0.5rem"
        },
    },

    "& ul, ol": {
        padding: '0 1rem',
        margin: '1.25rem 1rem 1.25rem 0.4rem',

        "& li p": {
            marginTop: '0.25em',
            marginBottom: '0.25em'
        }
    },

    "& h1, h2, h3, h4, h5, h6": {
        lineHeight: '1.1',
        marginTop: '2.5rem',
        textWrap: 'pretty'
    },

    "& h1, h2": {
        marginTop: '3.5rem',
        marginBottom: '1.5rem'
    },

    "& h1": {
        fontSize: '1.4rem'
    },

    "& h2": {
        fontSize: '1.2rem'
    },

    "& h3": {
        fontSize: '1.1rem'
    },

    "& h4, h5, h6": {
        fontSize: '1rem'
    },

    "& pre": {
        background: grey[900],
        borderRadius: '0.5rem',
        color: "white",
        fontFamily: 'JetBrainsMono, monospace',
        margin: '1.5rem 0',
        padding: '0.75rem 1rem',

        "& code": {
            background: 'none',
            color: 'inherit',
            fontSize: '0.8rem',
            padding: '0'
        }
    },

    "& blockquote": {
        background: grey[200],
        borderLeft: `3px solid ${grey[600]}`,
        margin: '1.5rem 0',
        padding: "0.5rem",

        "& p": {
            margin: '0 !important'
        }
    },

    "& hr": {
        border: 'none',
        borderTop: `1px solid ${grey[500]}`,
        margin: '2rem 0'
    },

    "& .tiptap.ProseMirror :first-child": {
        marginTop: "0.5rem"
    }

}));

function TextEditor({editor, height}) {

    if (editor.isEditable) {
        return (
            <StyledEditorPaper elevation={0} height={height} isEditorMode={true}>
                <EditorToolbar editor={editor}/>
                <EditorContent editor={editor}/>
            </StyledEditorPaper>
        );
    }

    return (
        <StyledEditorPaper elevation={0} height={height}>
            <EditorContent editor={editor}/>
        </StyledEditorPaper>
    );
}

export default TextEditor;