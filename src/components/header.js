import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#fff`,
      marginBottom: `1.45rem`,
      boxShadow: '0 0 3px #bbb',
      position: 'sticky',
      top: 0
    }}
  >
    <div className="container"
      style={{
        padding: `1.10rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0, fontSize: '24px' }}>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            color: '#333'
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
