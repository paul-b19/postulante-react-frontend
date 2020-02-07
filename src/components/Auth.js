import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

class Auth extends React.Component {

  state = {
    auth: 'noAuth',  // 'apiKey'
    key: '',
    value: '',
    addTo: 'Headers'  // 'Params'
  }

  handleAuth = (e) => {
    console.log('Auth', e.target.value)
    this.setState({
      auth: e.target.value
    })
  }

  handleAddTo = (e) => {
    console.log('Add to', e.target.value)
    this.setState({
      addTo: e.target.value
    })
  }

  render () {

    let apiKey = this.props.attribs.find( ({attr_type}) => 
      attr_type === 'auth'
    )

    return (
      <Fragment>
        <h4>Authorization</h4>
  
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-outline-primary">
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
              // totalCount={1}
              options={{
                search: false,
                paging: false,
                sorting: false,
                draggable: false
              }}
              columns={[
                { title: 'Key', field: 'key' },
                { title: 'Value', field: 'value', initialEditValue: 'initial edit value' },
                { title: 'Add to', field: 'description', render: rowData => (
                  <select onChange={this.handleAddTo} value={apiKey.description}>
                    <option value="Headers">Headers</option>
                    <option value="Params">Params</option>
                  </select>
                )}
              ]}

              data={ apiKey && [
                { key: apiKey.key, value: apiKey.value }
              ]}
              
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        /* const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;                
                        this.setState({ data }, () => resolve()); */
                      }
                      resolve();
                    }, 1000);
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