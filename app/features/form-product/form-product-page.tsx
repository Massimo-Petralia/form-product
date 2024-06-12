import {useState} from 'react';
import {Product} from '../../models/models';
import {View} from 'react-native';
import {FormProductView} from './form-product-view';
import {ProductServices} from '../../services/product.services';
import { OverlayNotification } from '../../components/overlay-notification/overlay-notification';

export const FormProductPage = () => {
  const productServices = new ProductServices();
  const [product, setProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');
  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };
  const onCreateProduct = (product: Product) => {
    productServices.createProduct(product).then(async resposnse => {
      const data = await resposnse.json();
      //setProduct(data); Set product only if you implement update features !
      setNotification('Product added !')
      toggleOverlay()
    }).catch(error => console.error('post request failed: ', error));
  };

  return (
    <View>
      <FormProductView product={product} onCreateProduct={onCreateProduct} />
      <OverlayNotification
        isVisible={isVisible}
        notification={notification}
        toggleOverlay={toggleOverlay}
      />
    </View>
  );
};
