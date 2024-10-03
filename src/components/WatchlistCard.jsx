import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { imagePath } from "../services/api";
import { useFirestore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import ListCardStyle from "../component_css/WatchlistCard.module.css";

const WatchlistCard = ({ type, item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();
  const { colorMode } = useColorMode();

  const handleRemoveClick = (event) => {
    event.preventDefault();
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <Link to={`/${type}/${item.id}`}>
      <Box
        mb="1rem"
        className={
          colorMode === "light"
            ? ListCardStyle.lightBackColor
            : ListCardStyle.darkBackColor
        } 
        p={{base: "2.5", md: "7"}}
      >
        <Flex gap="5" alignItems="center">
          <Box position="relative" w="170px">
            <Image
              src={`${imagePath}/${item.poster_path}`}
              alt={item.title || item.name}
              className={ListCardStyle.cardImage}
            />
            <Tooltip label="Remove from watchlist">
              <IconButton
                className={
                  colorMode === "light"
                    ? ListCardStyle.lightRemoveBtn
                    : ListCardStyle.darkRemoveBtn
                }
                aria-label="Remove from watchlist"
                icon={<CheckIcon />}
                size="sm"
                onClick={handleRemoveClick}
              />
            </Tooltip>
          </Box>

          <Box p="1rem">
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              color={colorMode === "light" ? "#2a1e53" : "#FAF5FF"}
              noOfLines="1"
            >
              {item?.title || item?.name}
            </Heading>
            <Heading
              fontSize="medium"
              color={colorMode === "light" ? "green.800" : "green.200"}
              mt="2"
            >
              {new Date(
                item?.release_date || item?.first_air_date
              ).getFullYear() || "N/A"}
            </Heading>
            <Flex alignItems="center" gap="2" mt="6">
              <StarIcon
                color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                fontSize="medium"
              />
              <Text
                textAlign="center"
                fontSize="medium"
                color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                fontWeight={colorMode === "light" ? "600" : ""}
              >
                {item?.vote_average?.toFixed(1)}
              </Text>
            </Flex>
            <Text
              mt="6"
              fontSize={{ base: "xs", md: "medium" }}
              color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
              fontWeight={colorMode === "light" ? "600" : ""}
              noOfLines="4"
            >
              {item?.overview}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};

export default WatchlistCard;
