import Image from "next/image";
import Link from "next/link";
import AuthAvatar from "../ui/auth-avater";
import Container from "../ui/container";

const Header = () => {
  const navigationLinks = [
    {
      label: "Timer",
      path: "/",
    },
    {
      label: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <header className="border-b sticky top-0 backdrop-blur-sm">
      <Container className="flex justify-between items-center  -mt-1">
        <div className="flex items-center">
          <Image
            src={"/logo.svg"}
            alt="Programming Hero"
            width={70}
            height={68}
            className="-ml-4"
          />
          <span className="text-lg font-medium mt-3 -ml-2">
            Programming Hero
          </span>
        </div>
        <div className="flex items-center  gap-3">
          {navigationLinks?.map((item) => (
            <Link
              className="text-sm hidden md:block"
              key={item?.path}
              href={item?.path}
            >
              {item?.label}
            </Link>
          ))}
          <AuthAvatar className="ml-2" />
        </div>
      </Container>
    </header>
  );
};

export default Header;
