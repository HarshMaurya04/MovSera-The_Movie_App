import { Box, Button, FormLabel, Text, useColorMode } from "@chakra-ui/react";
import { useAuth } from "../context/useAuth";
import StyleSignup from "../component_css/Signup.module.css";

const UserSignUp = ({ onClose }) => {
  const { signInWithGoogle } = useAuth();
  const { colorMode } = useColorMode();

  const handleSignup = (e) => {
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
    <Box as="form" onSubmit={handleSignup} p="4">
      <Box mb="4">
        <FormLabel htmlFor="username" fontWeight="600">
          Email Address
        </FormLabel>
        <input
          className={
            colorMode === "light"
              ? StyleSignup.lightInput
              : StyleSignup.darkInput
          }
          id="username"
          type="email"
          placeholder="name@email.com"
        />
      </Box>
      <Box mb="4">
        <FormLabel htmlFor="password" fontWeight="600">
          Password
        </FormLabel>
        <input
          className={
            colorMode === "light"
              ? StyleSignup.lightInput
              : StyleSignup.darkInput
          }
          id="password"
          type="password"
          placeholder="Enter password"
        />
      </Box>
      <Box mb="4">
        <FormLabel htmlFor="confirmpassword" fontWeight="600">
          Confirm Password
        </FormLabel>
        <input
          className={
            colorMode === "light"
              ? StyleSignup.lightInput
              : StyleSignup.darkInput
          }
          id="confirmpassword"
          type="password"
          placeholder="Enter password again"
        />
      </Box>
      <Button
        className={
          colorMode === "light"
            ? StyleSignup.lightSubmitBtn
            : StyleSignup.darkSubmitBtn
        }
        type="submit"
        mt="2"
        mb="5"
      >
        Sign up
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
          Other Sign up options
        </Text>
        <Button
          mt="4"
          color={colorMode === "light" ? "#322659" : "#E9D8FD"}
          bg={colorMode === "light" ? "#B794F4" : "#44337A"}
          borderRadius="12px"
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: colorMode === "light" ? "#aa86f1" : "#322659",
          }}
          onClick={handleGoogleLogin}
        >
          Sign up with Google
        </Button>
      </Box>
    </Box>
  );
};

export default UserSignUp;
