import React, { useContext, useState } from 'react'; 
import Header from '../sections/Header';
import { UserContext } from '../hooks/UserContext';
import CTA from '../components/btns/CTA'; 
import UploadContainer from '../components/upload/UploadContainer';
import { VscLink, VscSymbolParameter, VscArchive } from 'react-icons/vsc';
import SelectMenu from '../components/SelectMenu';
import Drawer from '../components/Drawer';
import useUpload from '../hooks/useUpload';
import useTags from '../hooks/useTags';
 
export default function Add(props) { 
    const { user, rooms } = useContext(UserContext);

    //breadcrumbs
    const roomFrom = props.location.state || 'kitchen';
    const nav = [ {name: roomFrom, url: roomFrom } ];
 
    //upload component 
    const buttons = [
        {name: 'link', icon: <VscLink className="icon icon__btn" data-id="link"/>}, 
        {name: 'note', icon: <VscSymbolParameter className="icon icon__btn" data-id="note"/>},
        {name: 'file', icon: <VscArchive className="icon icon__btn" data-id="file"/>}
    ];
    const [type, setType]= useState('link');
    const switchType = (e) => { setType(e.target.dataset.id); }

    //handle page state 
    const { values, handleChange, results, selectItem, searchRef, addTags, selectTag, clearInput, removeTag, handleSubmit } = useUpload({
        initialValues: {
            type: 'link',
            content: '',
            input: '',
            tags: [],
            comment: '',
            house: user.house,
            user: user._id,
            room: roomFrom
        }
    });

    const { tags } = useTags();
     return ( 
        <div className="page"> 
            <Header nav={nav}/>
            <form style={{width:'75%'}} onSubmit={handleSubmit}>
                <UploadContainer buttons={buttons} type={type} switchType={switchType} results={results} room={roomFrom}
                                values={values} handleChange={handleChange} searchRef={searchRef} selectTag={selectTag}
                                clearInput={clearInput} removeTag={removeTag} addTags={addTags}/>
                <div className="inlineForm__submit" style={{justifyContent:'flex-end', paddingTop:'3rem'}}>
                    <div className="flex alignCenter" style={{marginRight:'3rem'}}> 
                        <h4>Place in</h4> 
                        <SelectMenu items={rooms} active={values.room} selectItem={selectItem}/> 
                    </div>  
                        <CTA name={"add"} type={"submit"}/> 
                    </div>
            </form>
            <span className="fixedTab">
                <Drawer items={tags}/>
            </span>
        </div>
    )
}