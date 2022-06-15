import { yupResolver } from '@hookform/resolvers/yup';
import LinkIcon from '@mui/icons-material/Link';
import { IconButton, Stack } from '@mui/material';
import yupCus from 'assets/js/yup';
import Dialog from 'components/atoms/Dialog';
import TextField from 'components/atoms/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

function Link({ editor }) {
  const [openLink, setOpenLink] = React.useState(false);
  const handleOpenLink = () => setOpenLink(true);
  const handleCloseLink = () => setOpenLink(false);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      content: '',
      link: '',
    },
    resolver: yupResolver(
      yupCus.object().shape({
        content: yupCus.string().required().label('Nội dung'),
        link: yupCus.string().required().label('Đường dẫn'),
      }),
    ),
  });
  const handleSetLink = (data) => {
    console.log('handleSetLink ~ data', data);
    let anchors;
    editor
      .chain()
      .focus()
      .command(({ tr }) => {
        // lấy vị trí con trỏ
        anchors = tr.curSelection.anchor;
      })
      .insertContent(data?.content)
      .setTextSelection({ from: anchors, to: data?.content.length + anchors })
      .run();

    editor.chain().focus().setLink({ href: data?.link }).run();

    handleCloseLink();
    reset();
  };
  return (
    <>
      <IconButton onClick={handleOpenLink}>
        <LinkIcon />
      </IconButton>
      <Dialog
        open={openLink}
        onClose={handleCloseLink}
        title="Thêm link liên kết"
        content={
          <Stack spacing={2}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Nội dung"
                  {...field}
                  error={!!errors?.content}
                  helperText={errors?.content?.message}
                />
              )}
            />
            <Controller
              name="link"
              control={control}
              render={({ field }) => (
                <TextField label="Đương dẫn" {...field} error={!!errors?.link} helperText={errors?.link?.message} />
              )}
            />
          </Stack>
        }
        onSubmit={handleSubmit(handleSetLink)}
      />
    </>
  );
}

Link.propTypes = {
  editor: PropTypes.object.isRequired,
};

export default Link;
