import React, { useEffect, useState, useRef } from 'react';
import usePositionPoints from '../../hooks/usePositionPoints';

const PathCellContent = ({ posts }) => {
    console.log(posts);
    const cellRef = useRef(null);
    const [coords, setCoords] = useState(null);

    const { getPinPos, pins } = usePositionPoints();

    useEffect(() => {
        if(cellRef.current) {
           const c = cellRef.current.getBoundingClientRect();
           const radius = c.width / 2;
           const centerX = c.x + (c.height / 2);
           const centerY = c.y + radius;
            setCoords({radius, centerX, centerY}); 
        }
    }, []);

    useEffect(() => {
        if(coords) {
            getPinPos(coords, posts);
        }
    }, [coords]);

    return (
        <div className="pathCell--posts" ref={cellRef}>
            {pins && pins}
        </div>
    );
}
 
export default PathCellContent;