import PropTypes from "prop-types";

const Video = ({ id, small }) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

Video.protoType = {
  id: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

export default Video;
