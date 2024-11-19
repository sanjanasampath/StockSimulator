import { useState, useContext } from 'react';
import { TextField } from '@material-ui/core'
import Button from '../ui/Button'
import UserContext from "../../context/UserContext";


function BuySellCard({ stock = { quantity: 4, name: "BTC", currentPrice: 20000 } }) {
  const { userData } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    if (!isNaN(e.target.value) && Number(e.target.value) <= stock.quantity) {
      setQuantity(e.target.value);
    }
  };

  const sellStock = async (e) => {
    e.preventDefault();

    const headers = {
      "x-auth-token": userData.token,
    };

    const data = {
      stockId: stock.id,
      quantity: Number(quantity),
      userId: userData.user.id,
      price: Number(stock.currentPrice),
    };

    const url = config.base_url + `/api/stock`;
    const response = await Axios.patch(url, data, {
      headers,
    });

    if (response.data.status === "success") {
      window.location.reload();
    }
  };

  return (
    <div className='flex flex-col gap-4'>

      <div className='flex w-full'>
        <Button styles='bg-primary rounded-l-xl w-full' >Long</Button>
        <Button styles='bg-gray-900 rounded-r-xl w-full'>Short</Button>
      </div>

      <form className={"flex flex-col gap-2"} onSubmit={(e) => e.preventDefault()}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          placeholder="Name"
          name="Name"
          autoComplete="Name"
          value={stock.name}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="price"
          placeholder="Price"
          name="price"
          disabled
          autoComplete="price"
          value={stock.currentPrice}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="quantity"
          placeholder="Quantity"
          name="quantity"
          autoComplete="quantity"
          value={quantity}
          onChange={handleQuantityChange}
        />

        <Button
          type="submit"
          styles="bg-primary w-full rounded-2xl"
          onClick={sellStock}
        >
          Buy
        </Button>
      </form>
    </div>
  )
}

export default BuySellCard