import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import PaginationStyle from "../component_css/Pagination.module.css";

const Pagination = ({ activePage, totalPages, setActivePage }) => {
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems="center" justifyContent="space-between" mt="3" mb="2.8rem">
      <Flex gap="4">
        <Button
          className={
            colorMode === "light"
              ? PaginationStyle.lightBtn
              : PaginationStyle.darkBtn
          }
          onClick={() => setActivePage(activePage - 1)}
          isDisabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          className={
            colorMode === "light"
              ? PaginationStyle.lightBtn
              : PaginationStyle.darkBtn
          }
          onClick={() => setActivePage(activePage + 1)}
          isDisabled={activePage === totalPages}
        >
          Next
        </Button>
      </Flex>

      <Flex gap="2">
        <Text
          className={
            colorMode === "light"
              ? PaginationStyle.lightPageCount
              : PaginationStyle.darkPageCount
          }
        >
          {activePage}
        </Text>
        <Text
          className={
            colorMode === "light"
              ? PaginationStyle.lightPageCount
              : PaginationStyle.darkPageCount
          }
        >
          of
        </Text>
        <Text
          className={
            colorMode === "light"
              ? PaginationStyle.lightPageCount
              : PaginationStyle.darkPageCount
          }
        >
          {totalPages}
        </Text>
      </Flex>
    </Flex>
  );
};

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired,
};

export default Pagination;
