import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css"
import Slide from "./Slide";
import { getProducts } from "../Redux/Action/Action";
import { useDispatch, useSelector } from "react-redux";
const Maincom = () => {

// const {products} = useSelector(state =>state.getproductsdata)
// console.log("Products",products)

// const dispatch = useDispatch()

// useEffect(()=>{
//   dispatch(getProducts())
// },[dispatch])

const { data: products, loading, error } = useSelector((state) => state.getproductsdata);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(getProducts());
}, [dispatch]);

console.log("Maincom Products:", products);

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}


  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
        <Slide  title="Deal of the Day" products={products || []}/> 
        </div>
        <div className="right_slide">
           <h4>Festive Latest launches</h4>
           <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
        </div>
      
      </div>
      <Slide  title="Deal of the Day" products={products || []}/> 
      <div className="center_img">
      <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
      </div>
      <Slide  title="Deal of the Day" products={products || []}/> 
      <Slide  title="Deal of the Day" products={products || []}/>   
     
    </div>
  );
};

export default Maincom;
