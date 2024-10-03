import { Box, useColorMode } from "@chakra-ui/react";
import "../component_css/Footer.css";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <footer className={colorMode === "light" ? "lightFoot" : "darkFoot"}>
      <Box>
        <p className={colorMode === "light" ? "lightText" : "darkText"}>
          Copyright &copy; MovSera.com
        </p>
      </Box>
    </footer>
  );
};

export default Footer;
