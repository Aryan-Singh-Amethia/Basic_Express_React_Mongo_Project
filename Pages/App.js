import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { BrowserRouter,Routes,Route, Link } from "react-router-dom";
import Product from "./Product";
import AddProduct from "./AddProduct";
import EditProduct  from "./EditProduct";

function App() {
  const [products , setProducts] = useState([]);

  useEffect(()=>{ 
    let data = [];
     axios.get('http://localhost:3000/products')
          .then((response)=>{
            console.log(response);
            let {data:myData , status} = {...response};
            console.log('data :: ',{...myData});
            console.log('status :: ',status);
            data = myData;
            setProducts(data);
          })
          .catch(err=>console.log("Failed to fetch Data From Mongo"))
          .finally(console.log('Use Effect executed')); 
          
  },[]);
  console.log('PRODUCTS :: ',products);
  return(
    <div>
       <h1>**** PRODUCTS ****</h1>
       <div>
        <BrowserRouter>
        <Link to={'/products/add/'} element={<AddProduct/>}>Add Product</Link>
        <Routes>
        <Route path={'/products'} element={
          <div>
            {products.map(p=>{
              return(
                <div key={p._id}>
                  <Link to={`/products/${p._id}`}>{p.name}</Link>
                </div>  
              );
            })}
          </div>
        }/>
        {
        products.map(product=>{
          return(
        <Route key={product._id} path={`/products/${product._id}`} element={<Product props={product}/>}/>
        )})
        }
        <Route path="/products/add/" element={<AddProduct/>}/>
        <Route path="/products/:id/edit" element={<EditProduct/>}/>
        </Routes>
        </BrowserRouter>
       </div>
    </div>
  );
}

export default App;
