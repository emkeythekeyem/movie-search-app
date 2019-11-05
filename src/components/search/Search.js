import React from "react";

export default  function Search(props){

    function handleSendQuery(e)
    {
        props.onSelectSearch(e.target.value)
    }
    
    return (
        <div>
            <label>Title</label>
            <input type="text" onChange={handleSendQuery} />
        </div>
    );
    
}
