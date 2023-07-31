import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar os produtos:', error);
      });
  }, []);

  const addProductToCart = (product) => {
    if (cart.some(item => item.id === product.id)) {
      toast.error('Este produto já está no carrinho!', {
        position: 'top-center',
      });
    } else {
      setCart([...cart, product]);
      toast.success('Produto adicionado ao carrinho!', {
        position: 'top-center',
      });
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalWeight = () => {
    return cart.reduce((total, item) => total + item.weight, 0);
  };
  
  return (
    <div>
      <h2>Tabela de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.weight}</td>
              <td>
                <button onClick={() => addProductToCart(product)}>
                  Adicionar ao Carrinho
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Carrinho</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - R${item.price}; {item.weight}Kg
            </li>
          ))}
        </ul>
        <p>Total Price: R${calculateTotalPrice()}</p>
        <p>Total Weight: {calculateTotalWeight()}Kg</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductTable;
