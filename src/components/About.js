import React from 'react'
import Logo from '../images/logo_flat.png'

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
              <h4><a href=""
                target="_blank">Frontend</a></h4>
              <ul>
                <li>React.js</li>
                <li>Redux</li>
                <li>Material-UI: material-table</li>
                <li>React-Ace</li>
                <li>Bootstrap</li>
                <li>Font Awesome</li>
                <li>Heroku</li>
              </ul>
              <h4><a href=""
                target="_blank">Backend</a></h4>
              <ul>
                <li>Rails</li>
                <li>PostgreSQL</li>
                <li>Heroku</li>
              </ul>
              <h6>
                Made by <a href="https://www.linkedin.com/in/pavel-beletsky/" target="_blank">Pavel Beletsky</a>.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About