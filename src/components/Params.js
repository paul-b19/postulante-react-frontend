import React, { Fragment } from 'react'
import MaterialTable from 'material-table'

import tableIcons from './MTcomponents'


const Params = (props) => {

  return (
    <Fragment>
      <h4>Params</h4>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          title="Params table"
          options={{
            search: false,
            paging: false,
            draggable: false
          }}
          columns={[
            { title: 'Key', field: 'key' },
            { title: 'Value', field: 'value', initialEditValue: 'initial edit value' },
            { title: 'Description', field: 'description' }
          ]}
          data={[
            { key: 'country', value: 'US', description: 'none' },
            { key: 'city', value: 'New York', description: 'none' }
          ]}
          // options={{ selection: true }}
          // actions={[
          //   {
          //     tooltip: 'Remove All Selected Users',
          //     icon: 'delete',
          //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
          //   }
          // ]}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* const data = this.state.data;
                    data.push(newData);
                    this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              }),
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
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
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

export default Params