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
  }

  render () {

    let fdBodiesList = this.props.bodies.filter( body =>
      body.body_type === 'Form-Data'
    )
    // let reqFdBody = this.props.bodies.filter( body =>
    //   body.body_type === 'Form-Data'
    // )
    let rawBody = this.props.bodies.find( ({body_type}) =>
      body_type === 'Raw'
    )
    // let reqRawBody = this.props.bodies.find( ({body_type}) =>
    //   body_type === 'Raw'
    // )

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
                { title: 'Description', field: 'description' }
              ]}
              // data={[
              //   { key: 'country', value: 'US', description: 'none' }
              // ]}
              data={ fdBodiesList }
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
                  new Promise((resolve) => {
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
        }

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