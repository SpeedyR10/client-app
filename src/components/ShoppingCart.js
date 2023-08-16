import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ShoppingCart.module.css'
import Counter from './Counter';
import { userSelector, removeFromCart } from '../features/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link }  from 'react-router-dom';

export default function ShoppingCart() {
  
  const dispatch = useDispatch();
  const { shoppingCart } = useSelector(userSelector);

  const TAX_RATE = 0.07;

  useEffect(() => {
    document.title = 'Linhas da Maria - Shopping Cart'
  }, [])

  function currencyFormat(num) {
    return `${num.toFixed(2)}€`;
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }

  function removeItem(id){
    dispatch(removeFromCart(id))
  }

  const invoiceSubtotal = subtotal(shoppingCart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;


  return (
    <TableContainer className={styles.container}>
      {shoppingCart.length === 0 ? 
        <div className={styles.empty}>
          <div className={styles.emptyLabel}>O seu cesto de compras está vazio.</div>
          <div><Link to="/" className={styles.addProductsLink}>Adicionar artigos</Link></div>
        </div> : 
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{fontWeight: 800 }}>Item</TableCell>
              <TableCell align="center" style={{fontWeight: 800 }}>Quantidade</TableCell>
              <TableCell align="center" style={{fontWeight: 800 }}>Preço por unidade</TableCell>
              <TableCell align="right" style={{fontWeight: 800 }}>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoppingCart.map((item) => (
              <TableRow key={item.productId}>
                <TableCell align="center">
                  <div className={styles.itemContainer}>
                    <img className={styles.itemImage} src={item.img} alt=''/>
                    <label className={styles.itemName}>{item.title}</label>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className={styles.itemQuantity}>
                    <Counter product={item}/>
                    <IconButton onClick={() => removeItem(item.productid)}>
                      <DeleteIcon/>
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align="center" className={styles.pricePerUnit}>{currencyFormat(item.pricePerUnit)}</TableCell>
                <TableCell align="right" className={styles.price}>{currencyFormat(item.price)}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2} className={styles.subTotalLabel}>Subtotal</TableCell>
              <TableCell align="right" className={styles.subTotal}>{currencyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={{fontWeight: 800 }} className={styles.totalLabel}>Total</TableCell>
              <TableCell align="right" style={{fontWeight: 800 }} className={styles.total}>{currencyFormat(invoiceTotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell rowSpan={3} />
              {/* <TableCell colSpan={2} align='right'>
                <IconButton 
                  className={styles.btnSeguinte} 
                  variant="contained" color={'inherit'} 
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#602e39',
                    border: '1px solid black'
                  }}
                  >                
                  <label className={styles.labelSeguinte}>Seguinte&nbsp;</label><NavigateNextRoundedIcon/>
                </IconButton>
              </TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      } 
    </TableContainer>
  )  
}
