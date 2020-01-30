import React, { Fragment } from 'react'
import MaterialTable from 'material-table'

import tableIcons from './MTcomponents'


const Auth = (props) => {

  return (
    <Fragment>
      <h4>Authorization</h4>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          title="Authorization"
          // totalCount={1}
          options={{
            search: false,
            paging: false
          }}
          columns={[
            { title: 'Key', field: 'key' },
            { title: 'Value', field: 'value', initialEditValue: 'initial edit value' },
            { title: 'Add to', field: 'add_to' }
          ]}
          data={[
            { key: 'API_KEY', value: 'QIU12NBV3128ASJH8', add_to: 'headers' }
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
    </Fragment>
  )
}

export default Auth