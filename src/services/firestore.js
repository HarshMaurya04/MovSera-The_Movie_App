import { db } from "../services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { deleteUser, signOut } from "firebase/auth";

export const useFirestore = () => {
  const toast = useToast();

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: "This item already exists in your watchlist!", 
          status: "error",
          duration: 6000,
          isClosable: "true",
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast({
        title: "Added to your watchlist!", 
        status: "success",
        isClosable: "true",
      });
      return true;
    } catch (error) {
      console.log(error, "Error adding document");
      toast({
        title: "An error occurred while adding to the watchlist!", 
        status: "error",
        isClosable: "true",
      });
      return false;
    }
  };

  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
      toast({
        title: "Removed from your watchlist!", 
        status: "success",
        isClosable: "true",
      });
      return true;
    } catch (error) {
      console.log(error, "Error while deleting document");
      toast({
        title: "An error occurred while removing from the watchlist!", 
        status: "error",
        isClosable: "true",
      });
      return false;
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};

const deleteSubcollectionDocs = async (subcollectionRef) => {
  const batch = writeBatch(db);
  const subcollectionDocs = await getDocs(subcollectionRef);

  subcollectionDocs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};

export const deleteAccount = async (user) => {
  try {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const userDocRef = doc(db, "users", user.uid);
    const watchlistCollectionRef = collection(
      db,
      "users",
      user.uid,
      "watchlist"
    );

    await deleteSubcollectionDocs(watchlistCollectionRef);
    await deleteDoc(userDocRef);
    await deleteUser(user);
    await signOut(auth);

    console.log("User account and data deleted successfully.");
    return true;
  } catch (error) {
    console.error("Error deleting user account:", error);
    return false;
  }
};
