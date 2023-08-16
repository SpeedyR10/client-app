import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Footer from './Footer';
import { getProductsAsync, productSelector } from '../features/Product/productSlice';

export default function Home() {

  const width = 150;
  const height = 190;

  const dispatch = useDispatch();
  const { products } = useSelector(productSelector);

  useEffect(() => {
      document.title = 'Linhas da Maria - Home';
      if(products.length === 0){
        dispatch(getProductsAsync())
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <>
        <div className={styles.grid}>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={6} gap={30} /*rowHeight={164}*/>
            {products.map((product) => (
              <ImageListItem key={`img_${product.id}`}>
              <Link to={`products/${product.id}`}>
              <img
                  src={`${product.img}?w=${width+20}&h=${height+20}&fit=crop&auto=format`}
                  srcSet={`${product.img}?w=${width+20}&h=${height+20}&fit=crop&auto=format&dpr=2 2x`}
                  alt={product.title}
                  loading="lazy"
                  width={width}
                  height={height}
                  className={styles.item}
              />
              </Link>
              <ImageListItemBar
                  sx={{color: 'white'}}
                  title={product.title}
                  subtitle={<span>{`${product.price}€`}</span>}
                  position="below"
              />
              </ImageListItem>
            ))}
            </ImageList>
        </div>
        <Footer/>
    </>
  )
}
