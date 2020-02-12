import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Headers extends React.Component {

  state = {
    headersList: []
  }

  render() {

    let headersList = this.props.attribs.filter( attrib =>
      attrib.attr_type === 'headers' && !attrib.for_deletion
    )
    // let headersListX = this.state.headersList
  
    return (
      <Fragment>
        <h4 style={{ paddingLeft: "8px" }}><FontAwesomeIcon icon="cog" /> Headers</h4>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            style={{ backgroundColor: '#fbf1d3' }}
            icons={tableIcons}
            title="Edit headers"
            options={{
              search: false,
              paging: false,
              draggable: false,
              rowStyle: { backgroundColor: '#fdf6e3' },
              headerStyle: { backgroundColor: '#fdf6e3' }
            }}
            columns={[
              { title: 'Key', field: 'key' },
              { title: 'Value', field: 'value' },
              { title: 'Description (optional)', field: 'description' }
            ]}

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
                      data[index] = {...oldData, ...{for_deletion: true}}
                      this.props.updateAttribs(data)
                      this.setState({
                        headersList: data
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
              //           headersList: data
              //         }, () => resolve())
              //       }
              //       resolve()
              //     }, 1000)
              //   })
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