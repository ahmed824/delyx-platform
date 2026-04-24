import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "fa-table-cells" },
  { label: "Order list", href: "/orders", icon: "fa-list" },
  { label: "Tracking Delivery", href: "/tracking", icon: "fa-location-dot" },
  { label: "Setting", href: "/settings", icon: "fa-gear" },
];

type SidebarProps = {
  pathname: string;
};

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div>
        <Link href="/" className="brand" aria-label="DELY X dashboard">
          <span>DELY</span>
          <strong>X</strong>
          <i></i>
        </Link>
        <div className="sidebar-line" />

        <nav className="side-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href} className={active ? "active" : ""}>
                <span className="nav-icon">
                  <i className={`fa-solid ${item.icon}`}></i>
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-line" />
        <div className="user-row">
          <img src="/images/ahmed.png" alt="Ahmed khaled" />
          <div>
            <strong>Ahmed khaled</strong>
            <span>owner of store</span>
          </div>
        </div>
        <button className="logout-button">Log out</button>
      </div>
    </aside>
  );
}
