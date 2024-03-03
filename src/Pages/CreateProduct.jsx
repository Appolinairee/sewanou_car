import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firestore, storage } from "../firebase";

const AjoutProduit = ({ voitureToUpdate, handleCarUpdate}) => {
  const [nomProduit, setNomProduit] = useState("");
  const [descriptionProduit, setDescriptionProduit] = useState("");
  const [prixProduit, setPrixProduit] = useState("");
  const [imageProduit, setImageProduit] = useState(null);
  const [marqueProduit, setMarqueProduit] = useState("");
  const [colorProduit, setColorProduit] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(voitureToUpdate);
    // Si la prop voitureToUpdate est définie, cela signifie que nous sommes en mode de mise à jour
    if (voitureToUpdate) {
      setNomProduit(voitureToUpdate.nom || "");
      setDescriptionProduit(voitureToUpdate.description || "");
      setPrixProduit(voitureToUpdate.prix || "");
      setMarqueProduit(voitureToUpdate.marque || "");
      setColorProduit(voitureToUpdate.color || "");

      if (voitureToUpdate.imageUrl) {
        setImageProduit(voitureToUpdate.imageUrl);
      }
    }
  }, [voitureToUpdate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageProduit(file);
  };


  const handleAjoutProduit = async (e) => {
    e.preventDefault();

    if (loading) return; // Si déjà en cours de traitement, éviter de relancer

    if (!imageProduit && !voitureToUpdate) {
      setErreur("Veuillez sélectionner une image pour le produit.");
      return;
    }

    setLoading(true);

    try {
      const imageRef = ref(storage, `images/${imageProduit.imageUrl}`);
      await uploadBytes(imageRef, imageProduit);
      const imageUrl = await getDownloadURL(imageRef);

      if (voitureToUpdate) {
        // Si c'est une mise à jour, utilisez updateDoc au lieu de addDoc
        await updateDoc(doc(firestore, "voitures", voitureToUpdate.id), {
          nom: nomProduit,
          description: descriptionProduit,
          prix: prixProduit,
          imageUrl: imageUrl,
          marque: marqueProduit,
          color: colorProduit,
        });
        setSucces("Produit mis à jour avec succès!");
      } else {
        // Si c'est une nouvelle ajout, utilisez addDoc
        const docRef = await addDoc(collection(firestore, "voitures"), {
          nom: nomProduit,
          description: descriptionProduit,
          prix: prixProduit,
          imageUrl: imageUrl,
          marque: marqueProduit,
          color: colorProduit,
        });
        console.log("Produit ajouté avec l'ID :", docRef.id);
        setSucces("Produit ajouté avec succès!");
      }

      setNomProduit("");
      setDescriptionProduit("");
      setPrixProduit("");
      setMarqueProduit("");
      setColorProduit("");
      setImageProduit(null);

      handleCarUpdate();
    } catch (error) {
      console.error("Erreur lors de l'ajout/mise à jour du produit :", error);
      setErreur(
        "Une erreur est survenue lors de l'ajout/mise à jour du produit."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark/50 fixed overflow-y-auto top-0 left-0 w-full h-full z-30">
      <div className="max-w-[420px] absolute top-[5rem] left-[50%] -translate-x-1/2 bg-light rounded-xl m-auto px-4 bg-gradient-green-yellow z-30 py-[1rem] pb-20 xs:px-5 overflow-y-auto md:!w-[90%]">

        <p className="border-solid border-dark/50 p-1 w-fit border-[1px] rounded-lg mb-3 text-right">Annuler</p>

        <h3 className="text-3xl font-bold xs:text-[1.7rem]">
          {voitureToUpdate ? "Ajouter un produit" : "Mettre à jour le produit"}
        </h3>

        <form onSubmit={handleAjoutProduit}>
          <div className="my-6">
            <label
              htmlFor="nomProduit"
              className="block text-sm font-medium text-dark/70"
            >
              Nom de la voiture:
            </label>
            <input
              type="text"
              id="nomProduit"
              value={nomProduit}
              onChange={(e) => setNomProduit(e.target.value)}
              className="mt-1 p-2 w-full bg-red border border-dark/50 rounded-[10px]"
              placeholder="Nom de la voiture..."
              { ...(!voitureToUpdate ? { required: true } : {}) }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="prixProduit"
              className="block text-sm font-medium text-dark/70"
            >
              Prix de la voiture:
            </label>
            <input
              type="text"
              id="prixProduit"
              value={prixProduit}
              onChange={(e) => setPrixProduit(e.target.value)}
              placeholder="Prix de la voiture..."
              className="mt-1 p-2 w-full bg-red border border-dark/50 rounded-[10px]"
              { ...(!voitureToUpdate ? { required: true } : {}) }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageProduit"
              className="block text-sm font-medium text-dark/70"
            >
              Image du produit:
            </label>
            <input
              type="file"
              id="imageProduit"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full bg-red border border-dark/50 rounded-[10px]"
              { ...(!voitureToUpdate ? { required: true } : {}) }
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="marque"
              className="block text-sm font-medium text-dark/70"
            >
              Marque:
            </label>
            <input
              type="text"
              id="marque"
              value={marqueProduit}
              placeholder="Marque..."
              onChange={(e) => setMarqueProduit(e.target.value)}
              className="mt-1 p-2 w-full bg-red border border-dark/50 rounded-[10px]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-dark/70"
            >
              Couleur:
            </label>
            <input
              type="text"
              id="color"
              value={colorProduit}
              placeholder="Couleure..."
              onChange={(e) => setColorProduit(e.target.value)}
              className="mt-1 p-2 w-full bg-red border border-dark/50 rounded-[10px]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="descriptionProduit"
              className="block text-sm font-medium text-dark/70"
            >
              Description de la voiture:
            </label>
            <textarea
              id="descriptionProduit"
              value={descriptionProduit}
              onChange={(e) => setDescriptionProduit(e.target.value)}
              placeholder="Description de la voiture..."
              className="mt-1 h-[100px] p-2 w-full bg-red border border-dark/50 rounded-[10px]"
            ></textarea>
          </div>

          {erreur && <div className="text-red-500">{erreur}</div>}
          {succes && <div className="text-green-500">{succes}</div>}

          <div className="bg-red px-3 py-2 flex items-center justify-center relative bg-primary text-dark rounded-[8px] mt-3 mb-2 text-center cursor-pointer">
            <button
              type="submit"
              className="text-center font-semibold align-middle w-full text-light"
              disabled={loading}
            >
              {loading ? "Chargement..." : (voitureToUpdate ? "Mettre à jour de la voiture" : "Ajouter la voiture")}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-dark/70 fixed overflow-y-auto top-0 left-0 w-full h-full" onClick={handleCarUpdate}></div>
    </div>
  );
};

export default AjoutProduit;
