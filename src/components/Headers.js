import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

const Headers = (props) => {

  let headersList = props.attribs.filter( attrib =>
    attrib.attr_type === 'headers'
  )

  return (
    <Fragment>
      <h4>Headers</h4>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          title="Headers table"
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
          // data={[
          //   { key: 'country', value: 'US', description: 'none' },
          //   { key: 'city', value: 'New York', description: 'none' }
          // ]}
          data={ headersList }
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
)(Headers)