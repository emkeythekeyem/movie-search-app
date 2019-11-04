import React from "react";

class Search extends React.Component {
    constructor(props)
    {
        super(props)
        this.handleSendQuery = this.handleSendQuery.bind(this);
    }

    handleSendQuery(e)
    {
        this.props.onSelectSearch(e.target.value)
    }

    render() {
        return (
            <div>
                <label>Title</label>
                <input type="text" onChange={this.handleSendQuery} />
            </div>
        );
      }
}

export default Search;