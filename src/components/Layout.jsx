import Navbar from "./Navbar";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box as="main" flex="1">{children}</Box>
    </>
  );
};

Layout.prototype = {
  children: PropTypes.node.isRequired,
};

export default Layout;
