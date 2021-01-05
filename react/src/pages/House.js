import React, { useEffect, useRef } from 'react';
import Header from '../sections/Header'
import RichEditor from '../components/upload/library/RichEditor';
import CTA from '../components/btns/CTA';
import InlineButton from '../components/btns/InlineButton';
import Inbox from '../sections/Inbox';
import useRichEditor from '../hooks/posts/useRichEditor';
import useLibrary from '../hooks/useLibrary';
import useShowEditor from '../hooks/threads/useShowEditor';
import { CSSTransition } from 'react-transition-group';
 
export default function House() {
    const nodeRef = useRef(null);
    const nav = [ {name: 'house', url: 'house'} ];
    const limit = 10;

    const { getLibraryBooks, 
        handleLibrarySubmit, 
        threads, 
        handleLibraryBookDelete,
        page,
        setPage } = useLibrary(limit);

        useEffect(() => {
            getLibraryBooks();
        }, []); 

    const { showEdit, setEditor } = useShowEditor();
    
    const { 
        title,
        onTitleChange,
        editorState, 
        onNoteChange, 
        clearEditor, 
        mapKeyToEditorCommand, 
        handleKeyCommand, 
        toggleInlineStyle, 
        toggleBlockType 
    } = useRichEditor();

   const sendSubmit = (e) => {
       e.preventDefault(); 
       const data = editorState.getCurrentContent();
       handleLibrarySubmit(data, title);
       clearEditor(); // clear editor on submit 
       setEditor(false);
   };
 
    return (
        <div className="page">
          <Header nav={nav}/>
            <h2 className="page__title" style={{marginLeft:0}}>
              House
            </h2>
          <div className="layer house">
              <div className="house__compose">
                  {showEdit 
                        ? <InlineButton name="close" handleClick={() => setEditor(!showEdit)}/>
                        : <CTA name="new thread" handleClick={() => setEditor(!showEdit)}/> 
                    }
              </div>
                    <CSSTransition 
                    in={showEdit} timeout={350} 
                    nodeRef={nodeRef} classNames="rollDownFadeOut"
                    unmountOnExit>
                        <form style={{transformOrigin:'top'}} 
                                onSubmit={sendSubmit} ref={nodeRef}>
                            <RichEditor title={title}
                                        onTitleChange={onTitleChange}
                                        editorState={editorState} 
                                        onNoteChange={onNoteChange}
                                        mapKeyToEditorCommand={mapKeyToEditorCommand}
                                        handleKeyCommand={handleKeyCommand} 
                                        toggleInlineStyle={toggleInlineStyle}
                                        toggleBlockType={toggleBlockType}
                                        />
                            <div className="inlineForm__submit" style={{justifyContent:'flex-end'}}>
                                    <CTA name="finish" 
                                        type="submit"/> 
                            </div>
                        </form>
                    </CSSTransition> 
                    <h4 className="heavy" style={{paddingBottom:'0.5rem'}}>threads</h4>
                    <Inbox threads={threads} limit={limit}
                            handleLibraryBookDelete={handleLibraryBookDelete}
                            page={page}
                            setPage={setPage}
                    />
            </div>
        </div>
    )
};
