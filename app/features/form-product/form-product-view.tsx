import {useEffect, useState} from 'react';
import {Product} from '../../models/models';
import {Text, Input} from '@rneui/themed';
import {View} from 'react-native';
import {ImagesProductPreview} from '../../components/images-product-preview/images-product-preview';
import {FormProductControls} from '../../components/form-product-controls/form-product-controls';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const FormProductView = ({
  product,
  onCreateProduct,
}: {
  product: Product | null;
  onCreateProduct: (product: Product) => void;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [formProduct, setFormProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const onImages = (images: string[]) => {
    setImages(images);
  };

  const updateFormProduct = (key: keyof Product, value: string | string[]) => {
    setFormProduct(previousValue => {
      return {...previousValue, [key]: value};
    });
  };

  const handleNameChanges = (name: string) => updateFormProduct('name', name);
  const handleDescriptionChanges = (description: string) =>
    updateFormProduct('description', description);
  const handlePriceChanges = (price: string) =>
    updateFormProduct('price', price);

  useEffect(() => {
    if (product) {
      setFormProduct(product);
      console.log('Form product value setted !');
    }
  }, [product]);

  return (
    <View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
        <MaterialIcons name="add-circle" color="dodgerblue" size={16} />
        <Text style={{margin: 10, fontWeight: 'bold'}}>Add Product</Text>
      </View>
      <View>
        <Input
          value={formProduct.name}
          onChangeText={name => handleNameChanges(name)}
          label="Name"
        />
        <Input
          value={formProduct.description}
          onChangeText={description => handleDescriptionChanges(description)}
          label="Description"
          numberOfLines={3}
          multiline
          maxLength={500}
          style={{maxHeight: 85}}
        />
        <Input
          value={formProduct.price}
          onChangeText={price => handlePriceChanges(price)}
          label="Price"
        />
      </View>
      <ImagesProductPreview onImages={onImages} />
      <FormProductControls
        onCreateProduct={onCreateProduct}
        formProduct={formProduct}
        images={images}
      />
    </View>
  );
};
