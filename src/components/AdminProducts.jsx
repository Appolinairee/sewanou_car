import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";
import { firestore, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import CreateProduct from "../Pages/CreateProduct";

const AdminProduct = ({ ProductsData, handleVoitures }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [addCar, setAddCar] = useState(false);

  const handleCarUpdate = () => {
    setAddCar(!addCar);
  };

  const handleProductClick = (productId) => {
    if (selectedProductId === productId) setSelectedProductId(null);
    else setSelectedProductId(productId);
  };

  const deleteCar = async (carId, imageName) => {
    try {
      await deleteObject(ref(storage, `images/${imageName}`));

      await deleteDoc(doc(firestore, "voitures", carId));

      handleVoitures((prevVoitures) =>
        prevVoitures.filter((voiture) => voiture.id !== carId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la voiture :", error);
    }
  };

  return (
    <div
      className="grid grid-cols-3 w-[90%] m-auto my-14 mt-6 gap-[5%] sm:grid-cols-1 lg:gap-3 mb-8"
      id="voitures"
    >
      {ProductsData.map(
        ({ id, nom, marque, description, color, prix, imageUrl }, index) => (
          <div
            key={index}
            className="border-[1px] rounded-xl mb-6 px-[5%] py-4 shadow-boxShadow1"
          >
            <div className="flex items-center justify-between">
              <h3> {nom} </h3>
              <span className="text-[11px] border-primary border-[1px] px-[5px] rounded-lg">
                {marque}{" "}
              </span>
            </div>

            <div className="my-3 rounded-lg">
              <img className="rounded-lg" src={imageUrl} alt={nom} />
            </div>

            <p>
              Prix: <b>{prix}</b> Fcfa Je suis
            </p>
            <p>Couleur: {color} </p>

            <div className="flex items-center gap-[5%] my-3 xs:block">
              <Link
                to="https://wa.me/+22953846658"
                target="_blank"
                className=""
              >
                <button className="bg-primary flex items-center gap-2 p-1 text-light rounded-xl px-3 xs:mb-3">
                  Je suis intéressé <MdPhoneInTalk />
                </button>
              </Link>

              {selectedProductId === id ? (
                <p
                  className="cursor-pointer whitespace-nowrap text-[14px]"
                  onClick={() => handleProductClick(id)}
                >
                  En savoir moins -
                </p>
              ) : (
                <p
                  className="cursor-pointer  whitespace-nowrap text-[14px]"
                  onClick={() => handleProductClick(id)}
                >
                  En savoir plus +
                </p>
              )}
            </div>

            {selectedProductId === id && <p>{description}</p>}

            <div className="mt-3 flex items-center justify-between w-full border-solid border-red-600">
              <button className="font-bold" onClick={() => handleCarUpdate()}>Mettre à jour</button>
              <button className="bg-red-400 p-1 rounded px-2" onClick={() => deleteCar(id, imageUrl)}>Supprimer</button>
            </div>

            {addCar && (
              <CreateProduct
              voitureToUpdate={{
                  id,
                  nom,
                  marque,
                  description,
                  color,
                  prix,
                  imageUrl,
                }}

                handleCarUpdate={handleCarUpdate}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default AdminProduct;
