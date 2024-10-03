import {
  Container,
  Grid,
  Heading,
  Skeleton,
  Flex,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { fetchMovies } from "../../services/api";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import MovieStyle from "../../page_css/Movies.module.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("sortByMovies") || "vote_count.desc"
  );
  const [activePage, setActivePage] = useState(
    () => localStorage.getItem("activePageMovies") || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    fetchMovies(activePage, sortBy)
      .then((res) => {
        setMovies(res?.results);
        setActivePage(res?.page);
        setTotalPages(res?.total_pages);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    localStorage.setItem("activePageMovies", activePage);
    localStorage.setItem("sortByMovies", sortBy);
  }, [activePage, sortBy]);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("activePageMovies");
      localStorage.removeItem("sortByMovies");
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.removeItem("activePageMovies");
        localStorage.removeItem("sortByMovies");
      });
    };
  }, []);

  return (
    <Container maxWidth="container.xl" marginTop="6.5rem">
      <Flex alignItems="center" gap="4" my="8">
        <Heading
          as="h2"
          fontSize="1.2rem"
          textTransform="uppercase"
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
        >
          Discover Movies
        </Heading>

        <Select
          className={
            colorMode === "light"
              ? MovieStyle.lightDropdown
              : MovieStyle.darkDropdown
          }
          w="130px"
          value={sortBy}
          onChange={(e) => {
            const newSortBy = e.target.value;
            setActivePage(1);
            setSortBy(newSortBy);
          }}
        >
          <option value="vote_count.desc">Top Rated</option>
          <option value="popularity.desc">Popular</option>
          <option value="revenue.desc">Revenue</option>
        </Select>
      </Flex>

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
        {movies &&
          movies.map((item, i) =>
            loading ? (
              <Skeleton
                key={i}
                height="325px"
                borderRadius="20px"
                startColor="#805AD5"
                endColor="#B794F4"
              />
            ) : (
              <Card key={item.id} item={item} type={"movie"} />
            )
          )}
      </Grid>

      {movies?.length > 0 && !loading && (
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      )}
    </Container>
  );
};

export default Movies;
