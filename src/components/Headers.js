import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

class Headers extends React.Component {

  state = {
    headersList: []
  }

  render() {

    let headersList = this.props.attribs.filter( attrib =>
      attrib.attr_type === 'headers'
    )
    // let headersListX = this.state.headersList
  
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
              { title: 'Value', field: 'value' },
              { title: 'Description (optional)', field: 'description' }
            ]}
            // data={[
            //   { key: 'country', value: 'US', description: 'none' }
            // ]}
            data={ headersList }
            
            editable={{
              onRowAdd: newData =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    {
                      const data = this.props.attribs
                      let newHeader = {...newData, ...{attr_type: 'headers'}}
                      data.push(newHeader)
                      this.props.updateAttribs(data)
                      this.setState({
                        headersList: data
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
                        headersList: data
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
                        headersList: data
                      }, () => resolve())
                    }
                    resolve()
                  }, 1000)
                })
            }}
          />
        </div>
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
)(Headers)