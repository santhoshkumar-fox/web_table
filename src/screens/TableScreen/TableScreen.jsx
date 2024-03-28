import React, { useEffect, useState } from "react";
import "./TbleScreen.css";
import { TailSpin } from "react-loader-spinner";
import appLogo from "../../assets/app_logo.png";
import applogoText from "../../assets/app_logo_text.png";
import bookLogo from "../../assets/book_logo.png";
import dashLogo from "../../assets/dashboard_logo.png";
import settingLogo from "../../assets/settinglogo.png";
import LimitPicker from "../../limitPicker/limitPicker";



function TableScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [isHover, setisHover] = useState(false);
  const [limit,setlimit] = useState(10)
  const [isLoading, setisLoading] = useState(false);

  const onNextCallback = () => {
    if (currentPage != totalPage && currentPage + 1 <= totalPage) {
      setCurrentPage(currentPage + 1);
      getFetchData(currentPage + 1,limit);
    }
  };

  const onPrevCallback = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
      getFetchData(currentPage - 1,limit);
    }
  };

  const onLimitCallback = (limitValue)=>{
    if (limitValue != undefined) {
      setCurrentPage(currentPage - 1);
      setlimit(limitValue)
      getFetchData(currentPage - 1,limitValue);
    }

  }

  const getFetchData = async (page=0,limit=5) => {
   try {
    const options = { method: "GET" };
    setisLoading(true);
    await fetch(
      `http://fe-test.dev.rampnow.io:8000/api/books?page=${page}&limit=${limit}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(() => response.data);
        setTotalCount(response.count);
        setCurrentPage(response.page)
        setTotalPage(Math.floor(response.count  / response.limit));
        setTimeout(() => {
          setisLoading(false);
        }, 1000);
      })
      .catch((err) => console.error(err));
   } catch (error) {
    console.error(err)
   }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div className="tableScreen">
      {/* app bar */}
      <div
        className="appbarContainer"
        onMouseEnter={() => {
          setisHover(true);
        }}
        onMouseLeave={() => {
          setisHover(false);
        }}
      >
        {/* app logo */}
        <div className="applogocontainer">
          <img
            src={appLogo}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
          <img
            className="hoveranimation"
            src={applogoText}
            style={{
              width: 150,
              height: 30,
              marginTop: 10,
              opacity: isHover ? 1 : 0,
            }}
          />
        </div>

        {/* navigation */}
        <div className="navigationContainer">
          {/* dashboard */}
          <div className="navigationRowConatiner">
            <img
              src={dashLogo}
              style={{ width: 20, height: 20, marginRight: 20, marginLeft: 10 }}
            />
            <p
              className="hoveranimation"
              style={{
                width: 150,
                height: 30,
                fontSize: 17,
                fontWeight: "bold",
                opacity: isHover ? 1 : 0,
              }}
            >
              Dashboard
            </p>
          </div>
          {/* book */}
          <div className="navigationRowConatiner" style={{ opacity: 1 }}>
            <img
              src={bookLogo}
              style={{
                minWidth: 20,
                maxWidth: 20,
                height: 20,
                marginRight: 20,
                marginLeft: 10,
              }}
            />
            <p
              className="hoveranimation"
              style={{
                width: 150,
                height: 30,
                fontSize: 17,
                fontWeight: "bold",
                opacity: isHover ? 1 : 0,
              }}
            >
              Products
            </p>
          </div>
        </div>
        {/* settings */}
        <div className="navigationRowConatiner" style={{ marginBottom: 40 }}>
          <img
            src={settingLogo}
            style={{
              minWidth: 20,
              maxWidth: 20,
              height: 20,
              marginRight: 20,
              marginLeft: 10,
            }}
          />
          <p
            className="hoveranimation"
            style={{
              width: 150,
              height: 30,
              fontSize: 17,
              fontWeight: "bold",
              opacity: isHover ? 1 : 0,
            }}
          >
            Settings
          </p>
        </div>
      </div>
      <div className="contentContainer">
        <div className="cardContainer">
          {/* filtercontaiiner */}
          <div className="filterContainer">
            <h2 style={{ color: "black", marginLeft: "20px" }}>Products</h2>

            <div className="limitRContainer">
              <p >Limits</p>
            <LimitPicker values={[10,15,20,25]} onLimitCallback={onLimitCallback} selectedValue={limit}/>
            </div>
          </div>
          {/* table container */}

          <div className="tableContainer">
            {/* table */}
            {isLoading ? (
              <div className="loaderContaienr">
                <TailSpin
                  height="30"
                  width="30"
                  color="black"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 30 }}>ID</th>
                    <th>Title</th>
                    <th>Language</th>
                    <th>Author</th>
                    <th>Country</th>
                    <th style={{ textAlign: "center", width: 70 }}>Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((e) => {
                    return (
                      <tr>
                        <th style={{ width: 30 }}>{e.id}</th>
                        <th>{e.title}</th>
                        <th>{e.language}</th>
                        <th>{e.author == "Unknown" ? "--" : e.author}</th>
                        <th>{e.country}</th>
                        <th style={{ textAlign: "center", width: 70 }}>
                          {e.pages}
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          <div className="footerContainer">
            {
              <p>
                {data?.[0]?.id != undefined
                  ? `Show of ${data?.[0]?.id} to ${
                      data?.[data?.length - 1]?.id
                    } of ${totalCount} entries`
                  : ""}
              </p>
            }
            <div className="pagenationContainer">
              <div onClick={onPrevCallback} className="buttonContainer">
                <p>Prev</p>
              </div>
              <p> {`${currentPage} / ${totalPage}`} </p>
              <div onClick={onNextCallback} className="buttonContainer">
                <p>Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableScreen;
