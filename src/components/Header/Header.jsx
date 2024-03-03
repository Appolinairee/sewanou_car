import {useState} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SlidesIndicators from '../SlidesIndicators/SlidesIndicators';
import Button from '../Button/Button';

const Header = ({VoituresList}) => {
    

    const [currentslide, setCurrentslide] = useState(parseInt(Math.random()*5));

    const handleManual = (n) => {
        let lenght = 5;
        if (currentslide <= 0) 
            setCurrentslide(lenght);
        else if(currentslide >= lenght)
            setCurrentslide(n? 1 : lenght-1);
        else
        setCurrentslide(n? currentslide+1: ((currentslide !== 1)? currentslide-1: lenght));
    }

    const ChangeSlide = (k) => {
        setCurrentslide(k);
    }

  return (
    <div className='slides'>
        <section className="headers" style={ { transform: `translateY(-${75*(currentslide-1)}vh)` } }>
            {
                VoituresList.slice(0, 5).map( (item) => (
                    <div key={item.id} className="header" style={
                        { background: `url(${ item.imageUrl }) center no-repeat`, backgroundSize: "cover" }
                    }>
                        <div className="headerContent">
                            <div className="contentCategorie flex xs:!text-[13px]">
                                <span> {item.marque} </span>
                                <span> {item.marque} </span>
                            </div>
                            
                            <h2>{ item.nom }</h2>
            
                            <p className='xs:!text-[14px]'>{ item.description }</p>
            
                            <div className="headerDetails flex ">

                            <a href={`#voitures`}>
                                    <Button title="Visualiser" nonAnimation={true} />
                            </a>

                                <Link to="https://wa.me/+22953846658" target="_blank">
                                    <button className="btn btn2 flex items-center ml-4">
                                        <span>Nous contactez</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
            
                        <div className='backOverlay'></div>
                        
                    </div>
                ))
            }
        </section>

        <SlidesIndicators FollowingState={handleManual} ChangeState={ChangeSlide} CurrentSlide={currentslide} Slides={VoituresList.slice(0, 5)} />
        
    </div>  
  )
}

export default Header;