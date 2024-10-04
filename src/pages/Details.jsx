import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Spinner,
  Heading,
  Image,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Badge,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import {
  fetchCredits,
  fetchDetails,
  fetchVideos,
  imagePath,
  imagePathOriginal,
} from "../services/api";
import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  minutesToHours,
  ratingToPercentage,
  resolveRatingColor,
  showsEpisode,
  showsSeason,
} from "../utils/helper";
import Video from "../components/Video";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";

const Details = () => {
  const router = useParams();
  const { type, id } = router;
  const { colorMode } = useColorMode();
  const { user } = useAuth();
  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore();
  const toast = useToast();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const castRef = useRef(null);
  const videosRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsData, creditsData, videosData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ]);

        setDetails(detailsData); // Set Details
        setCast(creditsData.cast.slice(0, 12)); // Set Cast

        // Set Videos
        const video = videosData?.results?.find(
          (video) => video.type === "Trailer"
        );
        setVideo(video);

        const videos = videosData?.results
          ?.filter((video) => video.type !== "Trailer")
          .slice(0, 10);
        setVideos(videos);
      } catch (error) {
        console.log(error, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        castRef.current.scrollBy({ left: 150, behavior: "smooth" });
        videosRef.current.scrollBy({ left: 300, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        castRef.current.scrollBy({ left: -150, behavior: "smooth" });
        videosRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [type, id]);

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: "true",
      });
      return;
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      type: type,
      poster_path: details?.poster_path,
      release_date: details.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    };

    const dataId = details?.id?.toString();
    await addToWatchlist(user?.uid, dataId, data);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }
    checkIfInWatchlist(user?.uid, id).then((data) => {
      setIsInWatchlist(data);
    });
  }, [id, user, checkIfInWatchlist]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, id);
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, id);
    setIsInWatchlist(isSetToWatchlist);
  };

  if (loading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="72vh"
        mt="4.8rem"
      >
        <Spinner
          size="xl"
          color={colorMode === "light" ? "#6B46C1" : "#E9D8FD"}
        />
      </Flex>
    );
  }

  const title = details.name || details.title;
  const releaseDate =
    type === "tv" ? details.first_air_date : details.release_date;

  return (
    <Box marginTop="4rem">
      <Box
        background={
          colorMode === "light"
            ? `linear-gradient(rgba(255,255,255, 0.7), rgba(255,255,255, 0.8)), url(${imagePathOriginal}/${details.backdrop_path})`
            : `linear-gradient(rgba(19,15,33, 0.85), rgba(19,15,33, 0.98)), url(${imagePathOriginal}/${details.backdrop_path})`
        }
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        w="100%"
        h={{ base: "auto", md: "500px" }}
        zIndex="-1"
        display="flex"
        alignItems="center"
      >
        <Container maxWidth={"container.xl"}>
          <Flex
            alignItems="center"
            gap={{ md: "20" }}
            flexDirection={{ base: "column", md: "row" }}
            color={colorMode === "light" ? "#1b1336" : "#FAF5FF"}
          >
            <Image
              height="450px"
              borderRadius="20px"
              my={{ base: "5" }}
              src={`${imagePath}/${details.poster_path}`}
              alt={details.name || details.title}
            />
            <Box my={{ base: "5" }}>
              <Heading fontSize="3xl">
                {title}{" "}
                <Text
                  as="span"
                  fontWeight="normal"
                  fontSize="x-large"
                  color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                >
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems="center" mt="3" mb="4">
                <Flex alignItems="center">
                  <CalendarIcon
                    ml="0.5"
                    mr="2"
                    color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                  />
                  <Text
                    fontSize="1.1rem"
                    color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                    fontWeight={colorMode === "light" ? "600" : ""}
                  >
                    {new Date(releaseDate).toLocaleDateString()}
                  </Text>
                </Flex>

                {type === "movie" && (
                  <>
                    <Flex alignItems="center">
                      <TimeIcon
                        ml="8"
                        mr="1"
                        color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                      />
                      <Text
                        fontSize="1.1rem"
                        color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                        fontWeight={colorMode === "light" ? "600" : ""}
                      >
                        {minutesToHours(details.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}

                {type === "tv" && (
                  <>
                    <Flex alignItems="center">
                      <Text
                        fontSize="1.1rem"
                        color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                        fontWeight={colorMode === "light" ? "600" : ""}
                        ml="10"
                        mr="3"
                      >
                        {details.number_of_seasons}{" "}
                        {showsSeason(details.number_of_seasons)}
                      </Text>

                      {"--->"}

                      <Text
                        fontSize="1.1rem"
                        color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                        fontWeight={colorMode === "light" ? "600" : ""}
                        ml="3"
                      >
                        {details.number_of_episodes}{" "}
                        {showsEpisode(details.number_of_episodes)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>

              <Flex alignItems="center" gap="5">
                <CircularProgress
                  value={ratingToPercentage(details.vote_average)}
                  bg={colorMode === "light" ? "#FAF5FF" : "#130f21"}
                  borderRadius="100%"
                  size="70"
                  p="0.5"
                  color={resolveRatingColor(details.vote_average)}
                  thickness="8px"
                  trackColor="gray.300"
                >
                  <CircularProgressLabel fontSize="large">
                    {ratingToPercentage(details.vote_average)}
                    <Box ml="1" as="span" fontSize="large" fontWeight="bold">
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>

                <Text
                  display={{ base: "none", md: "initial" }}
                  fontSize="large"
                  color={colorMode === "light" ? "#1b1336" : "#E9D8FD"}
                  fontWeight={colorMode === "light" ? "600" : ""}
                >
                  User Score
                </Text>

                {isInWatchlist ? (
                  <Button
                    leftIcon={<CheckCircleIcon />}
                    colorScheme="purple"
                    variant="outline"
                    border="2px solid #6B46C1"
                    borderRadius="15px"
                    onClick={handleRemoveFromWatchlist}
                  >
                    In Watchlist
                  </Button>
                ) : (
                  <Button
                    leftIcon={<SmallAddIcon />}
                    colorScheme="purple"
                    variant="outline"
                    border="2px solid #6B46C1"
                    borderRadius="15px"
                    onClick={handleSaveToWatchlist}
                  >
                    Add to Watchlist
                  </Button>
                )}
              </Flex>

              <Text
                my="5"
                fontSize="lg"
                color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                fontWeight={colorMode === "light" ? "600" : ""}
                fontStyle="italic"
              >
                {details.tagline}
              </Text>

              {details.overview && (
                <>
                  <Heading fontSize="xl" mb="3">
                    Overview
                  </Heading>

                  <Text
                    fontSize="medium"
                    mb="3"
                    color={colorMode === "light" ? "#2a1e53" : "#E9D8FD"}
                    fontWeight={colorMode === "light" ? "600" : ""}
                    noOfLines="6"
                  >
                    {details.overview}
                  </Text>
                </>
              )}

              <Flex alignItems="center" mt="6" gap="3">
                {details.genres && details.genres.length > 0 ? (
                  details.genres.map((genre) => (
                    <Badge
                      key={genre.id}
                      colorScheme="purple"
                      border={
                        colorMode === "light"
                          ? "2px solid #553C9A"
                          : "1px solid #D6BCFA"
                      }
                      borderRadius="10px"
                      p="2"
                    >
                      {genre.name}
                    </Badge>
                  ))
                ) : (
                  <Text
                    color={colorMode === "light" ? "#322659" : "#E9D8FD"}
                    fontSize="large"
                    my="5"
                  >
                    No Genres Found !!
                  </Text>
                )}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW="85%">
        <Heading
          as="h2"
          fontSize="x-large"
          textTransform="uppercase"
          mt="8"
          mb="5"
          color={colorMode === "light" ? "#1b1336" : "#FAF5FF"}
        >
          Cast
        </Heading>
        <Flex
          py="4"
          px="1"
          mb="5"
          overflowX="auto"
          gap="5"
          whiteSpace="nowrap"
          ref={castRef}
        >
          {cast.length === 0 && (
            <Text
              color={colorMode === "light" ? "#322659" : "#E9D8FD"}
              textAlign="center"
              fontSize="large"
              my="5"
            >
              No Cast Found !!
            </Text>
          )}
          {cast &&
            cast.map((item) => (
              <Box
                key={item.id}
                minW="150px"
                maxW="150px"
                flexShrink="0"
                position="relative"
                transition="transform 0.2s ease-in-out"
                transform="scale(1)"
                _hover={{
                  transform: "scale(1.04)",
                  zIndex: "10",
                  "& .overlay": {
                    opacity: 1,
                  },
                }}
              >
                {item.profile_path ? (
                  <Image
                    src={`${imagePath}/${item.profile_path}`}
                    borderRadius="20px"
                    width="100%"
                    height="225px"
                    objectFit="cover"
                  />
                ) : (
                  <Box
                    height="225px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="20px"
                    bg={colorMode === "light" ? "#FAF5FF" : "#B794F4"}
                    color="#322659"
                    fontWeight="600"
                  >
                    No Image
                  </Box>
                )}

                <Box
                  className="overlay"
                  height="35%"
                  width="100%"
                  borderBottom={
                    colorMode === "light"
                      ? "4px solid #553C9A"
                      : "4px solid #6B46C1"
                  }
                  borderBottomRightRadius="20px"
                  borderBottomLeftRadius="20px"
                  position="absolute"
                  bottom="0"
                  left="0"
                  opacity="0"
                  transition="opacity 0.3s ease-in-out"
                  bgGradient={[
                    colorMode === "light"
                      ? "linear(to-b, #E9D8FD, #9F7AEA)"
                      : "linear(to-b, #6B46C1, #0f0c1a)",
                  ]}
                  fontStyle="italic"
                >
                  <Text
                    textAlign="center"
                    color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                    fontWeight={colorMode === "light" ? "600" : ""}
                    mt="2"
                  >
                    Character
                  </Text>
                  <Text
                    textAlign="center"
                    color={colorMode === "light" ? "#251b47" : "#E9D8FD"}
                    fontWeight={colorMode === "light" ? "600" : ""}
                    mt="1"
                    whiteSpace="normal"
                    wordBreak="break-word"
                    noOfLines="2"
                  >
                    {item.character || "---"}
                  </Text>
                </Box>

                <Text
                  color={colorMode === "light" ? "#1b1336" : "#FAF5FF"}
                  fontWeight={colorMode === "light" ? "600" : ""}
                  textAlign="center"
                  mt="3"
                  mb="5"
                  whiteSpace="normal"
                  wordBreak="break-word"
                  noOfLines="2"
                >
                  {item.name}
                </Text>
              </Box>
            ))}
        </Flex>

        <Heading
          as="h2"
          fontSize="x-large"
          textTransform="uppercase"
          mt="10"
          mb="10"
          color={colorMode === "light" ? "#1b1336" : "#FAF5FF"}
        >
          Videos
        </Heading>
        {video ? (
          <Video id={video.key} />
        ) : (
          <Text
            color={colorMode === "light" ? "#322659" : "#E9D8FD"}
            textAlign="center"
            fontSize="large"
            my="5"
          >
            No Trailer Available !!
          </Text>
        )}
        <Flex
          py="4"
          mt="10"
          mb="10"
          overflowX="auto"
          gap="5"
          whiteSpace="nowrap"
          ref={videosRef}
        >
          {videos &&
            videos.map((item) => (
              <Box key={item.id} minW="300px" maxW="300px" flexShrink="0">
                <Video id={item.key} small />
                <Text
                  color={colorMode === "light" ? "#1b1336" : "#FAF5FF"}
                  fontWeight={colorMode === "light" ? "600" : ""}
                  textAlign="center"
                  mt="3"
                  mb="5"
                  whiteSpace="normal"
                  wordBreak="break-word"
                >
                  {item.name}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Details;
