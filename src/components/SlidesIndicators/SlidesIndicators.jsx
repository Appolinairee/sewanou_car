import './SlideIndicators.css';

import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

const SlidesIndicators = ({FollowingState, ChangeState, CurrentSlide, Slides}) => {
    return (
      <div className="slideState flex z-50">
              <BsArrowLeft className='icon' onClick={ () => FollowingState(0) }/>
  
                <div className="buttons flex">
                    { Slides.map((index, k) => ( 
                        <span key={k} onClick={ ()=> ChangeState(parseInt(k+1)) } style={ {
                            background: ((k+1) === CurrentSlide)? 'white': '', 
                            padding: ((k+1) === CurrentSlide)? '3px 7px': '3px',
                            borderRadius: ((k+1) === CurrentSlide)? '7px': '50%'
                        } }></span>
                     )) }
                </div>
  
              <BsArrowRight className='icon' onClick={ () => FollowingState(1) } />
      </div>
    )
}

export default SlidesIndicators;