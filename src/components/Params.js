import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateAttribs } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

class Params extends React.Component {

  state = {
    paramsList: []
  }

  render() {
  
    let paramsList = this.props.attribs.filter( attrib =>
      attrib.attr_type === 'params'
    )
    // let paramsListX = this.state.paramsList
  
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
              { title: 'Value', field: 'value' },
              { title: 'Description (optional)', field: 'description' }
            ]}

            data={ paramsList }
            
            editable={{
              onRowAdd: newData =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    {
                      const data = this.props.attribs
                      let newParam = {...newData, ...{attr_type: 'params'}}
                      data.push(newParam)
                      this.props.updateAttribs(data)
                      this.setState({
                        paramsList: data
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
                        paramsList: data
                      }, () => resolve())
                    }
                    resolve()
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    {
                      const data = this.props.attribs
                      const index = data.indexOf(oldData)
                      data[index] = {...oldData, ...{for_deletion: true}}
                      this.props.updateAttribs(data)                
                      this.setState({ 
                        paramsList: data
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
              //           paramsList: data
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
)(Params)