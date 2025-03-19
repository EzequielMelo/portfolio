const Footer = () => {
  return (
    <footer className="relative bg-[#111111] lg:pt-10 pb-10 text-lg md:text-xl px-4 md:px-8 lg:px-16 select-none">
      <p className="text-center text-[#636363]">
        Hecho con React / Tailwind / Spline
      </p>
      <div className="max-w-[1500px] m-auto pt-5 flex flex-col md:flex-row gap-y-4 items-center justify-between">
        <p className="text-[#636363] text-lg text-center">
          © Ezequiel Melo • ezequielanthonymelo@gmail.com
        </p>
        <ul className="flex gap-6">
          <li>
            <a
              target="_blank"
              className="text-[#636363] transition-all duration-200 font-medium hover:text-white"
              href="https://www.linkedin.com/in/melo-ezequiel/"
            >
              Linkedin
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="text-[#636363] transition-all duration-200 font-medium hover:text-white"
              href="https://github.com/EzequielMelo"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
