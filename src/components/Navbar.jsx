import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  Button,
  useColorMode,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  Search2Icon,
  MoonIcon,
  SunIcon,
  SearchIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import UserLogin from "./UserLogin";
import UserSignUp from "./UserSignUp";
import NavStyle from "../component_css/Navbar.module.css";

const Navbar = () => {
  const { user, logOut, handleDeleteAccount } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();

  const confirmAndDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await handleDeleteAccount();
        alert("Your account has been deleted successfully.");
      } catch (error) {
        alert("Error deleting account: " + error.message);
      }
    }
  };

  return (
    <>
      <Box
        className={NavStyle.nav}
        py="2.5"
        bgGradient={
          colorMode === "light"
            ? "linear(to-l, #51319b, #9F7AEA, #51319b)"
            : "linear(to-l, #130f21, #1c1534, #130f21)"
        }
      >
        <Container maxWidth="Container.xl">
          <Flex justifyContent="space-between" alignItems="center">
            <NavLink
              to="/"
              className={
                colorMode === "light" ? NavStyle.lightLogo : NavStyle.darkLogo
              }
            >
              <Box px="3">MovSera</Box>
            </NavLink>

            {/* Desktop */}
            <Flex
              alignItems="center"
              gap=" 3"
              display={{ base: "none", md: "flex" }}
            >
              <Button
                className={NavStyle.darkLight}
                size="md"
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                bg={colorMode === "light" ? "#E9D8FD" : "#322659"}
                color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                _hover={{
                  bg: colorMode === "light" ? "#FAF5FF" : "#553C9A",
                }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Flex
                className={
                  colorMode === "light"
                    ? NavStyle.lightLinks
                    : NavStyle.darkLinks
                }
                px="4"
                gap="1.5"
                alignItems="center"
                py="6px"
              >
                <NavLink
                  className={({ isActive }) =>
                    `${
                      colorMode === "light"
                        ? NavStyle.lightPages
                        : NavStyle.darkPages
                    } ${
                      isActive
                        ? colorMode === "light"
                          ? NavStyle.lightActive
                          : NavStyle.darkActive
                        : ""
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      colorMode === "light"
                        ? NavStyle.lightPages
                        : NavStyle.darkPages
                    } ${
                      isActive
                        ? colorMode === "light"
                          ? NavStyle.lightActive
                          : NavStyle.darkActive
                        : ""
                    }`
                  }
                  to="/movies"
                >
                  Movies
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      colorMode === "light"
                        ? NavStyle.lightPages
                        : NavStyle.darkPages
                    } ${
                      isActive
                        ? colorMode === "light"
                          ? NavStyle.lightActive
                          : NavStyle.darkActive
                        : ""
                    }`
                  }
                  to="/shows"
                >
                  TV Shows
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `${
                      colorMode === "light"
                        ? NavStyle.lightPages
                        : NavStyle.darkPages
                    } ${
                      isActive
                        ? colorMode === "light"
                          ? NavStyle.lightActive
                          : NavStyle.darkActive
                        : ""
                    }`
                  }
                  to="/search"
                >
                  <Search2Icon fontSize="xl" />
                </NavLink>
              </Flex>

              {user && (
                <Menu>
                  <MenuButton>
                    <Avatar
                      height="2.7rem"
                      width="2.7rem"
                      bg="#FAF5FF"
                      color="#322659"
                      fontWeight="bolder"
                      name={user?.email}
                    />
                  </MenuButton>
                  <MenuList
                    mt="3"
                    className={
                      colorMode === "light"
                        ? NavStyle.lightMenuList
                        : NavStyle.darkMenuList
                    }
                  >
                    <Link to="/watchlist">
                      <MenuItem
                        mt="2"
                        pd="2"
                        className={
                          colorMode === "light"
                            ? NavStyle.lightMenuItem
                            : NavStyle.darkMenuItem
                        }
                        _hover={{
                          className: NavStyle.menuItem,
                        }}
                      >
                        Watchlist
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem
                      pd="2"
                      className={
                        colorMode === "light"
                          ? NavStyle.lightMenuItem
                          : NavStyle.darkMenuItem
                      }
                      onClick={logOut}
                      _hover={{
                        className: NavStyle.menuItem,
                      }}
                    >
                      Logout
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      mb="2"
                      className={
                        colorMode === "light"
                          ? NavStyle.lightMenuItem
                          : NavStyle.darkMenuItem
                      }
                      onClick={confirmAndDeleteAccount}
                      _hover={{
                        className: NavStyle.menuItem,
                      }}
                    >
                      Delete Account
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
              {!user && (
                <Menu>
                  <MenuButton>
                    <Avatar
                      height="2.7rem"
                      width="2.7rem"
                      bg="gray.400"
                      size="md"
                    />
                  </MenuButton>
                  <MenuList
                    mt="3"
                    className={
                      colorMode === "light"
                        ? NavStyle.lightMenuList
                        : NavStyle.darkMenuList
                    }
                  >
                    <MenuItem
                      mt="2"
                      pb="2"
                      className={
                        colorMode === "light"
                          ? NavStyle.lightMenuItem
                          : NavStyle.darkMenuItem
                      }
                      onClick={onLoginOpen}
                      _hover={{
                        className: NavStyle.menuItem,
                      }}
                    >
                      Log In
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      mb="2"
                      className={
                        colorMode === "light"
                          ? NavStyle.lightMenuItem
                          : NavStyle.darkMenuItem
                      }
                      onClick={onSignUpOpen}
                      _hover={{
                        className: NavStyle.menuItem,
                      }}
                    >
                      Sign Up
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>

            {/* Mobile */}
            <Flex
              display={{ base: "flex", md: "none" }}
              alignItems={"center"}
              gap="2"
            >
              <Link to="/search">
                <IconButton
                  className={NavStyle.darkLight}
                  bg={colorMode === "light" ? "#E9D8FD" : "#322659"}
                  color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                  _hover={{
                    bg: colorMode === "light" ? "#FAF5FF" : "#553C9A",
                  }}
                  icon={<Search2Icon />}
                />
              </Link>

              <Button
                className={NavStyle.darkLight}
                size="md"
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                bg={colorMode === "light" ? "#E9D8FD" : "#322659"}
                color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                _hover={{
                  bg: colorMode === "light" ? "#FAF5FF" : "#553C9A",
                }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <IconButton
                className={NavStyle.darkLight}
                bg={colorMode === "light" ? "#E9D8FD" : "#322659"}
                color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                _hover={{
                  bg: colorMode === "light" ? "#FAF5FF" : "#553C9A",
                }}
                onClick={onOpen}
                icon={<HamburgerIcon />}
              />
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                  bg={colorMode === "light" ? "#E9D8FD" : "#1A202C"}
                  color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                >
                  <DrawerCloseButton />
                  <DrawerHeader>
                    {user ? (
                      <Flex alignItems="center" gap="2">
                        <Avatar
                          bg={
                            colorMode === "light" ? "purple.700" : "purple.600"
                          }
                          size={"sm"}
                          name={user?.email}
                        />
                        <Box fontSize={"sm"}>
                          {user?.displayName || user?.email}
                        </Box>
                      </Flex>
                    ) : (
                      <Avatar
                        size={"sm"}
                        bg={colorMode === "light" ? "gray.700" : "gray.500"}
                      />
                    )}
                  </DrawerHeader>

                  <DrawerBody>
                    <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            colorMode === "light"
                              ? NavStyle.lightPages
                              : NavStyle.darkPages
                          } ${
                            isActive
                              ? colorMode === "light"
                                ? NavStyle.lightActive
                                : NavStyle.darkActive
                              : ""
                          }`
                        }
                        to="/"
                      >
                        Home
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            colorMode === "light"
                              ? NavStyle.lightPages
                              : NavStyle.darkPages
                          } ${
                            isActive
                              ? colorMode === "light"
                                ? NavStyle.lightActive
                                : NavStyle.darkActive
                              : ""
                          }`
                        }
                        to="/movies"
                      >
                        Movies
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          `${
                            colorMode === "light"
                              ? NavStyle.lightPages
                              : NavStyle.darkPages
                          } ${
                            isActive
                              ? colorMode === "light"
                                ? NavStyle.lightActive
                                : NavStyle.darkActive
                              : ""
                          }`
                        }
                        to="/shows"
                      >
                        TV Shows
                      </NavLink>

                      {user && (
                        <>
                          <NavLink
                            className={({ isActive }) =>
                              `${
                                colorMode === "light"
                                  ? NavStyle.lightPages
                                  : NavStyle.darkPages
                              } ${
                                isActive
                                  ? colorMode === "light"
                                    ? NavStyle.lightActive
                                    : NavStyle.darkActive
                                  : ""
                              }`
                            }
                            to="/watchlist"
                          >
                            Watchlist
                          </NavLink>
                        </>
                      )}
                    </Flex>
                  </DrawerBody>

                  <DrawerFooter>
                    {user ? (
                      <>
                        <Flex flexDirection="column" gap="5" w="100%" mb="5">
                          <Button
                            bg={
                              colorMode === "light"
                                ? "purple.800"
                                : "purple.300"
                            }
                            color={
                              colorMode === "light" ? "#FAF5FF" : "purple.900"
                            }
                            borderRadius="14px"
                            width="100%"
                            _hover={{
                              bg:
                                colorMode === "light"
                                  ? "purple.900"
                                  : "purple.200",
                            }}
                            onClick={logOut}
                          >
                            Logout
                          </Button>
                          <Button
                            bg={
                              colorMode === "light"
                                ? "purple.800"
                                : "purple.300"
                            }
                            color={
                              colorMode === "light" ? "#FAF5FF" : "purple.900"
                            }
                            borderRadius="14px"
                            width="100%"
                            _hover={{
                              bg:
                                colorMode === "light"
                                  ? "purple.900"
                                  : "purple.200",
                            }}
                            onClick={confirmAndDeleteAccount}
                          >
                            Delete Account
                          </Button>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex flexDirection="column" gap="5" w="100%" mb="5">
                          <Button
                            bg={
                              colorMode === "light"
                                ? "purple.800"
                                : "purple.300"
                            }
                            color={
                              colorMode === "light" ? "#FAF5FF" : "purple.900"
                            }
                            borderRadius="14px"
                            width="100%"
                            _hover={{
                              bg:
                                colorMode === "light"
                                  ? "purple.900"
                                  : "purple.200",
                            }}
                            onClick={onLoginOpen}
                          >
                            Log In
                          </Button>
                          <Button
                            bg={
                              colorMode === "light"
                                ? "purple.800"
                                : "purple.300"
                            }
                            color={
                              colorMode === "light" ? "#FAF5FF" : "purple.900"
                            }
                            borderRadius="14px"
                            width="100%"
                            _hover={{
                              bg:
                                colorMode === "light"
                                  ? "purple.900"
                                  : "purple.200",
                            }}
                            onClick={onSignUpOpen}
                          >
                            Sign Up
                          </Button>
                        </Flex>
                      </>
                    )}
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        size={{ base: "xs", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "#E9D8FD" : "#6B46C1"}
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
          mt="6rem"
          borderRadius="20px"
          pt="10"
          pb="8"
        >
          <ModalHeader textAlign="center">
            Log in to your MoveSera account
          </ModalHeader>
          <ModalCloseButton mt="1" borderRadius="50%" />
          <ModalBody>
            <UserLogin onClose={onLoginClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        isOpen={isSignUpOpen}
        onClose={onSignUpClose}
        size={{ base: "xs", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "light" ? "#E9D8FD" : "#6B46C1"}
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
          mt="4.5rem"
          borderRadius="20px"
          pt="6"
          pb="4"
        >
          <ModalHeader textAlign="center">
            Sign up and start exploring
          </ModalHeader>
          <ModalCloseButton mt="1" borderRadius="50%" />
          <ModalBody>
            <UserSignUp onClose={onSignUpClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
