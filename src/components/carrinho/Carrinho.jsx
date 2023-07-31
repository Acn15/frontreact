import PropTypes from 'prop-types';

const Cart = ({ cart, onRemoveFromCart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalWeight = () => {
    return cart.reduce((total, item) => total + item.weight, 0);
  };

  const calculateShipping = () => {
    return (calculateTotalWeight() * 0.1).toFixed(2);
  };

  return (
    <div>
      <h2>Carrinho</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - R${item.price}; {item.weight}Kg
            <button onClick={() => onRemoveFromCart(item.id)}>
              Remover do Carrinho
            </button>
          </li>
        ))}
      </ul>
      <p>Total Price: R${calculateTotalPrice()}</p>
      <p>Total Weight: {calculateTotalWeight()}Kg</p>
      <p>Frete: R${calculateShipping()}</p>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default Cart;
