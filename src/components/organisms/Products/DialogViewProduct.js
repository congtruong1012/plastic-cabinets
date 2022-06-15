import React, { useState } from 'react';
import Dialog from 'components/atoms/Dialog';
import Image from 'components/atoms/Image';
import PropTypes from 'prop-types';
import './style.css';
import { Divider, Grid, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

const images = [
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
  'https://swiperjs.com/demos/images/nature-8.jpg',
  'https://swiperjs.com/demos/images/nature-9.jpg',
  'https://swiperjs.com/demos/images/nature-10.jpg',
];

function DialogViewProduct(props) {
  const { open, onClose } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Chi tiết sản phẩm"
      content={
        <>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12} xs={12}>
              <Swiper
                loop={true}
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image ratio="169" image={image} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <br />
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                navigation={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                  '--swiper-navigation-size': 66,
                }}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image ratio="169" image={image} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h5" fontWeight={700}>
                Tủ nhựa 2 cánh lùa cao cấp
              </Typography>
              <Divider sx={{ width: 50, borderWidth: 3, mt: 2, mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Liên hệ báo giá
              </Typography>
              <Typography fontWeight={700} gutterBottom>
                Thông tin sản phẩm Tủ nhựa 2 cánh lùa cao cấp :
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                <li>Kích thước: 100m2.</li>
                <li>
                  Chất liệu : Nhựa cao cấp Ecoplast. (khách hàng có thể lựa chọn đặt chất liệu nhựa theo yêu cầu).
                </li>
                <li>Màu sắc : màu trắng , khách hàng có thể lựa chọn màu sắc dưới đây.</li>
                <li>Bảo hành : Chất liệu nhựa 10 năm, phụ kiện 1 năm.</li>
              </ul>
              <Typography color="error" fontWeight={700} sx={{ my: 2 }}>
                Giá: 1.000.000đ
              </Typography>
            </Grid>
          </Grid>
        </>
      }
      dialogProps={{
        fullWidth: true,
        maxWidth: 'xl',
      }}
    />
  );
}

DialogViewProduct.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default DialogViewProduct;
