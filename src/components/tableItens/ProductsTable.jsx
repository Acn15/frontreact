import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api';
import ProductTableRow from '../ProductTableRow';
import Cart from '../carrinho/Carrinho';
import CheckoutButton from '../Checkout';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data);
        console.log("Dessa vez eu não irei decepcionar!")
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

  const removeProductFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.warn('Produto removido do carrinho!', {
      position: 'top-center',
    });
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
            <ProductTableRow
              key={product.id}
              product={product}
              onAddToCart={addProductToCart}
            />
          ))}
          
        </tbody>
      </table>

      <Cart cart={cart} onRemoveFromCart={removeProductFromCart} />

      <ToastContainer />
      <div>
      <CheckoutButton cart={cart} />
    </div>
    </div>
    
  );
};

export default ProductTable;
