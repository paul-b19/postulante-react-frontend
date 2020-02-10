import React from 'react'
import { connect } from 'react-redux'

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-json5"
import "ace-builds/src-noconflict/theme-solarized_light"

import stringifyObject from 'stringify-object'

const Response = (props) => {

  const response = stringifyObject(props.response, {
    indent: '  ',
    singleQuotes: false
  })

  return (
    <div className="respCont">
      <h3>Response Container</h3>

      <AceEditor
        className=""
        mode="json5"
        // mode="javascript"
        theme="solarized_light"
        width="100%"
        height="300px"
        // minLines={10}
        // maxLines={50}
        readOnly={true}
        value={response}
        // fontSize={14}
        name="Response_Read_Only"
        showPrintMargin={false}
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