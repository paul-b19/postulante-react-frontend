import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <div className="d-flex bd-highlight">
        <div className="mr-auto p-2 bd-highlight">
          <h3><FontAwesomeIcon icon="quote-right" /> Response</h3>
        </div>
        <div className="p-2 bd-highlight">
          {props.responseStatus && props.responseStatus === 'spin' ? 
            <h5><FontAwesomeIcon icon="sync-alt" className="fa-spin" /></h5>
          :
            null}
          {/* <h5><FontAwesomeIcon icon="sync-alt" className="fa-spin" /></h5> */}
        </div>
        <div className="p-2 bd-highlight">
          {props.responseStatus && props.responseStatus !== 'spin' ? 
            <h5>{props.responseStatus}</h5>
          :
            null}
        </div>
        <div className="p-2 bd-highlight">
          {props.responseStatusText && <h5>{props.responseStatusText}</h5>}
        </div>
      </div>

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
    response: state.response,
    responseStatus: state.responseStatus,
    responseStatusText: state.responseStatusText
  }
}

export default connect( mapStateToProps )( Response )