import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Product = ({props}) =>{

   const navigate = useNavigate();

   const storeExistingData = () =>{
      localStorage.setItem('_id',props._id);
      localStorage.setItem('name',props.name);
      localStorage.setItem('price',props.price);
      localStorage.setItem('category',props.category);
   };

   const onDeleteHandler = (id) =>{
      axios.post(`http://localhost:3000/products/${id}/delete`,
                 {
                  id : id
                 },
                 {
                  header : {
                     'Content-Type' : 'application/json'
                  }
                 })
           .then((res)=>{
               console.log('Delete POST request was successful !!');
               navigate('/products');
           }) 
           .catch(err => console.log("Delete request failed !!"));
   };

   console.log('PROPS::',props);
   return(
    <div>
       <h1>{props.name}</h1>
       <ul>
         <li>{props.price}</li>
         <li>{props.category}</li>
       </ul>
       <Link to={`/products/${props._id}/edit`} onClick={storeExistingData}>Edit</Link>
       <Link to={`/products/${props._id}/delete`}>
          <button onClick={onDeleteHandler(props._id)}>
            Delete
          </button>
       </Link> 
    </div>  
   );
};

export default Product;