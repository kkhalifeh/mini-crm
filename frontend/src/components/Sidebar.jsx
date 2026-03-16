import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Mini CRM</h1>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
          }
        >
          <span className="sidebar-link-icon">&#128100;</span>
          Contacts
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
