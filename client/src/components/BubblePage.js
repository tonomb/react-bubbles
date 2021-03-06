import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updatedColor, setUpdatedColor] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get('/api/colors')
      .then(res =>{
        //colors at res.data obj
        setColorList(res.data)
      })
      .catch(err =>{
        console.log({err});
      })
      .finally(()=>{
        setUpdatedColor(false)
      })
  }, [updatedColor])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setUpdatedColor={setUpdatedColor}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
