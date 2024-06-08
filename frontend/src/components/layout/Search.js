import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const location = useLocation()

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };
  const clearKeyWord = ()=>{
  setKeyword("")
  }
 useEffect(()=>{
 if(location.pathname === '/'){
  clearKeyWord();
 }
 },[location])
  return (
    <Fragment>
      <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            value={keyword}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Search;
