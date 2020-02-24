import React, { useEffect, Fragment } from "react";
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/Feed/feed";
import Pagination from "../../components/Pagination/pagination";

import "../globalFeed/globalFeed.css";

const GlobalFeed = () => {
  const apiUrl = "/articles?limit=15&offset=0";
  const [{ response, isLoading, err }, doFetch] = useFetch(apiUrl);
  console.log("response", response);

  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {err && <div>Some error happend</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination total={500} limit={10} url="/" currentPage={2} />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
