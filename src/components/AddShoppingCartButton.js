import React from 'react'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import styles from './AddShoppingCartButton.module.css'
import { addToCart } from '../features/User/userSlice'
import { useDispatch } from 'react-redux'

export default function AddShoppingCartButton(props) {

    const dispatch = useDispatch();

    const AddToCart = () =>{
        dispatch(
            addToCart(
                {
                    productId: props.product.id, 
                    title: props.product.title,
                    img: props.product.img, 
                    quantity: 1, 
                    pricePerUnit: props.product.price, 
                    price: props.product.price
                })
        )
    }

    return (
        <div>
            <IconButton onClick={AddToCart} className={styles.btnAdicionar} variant="contained" color={'inherit'} style={{borderRadius: '20px', backgroundColor: '#602e39'}}>                
                <label className={styles.clickable}>Adicionar&nbsp;</label><AddShoppingCartIcon className={styles.cartIcon}/>
            </IconButton>
        </div>
    )
}
