import { motion } from "framer-motion";

const Skeleton = ({ height = 300, radius = 12 }) => {
    return (
        <motion.div
            style={{
                width: "100%",
                height,
                borderRadius: radius,
                background:
                    "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%)",
                backgroundSize: "400% 100%",
            }}
            animate={{
                backgroundPosition: ["100% 0%", "-100% 0%"],
            }}
            transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
};

export default Skeleton;