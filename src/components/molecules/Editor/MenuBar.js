import CodeIcon from '@mui/icons-material/Code';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import RedoIcon from '@mui/icons-material/Redo';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import UndoIcon from '@mui/icons-material/Undo';
import { Divider, IconButton, Stack } from '@mui/material';
import CodeBlockIcon from 'icons/CodeBlockIcon';
import PropTypes from 'prop-types';
import React from 'react';
import Dropdown from '../Dropdown';
import Menu from '../Menu';
import Image from './Image';
import Link from './Link';

function MenuBar({ editor }) {
  const typoOptions = [
    { label: 'Normal', onClick: () => editor.chain().focus().setParagraph().run() },
    { label: 'Heading 1', onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Heading 4', onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run() },
    { label: 'Heading 5', onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run() },
    { label: 'Heading 6', onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run() },
  ];
  const alignOptions = [
    { label: 'Left', icon: <FormatAlignLeftIcon />, onClick: () => editor.chain().focus().setAlignment('left').run() },
    {
      label: 'Center',
      icon: <FormatAlignCenterIcon />,
      onClick: () => editor.chain().focus().setAlignment('center').run(),
    },
    {
      label: 'Right',
      icon: <FormatAlignRightIcon />,
      onClick: () => editor.chain().focus().setAlignment('right').run(),
    },
    {
      label: 'Justify',
      icon: <FormatAlignJustifyIcon />,
      onClick: () => editor.chain().focus().setAlignment('justify').run(),
    },
  ];

  return (
    <div>
      <Stack direction="row" sx={{ px: 1, py: 1 }} flexWrap="wrap">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughSIcon />
        </IconButton>
        <Dropdown
          DropdownButton={IconButton}
          dropdownButtonProps={{
            children: <FormatSizeIcon />,
          }}
          DropdownContent={<Menu routes={typoOptions} menuItemProps={{ dense: true }} />}
          dropdownProps={{
            placement: 'bottom',
          }}
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <CodeIcon />
        </IconButton>
        <Dropdown
          DropdownButton={IconButton}
          dropdownButtonProps={{
            children: <FormatAlignLeftIcon />,
          }}
          DropdownContent={
            <Stack direction="row" spacing={1} sx={{ p: 1 }}>
              {alignOptions.map(({ label, icon, onClick }) => (
                <IconButton key={label} onClick={onClick}>
                  {icon}
                </IconButton>
              ))}
            </Stack>
          }
          dropdownProps={{
            placement: 'bottom',
          }}
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <FormatListBulletedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FormatListNumberedIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <CodeBlockIcon />
        </IconButton>
        <IconButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <FormatQuoteIcon />
        </IconButton>
        <Link editor={editor} />
        <Image editor={editor} />
        <IconButton onClick={() => editor.chain().focus().undo().run()}>
          <UndoIcon />
        </IconButton>
        <IconButton onClick={() => editor.chain().focus().redo().run()}>
          <RedoIcon />
        </IconButton>
      </Stack>
      <Divider />
    </div>
  );
}

MenuBar.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default MenuBar;
