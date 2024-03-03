// components/VoituresList.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";

const VoituresList = () => {
  const [voituresList, setVoituresList] = useState([]);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const voituresCollection = collection(firestore, "voitures");
        const voituresSnapshot = await getDocs(voituresCollection);

        const fetchedVoitures = [];
        for (const doc of voituresSnapshot.docs) {
          const voiture = doc.data();
          const imageUrl = await getDownloadURL(ref(storage, `${voiture.imageUrl}`));

          fetchedVoitures.push({
            id: doc.id,
            imageUrl,
            ...voiture,
          });
        }

        setVoituresList(fetchedVoitures);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
      }
    };

    fetchVoitures();
  }, []);

  return voituresList;
};

export default VoituresList;
