import { useState, useEffect } from "react";
import { Anchor } from "antd";

const MyComponent = () => {
  const [activeLink, setActiveLink] = useState("#part-1"); // Default link

  useEffect(() => {
    // Set default anchor link on page load
    setActiveLink("#part-1");
  }, []);

  return (
    <Anchor
      direction="horizontal"
      className="flex-1"
      getCurrentAnchor={() => activeLink} // Sets the default link
      onClick={(e, link) => setActiveLink(link.href)} // Updates when clicked
    >
      <Anchor.Link key="part-1" href="#part-1" title="Part 1" />
      <Anchor.Link key="part-2" href="#part-2" title="Part 2" />
      <Anchor.Link key="part-3" href="#part-3" title="Part 3" />
    </Anchor>
  );
};

export default MyComponent;
