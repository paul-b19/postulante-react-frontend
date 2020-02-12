import React from 'react'
import Logo from '../images/logo_flat.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const About = () => {
  
  return (
    <div className="modal fade" id="about">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">About</h3>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <img className="logo-about" src={Logo} alt='Logo'/>
            <div className="about text-left">
              <p className="font-italic font-weight-light">postulante (from Latin): "upon request"</p>
              <h4><a href="https://github.com/paul-b19/postulante-react-frontend" target="_blank">
                <FontAwesomeIcon icon={['fab', 'github']} /> Frontend
              </a></h4>
              <ul className="list-unstyled">
                <li><FontAwesomeIcon icon={['fab', 'react']} /> React.js</li>
                <li><FontAwesomeIcon icon={['fab', 'reacteurope']} /> Redux</li>
                <li><FontAwesomeIcon icon="table" /> Material-UI: material-table</li>
                <li><FontAwesomeIcon icon="code" /> React-Ace</li>
                <li><FontAwesomeIcon icon="hand-spock" /> stringify-object, dirty-json packages</li>
                <li><FontAwesomeIcon icon={['fab', 'bootstrap']} /> Bootstrap</li>
                <li><FontAwesomeIcon icon={['fab', 'font-awesome']} /> Font Awesome</li>
                <li><FontAwesomeIcon icon={['fab', 'aws']} /> Heroku</li>
              </ul>
              <h4><a href="https://github.com/paul-b19/postulante-rails-backend" target="_blank">
                <FontAwesomeIcon icon={['fab', 'github']} /> Backend
              </a></h4>
              <ul className="list-unstyled">
                <li><FontAwesomeIcon icon="gem" /> Rails</li>
                <li><FontAwesomeIcon icon="database" /> PostgreSQL</li>
                <li><FontAwesomeIcon icon={['fab', 'aws']} /> Heroku</li>
              </ul>
              <h6>
                Made by <a href="https://www.linkedin.com/in/pavel-beletsky/" target="_blank">
                  <FontAwesomeIcon icon={['fab', 'linkedin']} /> Pavel Beletsky
                </a>.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About