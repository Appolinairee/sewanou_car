import AdminProduct from "../components/AdminProducts";
import Categories from "../components/Categories";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";
import CreateProduct from "../Pages/CreateProduct";

const Home = () => {
  const [voituresList, setVoituresList] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCar, setAddCar] = useState(false);

  useEffect(() => {
    const fetchVoitures = async () => {
      try {
        const voituresCollection = collection(firestore, "voitures");
        const voituresSnapshot = await getDocs(voituresCollection);

        const fetchedVoitures = [];
        for (const doc of voituresSnapshot.docs) {
          const voiture = doc.data();
          const imageUrl = voiture.imageUrl;

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

  const handleCarUpdate = () => {
    setAddCar(!addCar);
  };


  return (
    <>
      <div className="p-2 bg-primary w-fit rounded-lg m-auto text-light font-bold px-4 cursor-pointer" onClick={handleCarUpdate}>
        Ajouter une voiture
      </div>

      {
        addCar && 
        <CreateProduct handleCarUpdate={handleCarUpdate} />
      }

      {!loading && (
        <Categories
          ProductsData={voitures}
          handleVoitures={handleVoitures}
          initialProducts={voituresList}
        />
      )}
      <AdminProduct ProductsData={voitures} handleVoitures={handleVoitures} />
    </>
  );
};

export default Home;