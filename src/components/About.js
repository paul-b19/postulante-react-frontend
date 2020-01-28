import React from 'react'
// import Logo from '../images/logo.png'

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
          <div className="modal-body">
            <img className="login-logo" src="{Logo}" alt='Logo'/>
            <div className="text-left">
              <h4><a href=""
                target="_blank">Frontend</a></h4>
              <ul>
                <li>React</li>
                <li>Bootstrap</li>
              </ul>
              <h4><a href=""
                target="_blank">Backend</a></h4>
              <ul>
                <li>Rails</li>
                <li>PostgreSQL</li>
                <li>Cloudmersive OCR API</li>
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