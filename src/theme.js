import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#eee3fa", "#322659")(props),
      color: mode("#322659", "#FAF5FF")(props),
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
