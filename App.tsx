import React from 'react';
import {SafeAreaView, View} from 'react-native';
import { FormProductPage } from './app/features/form-product/form-product-page';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: 'ghostwhite', flex: 1}}>
      <View>
       <FormProductPage/>
      </View>
    </SafeAreaView>
  );
}

export default App;
