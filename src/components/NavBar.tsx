import { Link, useMatch, useResolvedPath } from "react-router-dom";

const navigation = [
  { name: "Table", href: "/table" },
  { name: "Chart", href: "/chart" },
];

export default function NavBar() {
  return (
    <div className="bg-nav p-0 w-full p-5 top-0 left-0">
      <nav className="flex text-white">
        <ul className="flex">
          {navigation.map((nav) => (
            <CustomLink key={nav.name} to={nav.href}>{nav.name}</CustomLink>
          ))}
        </ul>
      </nav>
    </div>
  );
}

type CustomLinkProps = {
  to: string;
  children: React.ReactNode;
};

function CustomLink({ to, children }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li>
      <Link
        to={to}
        className={`p-3 mr-5 font-bold text-2x1 cursor-pointer rounded ${
          isActive && "bg-blue-600"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}