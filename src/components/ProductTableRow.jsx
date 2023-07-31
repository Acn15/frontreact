
import PropTypes from 'prop-types';

const ProductTableRow = ({ product, onAddToCart }) => {
  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.weight}</td>
      <td>
        <button onClick={() => onAddToCart(product)}>
          Adicionar ao Carrinho
        </button>
      </td>
    </tr>
  );
};

ProductTableRow.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductTableRow;
