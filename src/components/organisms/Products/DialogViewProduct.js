import React, { useState } from 'react';
import Dialog from 'components/atoms/Dialog';
import Image from 'components/atoms/Image';
import PropTypes from 'prop-types';
import './style.css';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

function DialogViewProduct(props) {
  const { open, onClose, product } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const getDiscount = () => {
    const price = product?.price || 0;
    const discount = product?.discount || 0;
    return price - (price * discount) / 100;
  };

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
                loop
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {(product?.images || []).map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image ratio="169" image={image} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <br />
              <Swiper
                onSwiper={setThumbsSwiper}
                // loop
                navigation
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[FreeMode, Navigation, Thumbs]}
                style={{
                  '--swiper-navigation-color': '#fff',
                  '--swiper-pagination-color': '#fff',
                  '--swiper-navigation-size': 66,
                }}
              >
                {(product?.images || []).map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image ratio="169" image={image} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <Typography variant="h5" fontWeight={700}>
                {product?.name}
              </Typography>
              <Divider sx={{ width: 50, borderWidth: 3, mt: 2, mb: 1 }} />
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography fontWeight={600} sx={{ my: 2 }} component="s" fontSize="1.5rem">
                  {(product?.price || 0).toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
                <Typography color="error" fontWeight={700} sx={{ my: 2 }} component="span" fontSize="1.5rem">
                  {getDiscount().toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </Typography>
              </Stack>
              <Typography>Danh mục: {product?.category?.name}</Typography>
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
  product: PropTypes.object,
};

export default DialogViewProduct;
