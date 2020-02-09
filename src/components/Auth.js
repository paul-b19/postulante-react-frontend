import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

class Auth extends React.Component {

  state = {
    auth: 'noAuth',  // 'apiKey'
    // addTo: 'headers'  // 'params'
    keysList: []
  }

  handleAuth = e => {
    console.log('Auth', e.target.value)
    this.setState({
      auth: e.target.value
    })
  }

  // handleAddTo = (e) => {
  //   console.log('Add to', e.target.value)
  //   this.setState({
  //     addTo: e.target.value
  //   })
  // }

  render () {

    let keysList = this.props.attribs.filter( attrib =>
      attrib.attr_type === 'auth'
    )
    // let paramsListX = this.state.paramsList

    return (
      <Fragment>
        <h4>Authorization</h4>
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

        {this.state.auth === 'apiKey' && 
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              icons={tableIcons}
              title="Authorization"
              // totalCount={1}   // <-- !!!!
              options={{
                search: false,
                paging: false,
                sorting: false,
                draggable: false
              }}
              columns={[
                { title: 'Key', field: 'key' },
                { title: 'Value', field: 'value' },
                { title: 'Add to (headers/params)', field: 'description' }
              ]}
              // columns={[
              //   { title: 'Key', field: 'key' },
              //   { title: 'Value', field: 'value' },
              //   { title: 'Add to', field: 'description', render: rowData => (
              //     <select onChange={this.handleAddTo} value={keysList[0].description}>
              //       <option value="headers">Headers</option>
              //       <option value="params">Params</option>
              //     </select>
              //   )}
              // ]}

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
                        data.splice(index, 1)
                        this.props.updateAttribs(data)
                        this.setState({
                          keysList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  })
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