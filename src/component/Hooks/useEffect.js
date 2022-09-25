import React,{useState,useEffect} from "react";
import "./style.css";



const UseEffect = () => {
    // After render we use useeffect or called sideeffect
    useEffect(() => {     
      return () => {
       document.title=`Chats(${myNum})`;
      }
    })
    const [myNum, setMyNum] = useState(0);
  

  return (
    <>
      <div className="center_div">
        <p>{myNum}</p>
        <div class="button2" onClick={() => setMyNum(myNum + 1)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        
      </div>
    </>
  );
};

export default UseEffect;