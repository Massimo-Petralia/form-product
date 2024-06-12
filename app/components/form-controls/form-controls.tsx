import {View, Pressable} from 'react-native';
import {Text} from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {style} from '../../styles/style';
import {Product} from '../../models/models';

export const FormControls = ({
  onCreateProduct,
  formProduct,
  images,
}: {
  onCreateProduct: (product: Product) => void;
  formProduct: Product;
  images: string[];
}) => {
  return (
    <View>
      <View style={{left: '60%', bottom: '100%'}}>
        <Pressable
          android_ripple={{color: 'lightgrey', borderless: true, radius: 40}}
          style={style.circlebutton}
          onPress={() => onCreateProduct({...formProduct, images: images})}>
          <View style={{alignItems: 'center', paddingTop: '20%'}}>
            <FontAwesome name="send" color="ghostwhite" size={16} />
            <Text style={style.circlebuttonText}>Submit </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
