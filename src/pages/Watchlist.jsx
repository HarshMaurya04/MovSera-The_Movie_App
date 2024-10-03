import { useState, useEffect } from "react";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";

const Watchlist = () => {
  const { user } = useAuth();
  const { getWatchlist } = useFirestore();
  const { colorMode } = useColorMode();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data); 
        })
        .catch((error) => {
          console.log(error, "Error");
        })
        .finally(() => {
          setLoding(false);
        });
    }
  }, [user?.uid, getWatchlist]);

  return (
    <Container maxW="container.xl" marginTop="6.5rem">
      <Flex alignItems="baseline" gap="4" my="8">
        <Heading
          as="h2"
          fontSize="1.2rem"
          textTransform="uppercase"
          color={colorMode === "light" ? "#322659" : "#FAF5FF"}
        >
          Watchlist
        </Heading>
      </Flex>

      {loading && (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner
            size="xl"
            color={colorMode === "light" ? "#6B46C1" : "#E9D8FD"}
          />
        </Flex>
      )}

      {!loading && watchlist?.length === 0 && (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Heading
            fontSize="xl"
            color={colorMode === "light" ? "#44337A" : "#E9D8FD"}
          >
            Watchlist is Empty !!
          </Heading>
        </Flex>
      )}

      {!loading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap="4"
        >
          {watchlist?.map((item) => {
            return (
              <WatchlistCard
                key={item?.id}
                item={item}
                type={item?.type}
                setWatchlist={setWatchlist}
              />
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Watchlist;
