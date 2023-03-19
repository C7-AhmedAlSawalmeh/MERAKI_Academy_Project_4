
import "./test.css"


const Test = () => {
  

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">
          Logo
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              About
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Services
            </a>
          </li>
          <li className="navbar-item">
            <a href="#" className="navbar-link">
              Contact
            </a>
          </li>
        </ul>
        <div className="navbar-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
      </>
  )
}

export default Test

