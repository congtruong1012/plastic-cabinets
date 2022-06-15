import React from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, styled, Typography } from '@mui/material';
import MenuBar from './MenuBar';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const WrapEditorContent = styled(Box)(({ theme }) => ({
  outline: `${theme.palette.text.disabled} 1px solid`,
  borderRadius: 4,
}));

const StyledEditor = styled(EditorContent)(({ theme, error }) => ({
  minHeight: 200,
  maxHeight: 500,
  overflowY: 'auto',
  '& .ProseMirror-focused': {
    outline: 'none',
  },
  '& .ProseMirror': {
    // set khoảng cách từ border đến content
    padding: '1px 16px',
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    // focus vào hình thêm outline để nhận biết
    '& .ProseMirror-selectednode': {
      '& img': {
        outline: `2px solid ${error ? theme.palette.error.main : '#68CEF8'}`,
      },
    },
    '& a': {
      cursor: 'pointer',
    },
  },
}));

function Editor(props) {
  const { label, error, helperText, required } = props;
  const editor = useEditor({
    content: '',
    extensions: [
      StarterKit,
      Link,
      Image.extend({
        renderHTML({ HTMLAttributes }) {
          const { style } = HTMLAttributes;
          return ['div', { style }, ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]];
        },
      }),
    ],
  });

  return (
    <>
      <WrapEditorContent error={error}>
        <Typography sx={{ px: 2, pt: 1 }}>
          {label}{' '}
          {required && (
            <Typography variant="body2" color="error" component="span">
              *
            </Typography>
          )}
        </Typography>
        {editor && <MenuBar editor={editor} />}
        <StyledEditor editor={editor} />
      </WrapEditorContent>
      {helperText && (
        <Typography variant="caption" color="error" sx={{ pt: 2 }}>
          {helperText}
        </Typography>
      )}
    </>
  );
}

Editor.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
};

export default Editor;
