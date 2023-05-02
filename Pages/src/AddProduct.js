import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>{

    const navigate = useNavigate();

    const onSubmitHandler = async (event)=>{
      event.preventDefault();
      console.log('Inside Event-Submit Handler');  
      console.log(event.target.name.value);
      console.log(event.target.price.value);
      console.log(event.target.category.value);
      await axios.post('http://localhost:3000/products/add',{
          name : event.target.name.value,
          price : event.target.price.value,
          category : event.target.category.value
      },
      {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
           .then(res=>{
             console.log('add product POST request was successful !!');
             console.log(res);
           })
           .catch(err => console.log('Error in Adding Product !! '))
           .finally(()=>console.log('Executing finally block !!'));
        navigate('/products');
    };

    return(
       <div>
        <form onSubmit={onSubmitHandler}>
            <label htmlFor='name'>Product Name</label>
            <input type="text" id="name"/>
            <label htmlFor='price'>Price</label>
            <input type="number" id="price" min="0" max="10" step=".01"/>
            <label htmlFor='category'>Category</label> 
            <select id="category">
                <option value='fruit'>Fruits</option>
                <option value='vegetable'>Vegetable</option>
            </select> 
            <button type="submit">Submit</button>
        </form>
       </div>
    );
};

export default AddProduct;