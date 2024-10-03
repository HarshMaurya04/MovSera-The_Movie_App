import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </Box>
  );
}

export default App;
