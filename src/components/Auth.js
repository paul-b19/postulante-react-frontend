import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Auth extends React.Component {

  state = {
    auth: 'noAuth',  // 'apiKey'
    keysList: []
  }

  handleAuth = e => {
    console.log('Auth', e.target.value)
    this.setState({
      auth: e.target.value
    })
  }

  render () {

    let keysList = this.props.attribs.filter( attrib =>
      attrib.attr_type === 'auth' && !attrib.for_deletion
    )
    // let paramsListX = this.state.paramsList

    return (
      <Fragment>
        <h4><FontAwesomeIcon icon="cogs" /> Authorization</h4>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-outline-primary active">
            <input type="radio" name="auth_tabs" value="noAuth"
                   onChange={this.handleAuth} checked={this.state.auth === 'noAuth'}
                   onClick={this.handleAuth} />
            No Auth
          </label>
          <label className="btn btn-outline-primary">
            <input type="radio" name="auth_tabs" value="apiKey" 
                   onChange={this.handleAuth} checked={this.state.auth === 'apiKey'}
                   onClick={this.handleAuth} />
            API Key
          </label>
        </div>

        {/***  selecting api_key tab  ***/}
        {this.state.auth === 'apiKey' && 
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              style={{ backgroundColor: '#fbf1d3' }}
              icons={tableIcons}
              title="Authorization"
              options={{
                search: false,
                paging: false,
                sorting: false,
                draggable: false,
                rowStyle: { backgroundColor: '#fdf6e3' },
                headerStyle: { backgroundColor: '#fdf6e3' }
              }}
              columns={[
                { title: 'Key', field: 'key' },
                { title: 'Value', field: 'value' },
                { title: 'Add to (headers/params)', field: 'description' }
              ]}

              data={ keysList }
              
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = this.props.attribs
                        let newKey = {...newData, ...{attr_type: 'auth'}}
                        data.push(newKey)
                        this.props.updateAttribs(data)
                        this.setState({
                          keysList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = this.props.attribs
                        const index = data.indexOf(oldData)
                        data[index] = newData
                        this.props.updateAttribs(data)                
                        this.setState({
                          keysList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        let data = this.props.attribs
                        const index = data.indexOf(oldData)
                        data[index] = {...oldData, ...{for_deletion: true}}
                        this.props.updateAttribs(data)
                        this.setState({
                          keysList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  })
                // onRowDelete: oldData =>
                //   new Promise((resolve) => {
                //     setTimeout(() => {
                //       {
                //         let data = this.props.attribs
                //         const index = data.indexOf(oldData)
                //         data.splice(index, 1)
                //         this.props.updateAttribs(data)
                //         this.setState({
                //           keysList: data
                //         }, () => resolve())
                //       }
                //       resolve()
                //     }, 1000)
                //   })
              }}
            />
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    requestId: state.requestId,
    attribs: state.attribs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAttribs: (data) => dispatch(updateAttribs(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)