import React, {useEffect} from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Counter from './Counter';
import './Products.module.css'
import styles from './Products.module.css'
import AddShoppingCartButton from './AddShoppingCartButton';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByIdAsync, productSelector } from '../features/Product/productSlice';

export default function Products() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, status } = useSelector(productSelector);

  useEffect (() => {
      document.title = 'Linhas da Maria - Products'
      if(product === null || product.id !== parseInt(id)){
        dispatch(getProductsByIdAsync(id))
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const theme = createTheme({
      typography: {
        descriptionTitle:{
          fontSize: '1.2rem',
          fontWeight: 'bold'
        },
        description: {
          fontStyle: 'italic',
        },
        totalTitle: {
          fontSize:'2rem',
          fontWeight: 'bold'
        },
        imageTitle:{
          fontWeight: 'bold'
        },
        totalValue:{
          fontSize: '1.3rem',
        },
      },
    });

  return (
      <>
        {product && status === 'success' && 
        <ThemeProvider theme={theme}>
            <Grid container spacing={1} margin={5} justifyContent='center' alignItems='center'>
                <Grid item xs>
                    <div>
                        <img src={product.img} alt='' width={300} height={350} className={styles.item}/>
                    </div>
                    <div>
                        <Typography variant="imageTitle" className={styles.productTitle}>{product.title}</Typography>
                    </div>
                    <Typography variant="description" className={styles.productDescription}>Stylized embroidery</Typography>
                </Grid>
                <Grid item xs>
                    <br/>
                    <div>
                        <Counter/>
                        <AddShoppingCartButton product={product}/>
                    </div>
                    <div>
                        <Typography variant="description">{`(${product.price}€ = 1un)`}</Typography>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
        }
      </>
  )
}
