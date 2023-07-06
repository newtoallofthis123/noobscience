import { motion } from 'framer-motion';

const Logo = () => {
    return (
        <>
            <motion.span>
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    fill="currentColor"
                    className="bi bi-lightning-fill"
                    viewBox="0 0 16 16"
                >
                    <motion.path
                        d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5"
                        strokeWidth="1.5"
                    />
                    <motion.circle
                        cx="13"
                        cy="2"
                        r="2"
                        fill="black"
                        initial={{ x: -1000, y: 400, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.2,
                        }}
                        style={{ rotate: '270deg' }}
                        whileHover={{
                            scale: 1.2,
                            rotate: 90,
                            transition: { duration: 0.4 },
                        }} // Add whileHover property
                    />
                </motion.svg>
            </motion.span>
        </>
    );
};

export default Logo;
