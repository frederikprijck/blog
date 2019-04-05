import PropTypes from "prop-types"
import React from "react"
import { FaTwitter } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'

const Footer = ({ copyright }) => (
  <footer className="o-footer">
    <div className="container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-between',
        justifyContent: 'space-between'
      }}
    >
      <div className="copyright">
        {copyright}
      </div>
      <div
        style={{
          display: 'flex'
        }}>
        <a href="https://twitter.com/frederikprijck" aria-label="Open Frederik's Twitter profile"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <FaTwitter />
        </a>
        <a href="https://github.com/frederikprijck" aria-label="Open Frederik's Github profile"
          style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <FaGithub />
        </a>
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  copyright: PropTypes.string,
}

Footer.defaultProps = {
  copyright: ``,
}

export default Footer
