import React from 'react'

import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json5"
import "ace-builds/src-noconflict/mode-xml"
import "ace-builds/src-noconflict/mode-html"
// import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"

const ResponseContainer  = (props) => {

  const handleEditor = (newValue) => {
    console.log("editor new value", newValue)
  }

  return (
    <div className="respCont">
      <h3>Response Container</h3>

      <AceEditor
        mode="json5"
        theme="solarized_light"
        width="100%"
        height="300px"
        readOnly="true"
        onChange={handleEditor}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  )
}

export default ResponseContainer