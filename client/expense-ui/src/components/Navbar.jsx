import { NavLink } from "react-router-dom";

function Navbar() {
  const styles = {
    navbar: {
      backgroundColor: "#ffffff",
      padding: "10px 40px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
    },
    title: {
      marginRight: "auto",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },
    navLink: {
      marginLeft: "20px",
      textDecoration: "none",
      color: "#555",
      padding: "8px 12px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    activeNavLink: {
      color: "#007bff",
      fontWeight: "bold",
    },
  };

  const getNavLinkStyle = ({ isActive }) =>
    isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink;

  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>Expense Tracker</div>
      <NavLink to="/expense" style={getNavLinkStyle}>
        Dashboard
      </NavLink>
      <NavLink to="/expense-list" style={getNavLinkStyle}>
        Expenses
      </NavLink>
    </nav>
  );
}

export default Navbar;