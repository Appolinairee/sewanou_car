import Products from "../components/Products";
import Categories from "../components/Categories";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";

import Background1 from "../assets/meilleur-voiture-sportive-qualite-prix-1.jpg";
import Background2 from "../assets/R.jpeg";

const Home = () => {
  const [voituresList, setVoituresList] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const voituresCollection = collection(firestore, "voitures");
        const voituresSnapshot = await getDocs(voituresCollection);

        const fetchedVoitures = [];
        for (const doc of voituresSnapshot.docs) {
          const voiture = doc.data();

          const imageUrl = voiture.imageUrl;
          console.log(voiture);

          fetchedVoitures.push({
            id: doc.id,
            imageUrl,
            ...voiture,
          });
        }

        setVoituresList(fetchedVoitures);
        setVoitures(fetchedVoitures);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoitures();
  }, []);

  const handleVoitures = (voitures) => {
    setVoitures(voitures);
  };

  const LoadingProducts = [
    {
      id: 1,
      nom: "Bienvenue sur Sewanou Car",
      description:
        "Découvrez les dernières voitures d'occasion qui se démarquent.",
      image: Background1,
      price: "Discutez et obtenez nos meilleurs conseils", // 48,455,970 XOF
      color: "",
      marque: "",
    },
    {
      id: 2,
      nom: "Tesla Model X",
      description:
        "Conduisez le futur avec le Tesla Model X, un SUV électrique révolutionnaire. ",
      image: Background2,
      price: "539.909.700",
      color: "Bleu",
      marque: "Tesla",
    },
  ];

  return (
    <>
      {loading ? (
        <Header VoituresList={LoadingProducts} />
      ) : (
        <>
          <Header VoituresList={voituresList} />
          
          {!loading && (
            <Categories
              ProductsData={voitures}
              handleVoitures={handleVoitures}
              initialProducts={voituresList}
            />
          )}

          <Products ProductsData={voitures} />
        </>
      )}
    </>
  );
};

export default Home;
