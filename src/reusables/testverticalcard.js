import { useState } from "react";
import {
    FaHeart,
    FaRegHeart,
    FaCartPlus,
    FaCartArrowDown,
    FaShare,
    FaRegShareSquare,
    FaCross,
    FaCheck
  } from "react-icons/fa";
const TestVerticalcard = () =>{
    const [buyStateAnimation , setBuyStateAnimation] = useState(false)
    const [removeStateAnimation , setRemoveStateAnimation] = useState(false)
return(
    <>
    <div class="hovercard">
        <div class="container1">
            <div class="top"></div>
            <div class={buyStateAnimation ? "bottom clicked" :"bottom"}>
            <div class="left">
                <div class="details">
                <h1>Chair</h1>
                <p>£250</p>
                </div>
                <div class="buy" onClick={()=>setBuyStateAnimation(!buyStateAnimation)} ><FaCartArrowDown size={30}/></div>
            </div>
            <div class="right">
                <div class="done"><FaCheck/></div>
                <div class="details">
                <h1>Chair</h1>
                <p>Added to your cart</p>
                </div>
                <div class="remove" onClick={()=>setBuyStateAnimation(false)}><FaCross/></div>
            </div>
            </div>
        </div>
        <div class="inside">
            <div class="icon"><FaRegHeart/></div>
            
        </div>
        </div>
    </>
)
}
export default TestVerticalcard