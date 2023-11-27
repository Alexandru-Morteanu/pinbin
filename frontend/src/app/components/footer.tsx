import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-5 w-full">
      <h1 className="text-white text-center items-center font-bold text-3xl p-4 opacity-100">
        🌍 PinBin<span className="text-green-800">.</span>
      </h1>
      <div className="flex flex-row text-center justify-center">
        {[
          { text: "Home", link: "/" },
          { text: "About", link: "/about" },
          { text: "Terms", link: "/terms" },
          { text: "Privacy Policy", link: "/privacypolicy" },
        ].map((button, index) => {
          return (
            <Link key={index} href={button.link}>
              <p className="mx-3 font-semibold sm:p-0">{button.text}</p>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};
export default Footer;
