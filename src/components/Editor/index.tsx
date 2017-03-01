import * as React from 'react'
import {
  MouseEventHandler,
  PureComponent,
  StatelessComponent,
  SyntheticEvent,
} from 'react'
import {
  ContentBlock,
  Editor as DraftEditor ,
  EditorState,
  RichUtils,
} from 'draft-js'

System.import('./index.scss')

function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return ''
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

const BLOCK_TYPES = [
  {element: <h1>H1</h1>, style: 'header-one', label: 'H1'},
  {element: <h2>H2</h2>, style: 'header-two', label: 'H2'},
  {element: <h3>H3</h3>, style: 'header-three', label: 'H3'},
  {element: <h4>H4</h4>, style: 'header-four', label: 'H4'},
  {element: <h5>H5</h5>, style: 'header-five'},
  {element: <h6>H6</h6>, style: 'header-six'},
  {element: <blockquote>blockquote</blockquote>, style: 'blockquote'},
  {element: <ul><li/></ul>, style: 'unordered-list-item'},
  {element: <ol><li/></ol>, style: 'ordered-list-item'},
  {element: <code>code</code>, style: 'code-block'},
]

class StyleButton extends PureComponent<any, undefined> {
  onToggle: MouseEventHandler<HTMLElement> = e => {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.children}
      </span>
    )
  }
}

const BlockStyleControls: StatelessComponent<any> = (props) => {
  const {editorState} = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
    {
      BLOCK_TYPES.map(
        (block, index) => {
          const {style, element} = block
          const label = (block as any).label

          return (
            <StyleButton
              key={index}
              label={label || ''}
              active={style === blockType}
              onToggle={props.onToggle}
              style={style}
            >
              {element}
            </StyleButton>
          )
        }
      )
    }
    </div>
  )
}

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
]

const InlineStyleControls: StatelessComponent<any> = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className="RichEditor-controls">
      {
        INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
    </div>
  )
}

interface EditorProps {
  state: EditorState
  onBoldClick: MouseEventHandler<HTMLButtonElement>
  onChange: (editorState: EditorState) => void
  onKeyCommand: any
  onTab: (e: SyntheticEvent<any>) => void
}

export class Editor extends PureComponent<EditorProps, undefined> {
  editorRef?: any

  handleEditorRef = (ref: any) => this.editorRef = ref

  handleEditorClick = () => {
    const { editorRef } = this

    if(editorRef) {
      editorRef.focus()
    }
  }

  toggleBlockType = (blockType: any) =>
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.state,
        blockType
      )
  )

  toggleInlineStyle = (inlineStyle: any) =>
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.state,
        inlineStyle
      )
    )

  render() {
    const {
      handleEditorClick,
      handleEditorRef,
      props: {
        state,
        // onBoldClick,
        onChange,
        onKeyCommand,
        onTab,
      },
      toggleBlockType,
      toggleInlineStyle,
    } = this
    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={state}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={state}
          onToggle={toggleInlineStyle}
        />
        <div className="os_appEditor" onClick={handleEditorClick}>
          {/*<button onClick={onBoldClick}>Bold</button>*/}
          <DraftEditor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={state}
            handleKeyCommand={onKeyCommand}
            onChange={onChange}
            onTab={onTab}
            placeholder="Enter some text"
            ref={handleEditorRef}
            spellCheck
          />
        </div>
      </div>
    )
  }
}
