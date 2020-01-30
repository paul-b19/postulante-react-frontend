import React, { Fragment } from 'react'
import MaterialTable from 'material-table'

import tableIcons from './MTcomponents'


const Body = (props) => {

  return (
    <Fragment>
      <h4>Body</h4>

      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="params" 
                 onChange={props.handleTab} checked={props.tab === 'params'}
                 onClick={props.handleTab} />
          None
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="authorization" 
                 onChange={props.handleTab} checked={props.tab === 'authorization'}
                 onClick={props.handleTab} />
          Form-Data
        </label>
        <label className="btn btn-outline-primary">
          <input type="radio" name="tabs" value="headers" 
                 onChange={props.handleTab} checked={props.tab === 'headers'}
                 onClick={props.handleTab} />
          Raw
        </label>
      </div>

      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          title="Form-Data"
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

export default Body