/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box, styled, Typography } from '@mui/material';
import MenuBar from './MenuBar';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const WrapEditorContent = styled(Box)(({ theme, error }) => ({
  outline: `${error ? theme.palette.error.main : theme.palette.text.disabled} 1px solid`,
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

const Editor = React.forwardRef((props, ref) => {
  const { label, error, helperText, required, content, onChange } = props;
  console.log('Editor ~ content', content);
  const editor = useEditor({
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange({
        text: editor.getText(),
        html,
      });
      if (editor.getText().length === 0) {
        editor.chain().focus().outdent().run();
      }
    },
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
      <WrapEditorContent error={error} ref={ref}>
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
});

Editor.propTypes = {
  content: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
};

export default Editor;
