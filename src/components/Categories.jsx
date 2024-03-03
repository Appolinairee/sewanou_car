import { useEffect, useState } from "react";


const Categories = ({ProductsData, handleVoitures, initialProducts}) => {

  const [categories, setCategories] = useState([]);
  const [productsCountByCategory, setProductsCountByCategory] = useState({});
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [actualCategory, setActualCategorie] = useState("Tout");


  useEffect(() => {
    // Extraire les catégories uniques des produits
    const allCategories = ["Tout", "Plus cher", "Moins cher", ...new Set(ProductsData.map(product => product.marque))];
    setCategories(allCategories);

    // Initialiser le compteur de produits par catégorie
    const initialProductsCountByCategory = {};
    allCategories.forEach(category => {
      initialProductsCountByCategory[category] = 0;
    });
    setProductsCountByCategory(initialProductsCountByCategory);

    // Mettre à jour le nombre de produits par catégorie
    ProductsData.forEach(product => {
      initialProductsCountByCategory[product.marque]++;
    });
    setProductsCountByCategory(initialProductsCountByCategory);


    // Calculer le nombre total de produits
    const totalProducts = ProductsData.length;
    setTotalProductsCount(totalProducts);

  }, []);


  function handleCategoryChange(category) {
    setActualCategorie(category);

    if(category === "Tout" || category==="Plus cher" || category==="Moins cher"){
      handleVoitures(initialProducts);
    } else{
        const filteredProducts = initialProducts.filter(product => product.marque === category);
      handleVoitures(filteredProducts);
    }
  };


  return (
    <div className="m-auto pt-16  w-[90%] flex items-center justify-between px-[5%] whitespace-nowrap overflow-auto gap-2 pb-1 xs:w-[100%] xs:px-0 xs:ml-2 xs:text-[14px]" id="voitures">

      {
        categories.map((categorie , index) => (
            <div key={index} className={`flex gap-2 items-center p-2 px-4 font-medium bg-dark/10 rounded-xl cursor-pointer hover:bg-primary sm:py-1 hover:text-light duration-75 ${categorie === actualCategory ?  'text-light !bg-primary':  'text-dark bg-dark/10'}`} onClick={() => handleCategoryChange(categorie)}>

                <p>{categorie}</p>
                
                {
                  categorie === "Tout" &&
                  <span className="bg-primary text-[13px] text-light px-1 rounded-full">{totalProductsCount}</span>    
                }

                {
                  productsCountByCategory[categorie] > 0 &&
                  <span className="bg-primary text-[13px] text-light px-1 rounded-full">{productsCountByCategory[categorie]}</span>    
                }
            </div>
        ))
      }
      
    </div>
  )
}

export default Categories;
