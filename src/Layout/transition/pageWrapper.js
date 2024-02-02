import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "react-bootstrap";
const AquaPageWrapper = (props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isBlurr, setIsBlurr] = useState(false);
  useEffect(() => {
    // Function to check and update screen size
    const ScreenVitalSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the threshold as needed
    };

    // Add a listener for resize events
    window.addEventListener("resize", ScreenVitalSize);

    // Initial check
    ScreenVitalSize();

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", ScreenVitalSize);
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Container fluid={isSmallScreen}>
            <div className="mb-2" />
            <div className="aqua-body">{props.children}</div>
          </Container>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default AquaPageWrapper;
