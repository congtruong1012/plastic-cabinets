export default function onUpload({ options, onSuccess, onError }) {
  let ele = document.createElement('input');
  Object.assign(ele, { type: 'file', hidden: true }, options);
  document.body.appendChild(ele);
  ele.click();
  ele.onchange = (e) => {
    try {
      const files = e.target.files;
      if (Array.isArray([...files])) {
        const res = [...files].map((file) => {
          file.preview = URL.createObjectURL(file);
          return file;
        });
        onSuccess(res);
      } else {
        onError('Lỗi upload');
      }
    } catch (error) {
      onError(error);
    }
  };
  document.body.removeChild(ele);
}
