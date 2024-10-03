import {
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Skeleton,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import SearchStyle from "../../page_css/Search.module.css";
import { useEffect, useState } from "react";
import { fetchSearchData } from "../../services/api";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempSearchValue, setTempSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    fetchSearchData(searchValue, activePage)
      .then((res) => {
        setData(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchValue, activePage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
    setActivePage(1);
  };

  return (
    <Container maxWidth="container.xl" marginTop="6.5rem">
      <Flex alignItems="center" gap="4" my="8">
        <Search2Icon
          fontSize="larger"
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
        />
        <Heading
          as="h2"
          fontSize="1.2rem"
          textTransform="uppercase"
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
        >
          Search
        </Heading>
      </Flex>

      <form onSubmit={handleSearch}>
        <Flex alignItems="center">
          <input
            className={
              colorMode === "light"
                ? SearchStyle.lightInput
                : SearchStyle.darkInput
            }
            placeholder="Search for Movies, Series..."
            value={tempSearchValue}
            onChange={(e) => setTempSearchValue(e.target.value)}
          />
          <IconButton
            type="submit"
            height="2.7rem"
            width="2.7rem"
            ml="2"
            bg={colorMode === "light" ? "#b794f49a" : "#805AD5"}
            color={colorMode === "light" ? "#322659" : "#1b0a37"}
            fontSize="1.3rem"
            border={
              colorMode === "light" ? "2px solid #9966cc" : "2px solid #D6BCFA"
            }
            borderRadius="15px"
            aria-label="Search database"
            icon={<SearchIcon />}
            transition="all 0.2s ease-in-out"
            _hover={{
              border:
                colorMode === "light"
                  ? "2px solid #442772"
                  : "2px solid #FAF5FF",
            }}
          />
        </Flex>
      </form>

      {loading && (
        <Flex justifyContent="center" mt="20">
          <Spinner
            size="xl"
            color={colorMode === "light" ? "#6B46C1" : "#E9D8FD"}
          />
        </Flex>
      )}

      {data?.length === 0 && !loading && searchValue && (
        <Heading
          as="h2"
          fontSize="large"
          color={colorMode === "light" ? "#553C9A" : "#E9D8FD"}
          textAlign="center"
          mt="20"
        >
          No Results Found !!
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="5"
        mt="2rem"
        mb="2rem"
      >
        {data?.length > 0 &&
          !loading &&
          data.map((item, i) =>
            loading ? (
              <Skeleton
                key={i}
                height="325px"
                borderRadius="20px"
                startColor="#805AD5"
                endColor="#B794F4"
              />
            ) : (
              <Card key={item.id} item={item} type={item.media_type} />
            )
          )}
      </Grid>

      {data?.length > 0 && !loading && (
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Search;
