import React, { Fragment, useContext } from "react";
import Gist from "./Gist";
import { searchContext } from "../context/SearchContext";
const GistList = () => {
  const { gistList, loading, error, search } = useContext(searchContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <h3>{error?.response?.data?.message || "Not Found"}</h3>;
  }
  return (
    <div>
      <div className="h5">
        {search ? (
          <span>
            Results for
            <a className="ms-1" href={`https://github.com/${search}`}>
              {search}
            </a>
          </span>
        ) : (
          "Public Gists"
        )}
      </div>

      {gistList?.map((gist, i) => (
        <Fragment key={i}>
          <Gist gist={gist} />
          <hr />
        </Fragment>
      ))}
    </div>
  );
};
export default GistList;
