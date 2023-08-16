import React, {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import styles from'./Counter.module.css'
import { updateQuantity } from '../features/User/userSlice';
import { useDispatch } from 'react-redux';

export default function Counter(props) {
  const [count, setCount] = useState(!props.product ? 1 : props.product.quantity);  
  const dispatch = useDispatch();

  const handleIncrement = ()=>{
    setCount(count + 1)
    if(props.product)
      dispatch(updateQuantity({productId: props.product.productId, count: count + 1}))
  }

  const handleDecrement = ()=>{
    if(count > 1){
        setCount(count - 1)
        if(props.product)
          dispatch(updateQuantity({productId: props.product.productId, count: count - 1}))
    }
  }

  return (
      <>
        <div>
            <IconButton onClick={handleDecrement} color={'inherit'}>
                <RemoveCircleOutlinedIcon className={styles.counter}/>
            </IconButton>
            <label className={styles.amount}>{count}</label>
            <IconButton onClick={handleIncrement} color={'inherit'}>
                <AddCircleOutlinedIcon className={styles.counter}/>
            </IconButton>
        </div>
    </>
  )
}
