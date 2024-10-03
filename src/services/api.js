import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// Trending
export const fetchTrending = async (timeWindow = "day") => {
  try {
    const { data } = await axios.get(
      `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    );
    return data?.results;
  } catch (error) {
    console.error("Error fetching trending data:", error);
    throw error;
  }
};

// Movies and Series -> Details
export const fetchDetails = async (type, id) => {
  try {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

// Movies and Series -> Credits
export const fetchCredits = async (type, id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
    );
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

// Movies and Series -> Videos
export const fetchVideos = async (type, id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
    );
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

// Movies and Series -> Discover
export const fetchMovies = async (page, sortBy) => {
  try {
    const res = await axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

export const fetchSeries = async (page, sortBy) => {
  try {
    const res = await axios.get(
      `${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
    );
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};

// Search
export const fetchSearchData = async (query, page) => {
  try {
    const res = await axios.get(
      `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
    );
    return res?.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};
