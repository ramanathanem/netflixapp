import React, {useState,useEffect} from 'react'
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [isVisible, setIsvisible]= useState(false); 
    const toggleVisibility=()=>{
        if(window.pageYOffset>300){
            setIsvisible(true)
        }else{
            setIsvisible(false)
        }
    }
    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth",
        });
    };
    useEffect(()=>{
        window.addEventListener("scroll", toggleVisibility);
        
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
        }, []);
    
  return  (
  <div className="scroll-to-top"> 
    {isVisible &&(
        <div onClick={scrollToTop}>
            <i className="fas fa-arrow-circle-up fa-3x"></i>
            </div>
    )}
    </div>
  );
};

export default ScrollToTop;