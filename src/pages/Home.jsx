import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import home from "../assets/home.jpg";
import HomeLayout from "../layouts/HomeLayout";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.1,
      yoyo: Infinity, // Repeats the animation back and forth
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

function Home() {
  return (
    <HomeLayout>
      <div className="bg-slate-100 pt-10 text-black flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <motion.div
          className="w-1/2 space-y-6"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl font-semibold">
            Hi! Welcome to your
          </h1>
          <span className="text-5xl text-indigo-700 font-bold">Personalised Learning Management System</span>
          <p className="text-xl text-black font-semibold">All your tasks at one place.</p>
          <div className="space-x-6">
            <Link to="/courses">
              <motion.button
                className="bg-indigo-700 text-white px-5 py-3 rounded-full font-semibold text-lg cursor-pointer hover:bg-yellow-400 transition-all ease-in-out duration-50"
                variants={buttonVariants}
                whileHover="hover"
              >
                Explore courses
              </motion.button>
            </Link>
            <Link to="/contacts">
              <motion.button
                className="border border-indigo-700 px-5 py-3 rounded-full font-semibold text-lg cursor-pointer hover:bg-yellow-400 transition-all ease-in-out duration-100"
                variants={buttonVariants}
                whileHover="hover"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="w-1/2 flex items-center justify-center"
          variants={imageVariants}
          initial="initial"
          animate="animate"
        >
          <img src={home} alt="home page" className="rounded-lg shadow-lg size-3/4" />
        </motion.div>
      </div>
    </HomeLayout>
  );
}

export default Home;
