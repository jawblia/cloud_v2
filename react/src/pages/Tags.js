import React, { useContext } from 'react';
import Header from '../sections/Header';
import TagList from '../sections/TagList';
import ListMenu from '../components/ListMenu';
import Filter from '../components/Filter';
import useManyFilters from '../hooks/useManyFilters';
import useOneFilter from '../hooks/useOneFilter';
import useTags from '../hooks/useTags';
import { UserContext } from '../hooks/UserContext';

export default function Tags() {
    const { user } = useContext(UserContext); // get house name here 
    console.log(user.house.house);
    //set sort
    const list = ['recent', 'A - Z', 'count'];
    const { handleOneFilter, activeItem } = useOneFilter('recent');

    //set filter 
    const filters = ['count', 'color'];
    const { handleFilterClick, activeFilter } = useManyFilters(['color']);

    //get tags
    const { tags, tagTotal, handlePaintClick, eyedrop } = useTags(activeItem);
 
    return(
        <div className="page">
            <Header/> 
            <div className="houseTags__header"> 
                    <h3>{user.house.house} labels</h3> 
                    <Filter filters={filters} activeFilter={activeFilter} handleFilterClick={handleFilterClick} 
                            handlePaintClick={handlePaintClick} eyedrop={eyedrop}
                            />
            </div>
            <div className="room">
                <div className="room__sidebar">
                    <ListMenu title={'sort'} list={list} activeItem={activeItem} handleOneFilter={handleOneFilter}/>
                </div>
                <div className="room__body">
                    <TagList tags={tags} tagTotal={tagTotal} activeFilter={activeFilter} eyedrop={eyedrop}
                    />
                </div>
            </div>
        </div>
    )
}