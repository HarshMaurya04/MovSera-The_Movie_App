import { Link } from "react-router-dom";
import { Box, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { imagePath } from "../services/api";
import CardStyle from "../component_css/Card.module.css";
import { StarIcon } from "@chakra-ui/icons";

const Card = ({ item, type }) => {
  const { colorMode } = useColorMode();

  const voteAvg = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  const voteAverage = item.vote_average ? item.vote_average.toFixed(1) : null;
  const releaseDate = item.release_date || item.first_air_date || null;
  const hasContent = item.poster_path || releaseDate || voteAverage;

  return (
    <Link to={`/${type}/${item.id}`}>
      <Box className={CardStyle.card}>
        {item.poster_path ? (
          <Image
            src={`${imagePath}${item.poster_path}`}
            alt={item.title || item.name}
            className={CardStyle.cardImage}
            borderRadius="20px"
          />
        ) : (
          <Flex
            className={CardStyle.cardImage}
            borderRadius="20px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="4"
            bg={colorMode === "light" ? "#FAF5FF" : "#B794F4"}
          >
            <Text color="#322659" fontWeight="600" textAlign="center" mt="2">
              No Image
            </Text>
            {!hasContent && (
              <Text
                color="#322659"
                fontWeight="600"
                textAlign="center"
                noOfLines="2"
                mb="2"
              >
                {item.title || item.name}
              </Text>
            )}
          </Flex>
        )}

        {hasContent && (
          <Box
            className={CardStyle.cardname}
            height={{
              base: "23%",
              sm: "30%",
              md: "40%",
              lg: "34%",
            }}
            borderBottom={
              colorMode === "light" ? "4px solid #553c9a" : "4px solid #6B46C1"
            }
            bgGradient={[
              colorMode === "light"
                ? "linear(to-b, #E9D8FD, #9F7AEA)"
                : "linear(to-b, #6B46C1, #0f0c1a)",
            ]}
          >
            <Text
              color={colorMode === "light" ? "#322659" : "#FAF5FF"}
              textAlign="center"
              fontWeight={colorMode === "light" ? "600" : ""}
              marginTop="1"
              noOfLines="2"
            >
              {item.title || item.name}
            </Text>
            {releaseDate && (
              <Text
                textAlign="center"
                fontSize="small"
                color={colorMode === "light" ? "green" : "green.200"}
              >
                {new Date(
                  item.release_date || item.first_air_date
                ).getFullYear() || "N/A"}
              </Text>
            )}
            {voteAvg && (
              <Flex
                justifyContent="center"
                alignItems="center"
                gap="2"
                marginTop="2"
              >
                <StarIcon
                  fontSize={colorMode === "light" ? "small" : ""}
                  color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                />
                <Text
                  fontWeight={colorMode === "light" ? "600" : ""}
                  color={colorMode === "light" ? "#322659" : "#FAF5FF"}
                >
                  {voteAvg}
                </Text>
              </Flex>
            )}
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default Card;
