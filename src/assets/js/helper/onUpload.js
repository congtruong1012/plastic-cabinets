import axiosClient from 'apis';

export default function onUpload({ options, onProgress, onSuccess, onError }) {
  let ele = document.createElement('input');

  Object.assign(ele, { type: 'file', hidden: true }, options);
  document.body.appendChild(ele);
  ele.click();
  ele.onchange = async (e) => {
    try {
      const files = e.target.files;
      const formData = new FormData();
      for (const file of files) {
        formData.append('myFiles', file);
      }
      const images = await axiosClient.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.ceil((progressEvent.loaded * 100) / progressEvent.total) - 1;
          onProgress(percentCompleted);
        },
      });
      onSuccess(images);
    } catch (error) {
      onError(error);
    }
  };
  document.body.removeChild(ele);
}
