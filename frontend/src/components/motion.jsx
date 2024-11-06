// MotionComponent.js
import { motion } from "framer-motion";

const MotionComponent = ({ children, initial, animate, transition }) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

MotionComponent.defaultProps = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default MotionComponent;
