import Logo from "../../assets/icons/graybox.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex h-[67px] max-w-[430px] items-center px-5">
        <img
          src={Logo}
          alt="logo"
          className="h-6 object-contain"
        />
      </div>
    </header>
  );
}
