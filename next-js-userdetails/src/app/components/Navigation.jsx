import Link from "next/link";

function Navigation() {
  return (
    <div className="navigation">
      <h1>Navigation</h1>
      <ul>
        <li>
          <Link href="/"> Home </Link>
        </li>
        <li>
          <Link href="/about"> About </Link>
        </li>
        <li>
          <Link href="/services"> Services</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
