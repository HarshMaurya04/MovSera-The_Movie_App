import {
  Container,
  Heading,
  Grid,
  Flex,
  Box,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import Card from "../components/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeWindow, setTimeWindow] = useState("day");
  const { colorMode } = useColorMode();

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err, "err");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [timeWindow]);

  return (
    <Container maxW="container.xl" marginTop="6.5rem">
      <Flex alignItems="center" gap="4" my="8">
        <Heading
          as="h2"
          fontSize="1.2rem"
          textTransform="uppercase"
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
        >
          Trending
        </Heading>

        <Flex
          alignItems="center"
          border={
            colorMode === "light" ? "2px solid #542982" : "2px solid #b794f4"
          }
          borderRadius="12px"
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius="10px"
            bg={
              colorMode === "light"
                ? `${timeWindow === "day" ? "#b794f49a" : ""}`
                : `${timeWindow === "day" ? "#553c9a" : ""}`
            }
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius="10px"
            bg={
              colorMode === "light"
                ? `${timeWindow === "week" ? "#b794f49a" : ""}`
                : `${timeWindow === "week" ? "#553c9a" : ""}`
            }
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap="5"
        marginBottom="4rem"
      >
        {data &&
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
    </Container>
  );
};

export default Home;
