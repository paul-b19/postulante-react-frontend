import React, { Fragment } from 'react'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

class Auth extends React.Component {

  state = {
    auth: 'noAuth',  // 'apiKey'
    key: '',
    value: '',
    addTo: 'Headers'  // 'Query Params'
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
                { title: 'Add to', field: 'add_to', render: rowData => (
                  <select onChange={this.handleAddTo} value={this.state.addTo}>
                    <option value="Headers">Headers</option>
                    <option value="Query Params">Query Params</option>
                  </select>
                )}
              ]}
              data={[
                { key: 'API_KEY', value: 'QIU12NBV3128ASJH8', add_to: this.state.addTo }
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

export default Auth