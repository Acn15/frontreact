
import PropTypes from 'prop-types';

const Checkout = ({ cart }) => {
  const calculateTotal = () => {
    let totalPrice = 0;
    let totalWeight = 0;

    cart.forEach(item => {
      totalPrice += item.price;
      totalWeight += item.weight;
    });

    return { totalPrice, totalWeight };
  };

  const { totalPrice, totalWeight } = calculateTotal();

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <p>Total de Preço: R$ {totalPrice.toFixed(2)}</p>
        <p>Total de Peso: {totalWeight.toFixed(2)} kg</p>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
}
export default Checkout;
