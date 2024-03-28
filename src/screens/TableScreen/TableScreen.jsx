import React, {  useEffect, useState } from "react";
import "./TbleScreen.css";
import { TailSpin } from "react-loader-spinner";
import appLogo from '../../assets/app_logo.png'
import applogoText from '../../assets/app_logo_text.png'
import bookLogo from '../../assets/book_logo.png'
import dashLogo from '../../assets/dashboard_logo.png'
import settingLogo from '../../assets/settinglogo.png'


const sampleData = [
    {
      id: 1,
      category: 'Electronics',
      company: 'ABC Electronics',
      product: 'Smartphone',
      description: 'A high-performance smartphone with advanced features',
      price: 599.99
    },
    {
      id: 2,
      category: 'Clothing',
      company: 'XYZ Fashion',
      product: 'T-Shirt',
      description: 'A comfortable cotton t-shirt in various colors',
      price: 19.99
    },
    {
      id: 3,
      category: 'Home & Kitchen',
      company: 'Home Essentials',
      product: 'Coffee Maker',
      description: 'An automatic coffee maker for brewing fresh coffee',
      price: 79.99
    },
    {
      id: 4,
      category: 'Electronics',
      company: 'Tech Solutions',
      product: 'Wireless Headphones',
      description: 'High-quality wireless headphones for immersive audio experience',
      price: 129.99
    },
    {
      id: 5,
      category: 'Beauty & Personal Care',
      company: 'Glamour Beauty',
      product: 'Perfume',
      description: 'A fragrance with a blend of floral and fruity notes',
      price: 49.99
    },
    {
      id: 6,
      category: 'Sports & Outdoors',
      company: 'Outdoor Gear',
      product: 'Hiking Backpack',
      description: 'A durable backpack with multiple compartments for hiking enthusiasts',
      price: 89.99
    },
    {
      id: 7,
      category: 'Home & Kitchen',
      company: 'Kitchen Essentials',
      product: 'Blender',
      description: 'A powerful blender for making smoothies and shakes',
      price: 59.99
    },
    {
      id: 8,
      category: 'Books',
      company: 'Bookstore',
      product: 'Novel',
      description: 'A captivating novel by a renowned author',
      price: 14.99
    },
    {
      id: 9,
      category: 'Clothing',
      company: 'Fashion Trends',
      product: 'Jeans',
      description: 'Stylish and comfortable denim jeans for everyday wear',
      price: 39.99
    },
    {
      id: 10,
      category: 'Beauty & Personal Care',
      company: 'Skin Essentials',
      product: 'Moisturizer',
      description: 'A hydrating moisturizer for soft and supple skin',
      price: 24.99
    },
    {
        id: 10,
        category: 'Beauty & Personal Care',
        company: 'Skin Essentials',
        product: 'Moisturizer',
        description: 'A hydrating moisturizer for soft and supple skin',
        price: 24.99
      },
      {
        id: 10,
        category: 'Beauty & Personal Care',
        company: 'Skin Essentials',
        product: 'Moisturizer',
        description: 'A hydrating moisturizer for soft and supple skin',
        price: 24.99
      },
      {
        id: 10,
        category: 'Beauty & Personal Care',
        company: 'Skin Essentials',
        product: 'Moisturizer',
        description: 'A hydrating moisturizer for soft and supple skin',
        price: 24.99
      },
  ];
  
function TableScreen() {

  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(10);
  const [totalCount,setTotalCount] = useState(0);
  const [data,setData] = useState([]);
  const [isLoading,setisLoading] = useState(false);

  const onNextCallback = ()=>{
      if(currentPage !=  totalPage && currentPage+1 <= totalPage){
        setCurrentPage(currentPage+1);
        console.log(currentPage+1);
        getFetchData(currentPage+1);
      };
      
  }


  const onPrevCallback = ()=>{
      if(currentPage != 1){
        console.log(currentPage-1);
        setCurrentPage(currentPage-1)
        getFetchData(currentPage-1);
      }
  }

  const getFetchData = async(page)=>{
    const options = {method: 'GET'};
  setisLoading(true);
  await fetch(`http://fe-test.dev.rampnow.io:8000/api/books?page=${page}&limit=10`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    setData(()=>(response.data));
    setTotalCount(response.count);
    setTotalPage((response.count ?? 10) / 10);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
    
  })
  .catch(err => console.error(err));
  }

  useEffect(()=>{
    getFetchData();
  },[]);

  return (
    <div className="tableScreen">
      {/* app bar */}
      <div className="appbarContainer">
        {/* app logo */}
        <div className="applogocontainer">
          <img src={appLogo} style={{width:50,height:50,marginRight:10}}/>
          <img src={applogoText} style={{width:150,height:30,marginTop:10}}/>
        </div>

        {/* navigation */}
        <div className="navigationContainer">
          {/* dashboard */}
          <div className="navigationRowConatiner">
          <img src={dashLogo} style={{width:30,height:30,marginRight:20,marginLeft:10}}/>
          <p  style={{width:150,height:30,fontSize:17,fontWeight:'bold'}}>Dashboard</p>
          </div>
          {/* book */}
          <div className="navigationRowConatiner" style={{opacity:1}}>
          <img src={bookLogo} style={{minWidth:30,maxWidth:30,height:30,marginRight:20,marginLeft:10}}/>
          <p  style={{width:150,height:30,fontSize:17,fontWeight:'bold'}}>Products</p>
          </div>
         
        </div>
        {/* settings */}
        <div className="navigationRowConatiner" style={{marginBottom:40}}>
          <img src={settingLogo} style={{minWidth:30,maxWidth:30,height:30,marginRight:20,marginLeft:10}}/>
          <p  style={{width:150,height:30,fontSize:17,fontWeight:'bold'}}>Settings</p>
          </div>


      </div>
      <div className="contentContainer">

        <div className="cardContainer">
          {/* filtercontaiiner */}
          <div className="filterContainer">
            <h2 style={{color:"black",marginLeft:'20px'}}>Products</h2>

          </div>
          {/* table container */}
        
      <div className="tableContainer">
        {/* table */}
       {isLoading ?
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
        :
       <table>
            <thead>
                <tr>
                <th style={{width:30}}>ID</th>
                <th>Title</th>
                <th>Language</th>
                <th>Author</th>
                <th>Country</th>
                <th style={{textAlign:'center',width:70}}>Pages</th>
                </tr>
            </thead>
            <tbody>

                {data.map((e)=>{
                    return(
                        <tr>
                            <th style={{width:30}}>{e.id}</th>
                            <th>{e.title}</th>
                            <th>{e.language}</th>
                            <th>{e.author == 'Unknown' ? '--':e.author}</th>
                            <th>{e.country}</th>
                            <th style={{textAlign:'center',width:70}}>{e.pages}</th>
                        </tr>
                    )
                })}
                
            </tbody>

        </table>}
        </div>
        <div className="footerContainer" >
         { <p>{(((data?.[0]?.id) != undefined)) ? `Show of ${data?.[0]?.id} to ${data?.[data?.length -1 ]?.id} of ${totalCount} entries`:''}</p>}
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
