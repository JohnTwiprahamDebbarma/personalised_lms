import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();
  return (
    <footer className="relative left-0 bottom-0 h-[10vh] py-4 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-black bg-slate-300 shadow-lg">
      <section className="text-lg font-medium">
        © {year} | All rights reserved
      </section>

      <section className="flex items-center justify-center gap-8 text-2xl">
        <a href="#" className="hover:text-indigo-700 transition-transform transform hover:scale-125 duration-300">
          <BsFacebook />
        </a>
        <a href="#" className="hover:text-red-600 transition-transform transform hover:scale-125 duration-300">
          <BsInstagram />
        </a>
        <a href="#" className="hover:text-blue-800 transition-transform transform hover:scale-125 duration-300">
          <BsLinkedin />
        </a>
        <a href="#" className="hover:text-blue-600 transition-transform transform hover:scale-125 duration-300">
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
