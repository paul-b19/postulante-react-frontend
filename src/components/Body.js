import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateBodies } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-json5"
import "ace-builds/src-noconflict/mode-xml"
import "ace-builds/src-noconflict/mode-html"
// import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"


class Body extends React.Component {

  state = {
    body: 'None', // 'Form-Data'/'Raw'
    fdBodiesList: [],
    rawBody: ''
  }

  handleBody = (e) => {
    console.log(e.target.value)
    this.setState({
      body: e.target.value
    })
  }

  handleEditor = (newValue) => {
    console.log("editor new value", newValue)
    let rawBody = this.props.bodies.find( ({body_type}) =>
      body_type === 'Raw'
    )
    // updating rawBody
    if (rawBody && newValue) {
      const data = this.props.bodies
      const index = data.indexOf(rawBody)
      data[index] = {...rawBody, ...{raw_body: newValue, for_deletion: false}}
      this.props.updateBodies(data)                
      this.setState({
        rawBody: newValue
      })
      // const data = this.props.bodies
      // const index = data.indexOf(rawBody)
      // data[index].raw_body = newValue
      // this.props.updateBodies(data)                
      // this.setState({
      //   rawBody: newValue
      // })
    // creating rawBody
    } else if (!rawBody && newValue) {
      const data = this.props.bodies
      let newBody = {body_type: 'Raw', raw_body: newValue, for_deletion: false}
      data.push(newBody)
      this.props.updateBodies(data)
      this.setState({
        rawBody: newValue
      })
      // const data = this.props.bodies
      // let newBody = {body_type: 'Raw', raw_body: newValue}
      // data.push(newBody)
      // this.props.updateBodies(data)
      // this.setState({
      //   rawBody: newValue
      // })
    // deleting rawBody
    } else if (rawBody && !newValue) {
      let data = this.props.bodies
      const index = data.indexOf(rawBody)
      data[index] = {...rawBody, ...{raw_body: newValue, for_deletion: true}}
      this.props.updateBodies(data)
      this.setState({
        rawBody: newValue
      })
      // let data = this.props.bodies
      // const index = data.indexOf(rawBody)
      // data.splice(index, 1)
      // this.props.updateBodies(data)
      // this.setState({
      //   rawBody: newValue
      // })
    }
  }

  render () {

    let fdBodiesList = this.props.bodies.filter( body =>
      body.body_type === 'Form-Data'
    )
    let rawBody = this.props.bodies.find( ({body_type}) =>
      body_type === 'Raw'
    )

    return (
      <Fragment>
        <h4>Body</h4>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-outline-primary active">
            <input type="radio" name="body-tabs" value="None" 
                   onChange={this.handleBody} checked={this.state.body === 'None'}
                   onClick={this.handleBody} />
            None
          </label>
          <label className="btn btn-outline-primary">
            <input type="radio" name="body-tabs" value="Form-Data" 
                   onChange={this.handleBody} checked={this.state.body === 'Form-Data'}
                   onClick={this.handleBody} />
            Form-Data
          </label>
          <label className="btn btn-outline-primary">
            <input type="radio" name="body-tabs" value="Raw" 
                   onChange={this.handleBody} checked={this.state.body === 'Raw'}
                   onClick={this.handleBody} />
            Raw
          </label>
        </div>

        {/***  selecting form-data tab  ***/}
        {this.state.body === 'Form-Data' &&
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
                { title: 'Value', field: 'value' },
                { title: 'Description (optional)', field: 'description' }
              ]}

              data={ fdBodiesList }
              
              editable={{
                onRowAdd: newData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = this.props.bodies
                        let newBody = {...newData, ...{body_type: 'Form-Data'}}
                        data.push(newBody)
                        this.props.updateBodies(data)
                        this.setState({
                          fdBodiesList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        const data = this.props.bodies
                        const index = data.indexOf(oldData)
                        data[index] = newData
                        this.props.updateBodies(data)                
                        this.setState({
                          fdBodiesList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      {
                        let data = this.props.bodies
                        const index = data.indexOf(oldData)
                        data[index] = {...oldData, ...{for_deletion: true}}
                        this.props.updateBodies(data)
                        this.setState({
                          fdBodiesList: data
                        }, () => resolve())
                      }
                      resolve()
                    }, 1000)
                  })
                // onRowDelete: oldData =>
                //   new Promise((resolve) => {
                //     setTimeout(() => {
                //       {
                //         let data = this.props.bodies
                //         const index = data.indexOf(oldData)
                //         data.splice(index, 1)
                //         this.props.updateBodies(data)
                //         this.setState({
                //           fdBodiesList: data
                //         }, () => resolve())
                //       }
                //       resolve()
                //     }, 1000)
                //   })
              }}
            />
          </div>
        }

        {/***  selecting raw tab (Ace Editor) ***/}
        {this.state.body === 'Raw' &&
          <div style={{ maxWidth: "100%" }}>
            <AceEditor
              mode="json5"
              theme="solarized_light"
              width="100%"
              height="150px"
              placeholder="enter request body here"
              value={ rawBody && rawBody.raw_body }
              onChange={this.handleEditor}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
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
    bodies: state.bodies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBodies: (data) => dispatch(updateBodies(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)