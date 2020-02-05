import React from 'react'
import { connect } from 'react-redux'

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json5"
import "ace-builds/src-noconflict/mode-xml"
import "ace-builds/src-noconflict/mode-html"
// import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"

const Response = (props) => {

  return (
    <div className="respCont">
      <h3>Response Container</h3>

      <AceEditor
        mode="json5"
        theme="solarized_light"
        width="100%"
        height="300px"
        readOnly={true}
        placeholder="response will be rendered here"
        value={props.response}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    response: state.response
  }
}

export default connect( mapStateToProps )( Response )