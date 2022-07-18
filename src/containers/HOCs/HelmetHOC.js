import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function HelmetHOC(props) {
  const { title, description } = props;
  return (
    <Helmet defaultTitle="Tủ nhựa Thành Trương">
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

HelmetHOC.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HelmetHOC;
