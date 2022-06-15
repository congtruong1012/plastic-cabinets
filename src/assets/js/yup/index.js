import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: ({ label }) => `${label} là bắt buộc`,
  },
});

export default yup;
