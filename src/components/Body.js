import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { updateBodies } from '../actions'
import MaterialTable from 'material-table'
import tableIcons from './MTcomponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-json5"
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
    // creating rawBody
    } else if (!rawBody && newValue) {
      const data = this.props.bodies
      let newBody = {body_type: 'Raw', raw_body: newValue, for_deletion: false}
      data.push(newBody)
      this.props.updateBodies(data)
      this.setState({
        rawBody: newValue
      })
    // deleting rawBody
    } else if (rawBody && !newValue) {
      let data = this.props.bodies
      const index = data.indexOf(rawBody)
      data[index] = {...rawBody, ...{raw_body: newValue, for_deletion: true}}
      this.props.updateBodies(data)
      this.setState({
        rawBody: newValue
      })
    }
  }

  render () {

    let fdBodiesList = this.props.bodies.filter( body =>
      body.body_type === 'Form-Data' && !body.for_deletion
    )
    let rawBody = this.props.bodies.find( ({body_type}) =>
      body_type === 'Raw'
    )

    return (
      <Fragment>
        <h4><FontAwesomeIcon icon="cogs" /> Body</h4>
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
              style={{ backgroundColor: '#fbf1d3' }}
              icons={tableIcons}
              title="Form-Data"
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
              }}
            />
          </div>
        }

        {/***  selecting raw tab (Ace Editor) ***/}
        {this.state.body === 'Raw' &&
          <div style={{ maxWidth: "100%" }}>
            <AceEditor
              className=""
              placeholder="Enter request body here"
              mode="json5"
              // mode="javascript"
              theme="solarized_light"
              name="Raw_Body_Input"
              value={ rawBody && rawBody.raw_body }
              onChange={this.handleEditor}
              // fontSize={14}
              showPrintMargin={false}
              width="100%"
              height="150px"
              // minLines={10}
              // maxLines={50}
              editorProps={{ $blockScrolling: true }}
              setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              // enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
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