import { useState } from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { Link } from "react-router-dom";


const Products = ({ProductsData}) => {

    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleProductClick = (productId) => {
        if(selectedProductId === productId)
            setSelectedProductId(null);
        else   
            setSelectedProductId(productId);
    };

  return (
    <div className="grid grid-cols-3 w-[90%] m-auto my-14 mt-6 gap-[5%] sm:grid-cols-1 lg:gap-3 mb-8" id="voitures">
      {
        ProductsData.map(({id, nom, marque, description, color, prix, imageUrl}, index) => (

            <div key={index} className="border-[1px] rounded-xl mb-6 px-[5%] py-4 shadow-boxShadow1" onClick={() => handleProductClick(id)}>
                <div className="flex items-center justify-between">
                    <h3> {nom   } </h3>
                    <span className="text-[11px] border-primary border-[1px] px-[5px] rounded-lg">{marque} </span>
                </div>

                <div className="my-3 rounded-lg">
                    <img className="rounded-lg" src={imageUrl} alt={nom} />
                </div>

                <p>Prix: <b>{prix}</b> Fcfa</p>
                <p>Couleur:  {color} </p>

                <div className="flex items-center gap-[5%] my-3 xs:block">
                    <Link to="https://wa.me/+22953846658" target="_blank" className="">
                        <button className="bg-primary flex items-center gap-2 p-1 text-light rounded-xl px-3 xs:mb-3">Je suis intéressé <MdPhoneInTalk /></button>
                    </Link>

                    { selectedProductId === id ?
                        <p className="cursor-pointer whitespace-nowrap text-[14px]">En savoir moins -</p> : 
                        <p className="cursor-pointer  whitespace-nowrap text-[14px]">En savoir plus +</p>
                    }
                </div>

                {selectedProductId === id && 
                    <p>
                        {description}
                    </p>
                }
            </div>
        ))
      }
    </div>
  )
}

export default Products;