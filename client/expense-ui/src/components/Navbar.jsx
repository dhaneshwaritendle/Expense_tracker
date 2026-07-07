import { NavLink } from "react-router-dom";

function Navbar() {
  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-150 ease-in-out";
    return isActive
      ? `${baseClasses} border-blue-500 text-gray-900`
      : `${baseClasses} border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center text-2xl font-bold text-gray-800">
              Expense Tracker
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/expense" className={getNavLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/expense-list" className={getNavLinkClass}>
                Expenses
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      </nav>
);
}

export default Navbar;