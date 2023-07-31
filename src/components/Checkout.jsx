import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutButton = ({ cart }) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [enteredCpf, setEnteredCpf] = useState('');

  const handleCheckoutClick = () => {
    setInputVisible(true);
  };

  const handleCpfChange = (e) => {
    setEnteredCpf(e.target.value);
  };

  const handleConfirmClick = () => {
    const isValidCpf = validateCpf(enteredCpf);

    if (isValidCpf) {
      processPurchase();
    } else {
      toast.error('CPF inválido. Tente novamente.', {
        position: 'top-center',
      });
    }
  };

  const validateCpf = (cpf) => {
    return cpf.length === 11;
  };

  const processPurchase = () => {
    const productsList = cart.map((item) => item.name).join(', ');
    const successMessage = `Parabéns! Você comprou: ${productsList}`;

    toast.success(successMessage, {
      position: 'top-center',
    });
  };

  return (
    <div>
      <button onClick={handleCheckoutClick}>Finalizar Compra</button>
      {isInputVisible && (
        <>
          <input
            type="text"
            value={enteredCpf}
            onChange={handleCpfChange}
            placeholder="Digite seu CPF"
          />
          <button onClick={handleConfirmClick}>Confirmar CPF</button>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

CheckoutButton.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CheckoutButton;
