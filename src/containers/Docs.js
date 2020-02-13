import React from 'react'
import { connect } from 'react-redux'
import { setComponent } from '../actions'
import NavBar from '../components/NavBar'
import logo from '../images/logo_flat.png'

class Docs extends React.Component {

  handleBack = () => {
    this.props.setComponent('account')
    this.props.history.push('/account')
  }

  render() {

    return(
      <div className="login">
        <NavBar />
        <div className="login-container d-inline-flex row">
          <div className="p-0 pb-3 text-center col-12">
            <img className="login-logo" src={logo} alt='logo'/>
          </div>
          <div className="p-0 pb-3 text-center col-12">
            <h3>Sorry, nothing's here yet...</h3>
            <h5>Documentation will be added in next release.</h5>
          </div>
          <div className="p-0 pb-3 text-center col-12">
            <button className="btn btn-primary" onClick={this.handleBack}>Back</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // userId: state.userId,
    component: state.component
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setComponent: (data) => dispatch(setComponent(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Docs)