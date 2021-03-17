import React, {useState} from "react";

const SearchComponent = ({searchGroup }) => {
    const [searchString, setSearchString] = useState('');

    const handleSearch = (e) => {
        setSearchString(e.target.value);
        searchGroup(searchString);
    }
    return (
        <div className="search-box center-align">
            <div className="row center-align">
                <div className="input-field col s9">
                    <input
                        id="groupName"
                        type="text"
                        className="validate"
                        value={searchString}
                        onChange={handleSearch}
                    />
                    <label htmlFor="groupName">Group Name</label>
                </div>
                <div className="col s3 valign-wrapper">
                    <a className="btn-floating waves-light blue add">
                        <i className="material-icons">search</i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent;
