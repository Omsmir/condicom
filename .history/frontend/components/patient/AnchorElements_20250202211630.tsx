import { useState, useEffect } from "react";
import { Anchor } from "antd";



const items =[
    {
       key:"Patient Information",
       href:"#Patient Information",
       title: <p className="text-"></p> 
    }
]

const AnchorElments = () => {
  const [activeLink, setActiveLink] = useState("#part-1");

  useEffect(() => {
 
    setActiveLink("#part-1");
  }, []);

  return (
    <Anchor
      direction="horizontal"
      className="flex-1"
      getCurrentAnchor={() => activeLink} // Sets the default link
      onClick={(e, link) => setActiveLink(link.href)} // Updates when clicked
    />
    
  );
};

export default AnchorElments;
