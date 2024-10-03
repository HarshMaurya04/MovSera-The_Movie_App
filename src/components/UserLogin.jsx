import { Box, Button, FormLabel, Text, useColorMode } from "@chakra-ui/react";
import { useAuth } from "../context/useAuth";
import StyleLogin from "../component_css/Login.module.css";

const UserLogin = ({ onClose }) => {
  const { signInWithGoogle } = useAuth();
  const { colorMode } = useColorMode();

  const handleLogin = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Box as="form" onSubmit={handleLogin} p="4">
      <Box mb="5">
        <FormLabel htmlFor="username" fontWeight="600">
          Email Address
        </FormLabel>
        <input
          className={
            colorMode === "light" ? StyleLogin.lightInput : StyleLogin.darkInput
          }
          id="username"
          type="email"
          placeholder="name@email.com"
        />
      </Box>
      <Box mb="5">
        <FormLabel htmlFor="password" fontWeight="600">
          Password
        </FormLabel>
        <input
          className={
            colorMode === "light" ? StyleLogin.lightInput : StyleLogin.darkInput
          }
          id="password"
          type="password"
          placeholder="Enter password"
        />
      </Box>
      <Button
        className={
          colorMode === "light"
            ? StyleLogin.lightSubmitBtn
            : StyleLogin.darkSubmitBtn
        }
        type="submit"
        mt="3"
        mb="6"
      >
        Log in
      </Button>

      <Box textAlign="center">
        <Text
          fontSize="14"
          fontWeight="300"
          color={colorMode === "light" ? "#44337A" : "#FAF5FF"}
          borderBottom={
            colorMode === "light" ? "1px solid #805AD5" : "1px solid #FAF5FF"
          }
          p="3"
        >
          Other log in options
        </Text>
        <Button
          mt="5"
          color={colorMode === "light" ? "#322659" : "#E9D8FD"}
          bg={colorMode === "light" ? "#B794F4" : "#44337A"}
          borderRadius="12px"
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: colorMode === "light" ? "#aa86f1" : "#322659",
          }}
          onClick={handleGoogleLogin}
        >
          Log in with Google
        </Button>
      </Box>
    </Box>
  );
};

export default UserLogin;
