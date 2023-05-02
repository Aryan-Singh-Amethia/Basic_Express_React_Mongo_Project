import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProduct =() =>{
    //console.log('props from EditProduct :: ',props);
    const navigate = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3000/products/${_id}/edit`,
                 {
                    name : event.target.name.value,
                    price : event.target.price.value,
                    category : event.target.category.value
                 },
                 {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                 })
        .then((res)=>{
            console.log('Edit request successfull !!',res);
            navigate('/products');
        })
        .catch((err)=>console.log(err));

    }
    const _id=localStorage.getItem('_id');
    const name=localStorage.getItem('name'); 
    const price=localStorage.getItem('price');
    const category=localStorage.getItem('category');

    return(
      <div>
        <h2>Edit Product</h2>
        <form onSubmit={onSubmitHandler}>
            <label htmlFor='name'>Product Name</label>
            <input type="text" id="name" defaultValue={name}/>
            <label htmlFor='price'>Price</label>
            <input type="number" id="price" min="0" max="10" step=".01" defaultValue={price}/>
            <label htmlFor='category'>Category</label> 
            <select id="category" defaultValue={category}>
                <option value='fruit'>Fruits</option>
                <option value='vegetable'>Vegetable</option>
            </select> 
            <button type="submit">Submit</button>
        </form>
      </div>
    );

};

export default EditProduct;