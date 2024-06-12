import {View, Pressable, Text} from 'react-native';
import {useState, useCallback} from 'react';
import PagerView from 'react-native-pager-view';
import {Image, Card} from '@rneui/themed';
import {DotIndicator} from '../dot-indicator/dot-indicator';
import {pick, types} from 'react-native-document-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFS from 'react-native-fs';
import {style} from '../../styles/style';
import {OverlayNotification} from '../overlay-notification/overlay-notification';

export const ImagesPreview = ({
  onImages,
}: {
  onImages: (images: string[]) => void;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const checkImagesLength = (images: string[]) => {
    if (images.length <= 5) {
      setImages(images)
      onImages(images);
    } else {
      setIsVisible(!isVisible);
      setNotification('Five images allowed');
    }
  };

  const handleImagesSelection = useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });
      const images: string[] = [];
      for (let image of response) {
        const base64String = await RNFS.readFile(image.uri, 'base64');
        images.push(`data:image/${image.type};base64,${base64String}`);
      }

      checkImagesLength(images);
    } catch (error) {
      console.error('Error: ', error);
    }
  }, []);

  const [counter, setCounter] = useState<number>(0);
  return (
    <View>
      <PagerView
        useNext
        initialPage={0}
        pageMargin={10}
        onPageSelected={e => setCounter(e.nativeEvent.position)}>
        {images.map((image, index) => (
          <Card key={index} containerStyle={{borderRadius: 6}}>
            <Card.Title>Preview .{index + 1}</Card.Title>
            <Card.Divider />

            <Image
              style={{
                height: 140,
              }}
              source={{uri: image}}
              resizeMode="contain"
            />
          </Card>
        ))}
      </PagerView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {images.map((item, index) => {
          return (
            <View key={index}>
              <DotIndicator index={index} counter={counter} />
            </View>
          );
        })}
      </View>
      <Pressable
        android_ripple={{color: 'lightgrey', borderless: true, radius: 40}}
        style={[style.circlebutton, {left: '18.5%'}]}
        onPress={() => handleImagesSelection()}>
        <View style={{alignItems: 'center', paddingTop: '20%'}}>
          <FontAwesome5 name="images" color="ghostwhite" size={16} />
          <Text style={style.circlebuttonText}>Select </Text>
        </View>
      </Pressable>
      <OverlayNotification
        isVisible={isVisible}
        notification={notification}
        toggleOverlay={toggleOverlay}
      />
    </View>
  );
};
