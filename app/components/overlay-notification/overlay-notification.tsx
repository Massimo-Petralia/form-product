import {Overlay} from '@rneui/themed';
import {Text} from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const OverlayNotification = ({
  isVisible,
  notification,
  toggleOverlay,
}: {
  isVisible: boolean;
  notification: string;
  toggleOverlay: () => void;
}) => {
  
  let type: string = '';

  const checkNotificationType = (notification: String) => {
    if (notification === 'Five images allowed') {
      type = 'invalid-operation';
    }
    if (notification === 'Product added !') {
      type = 'info';
    }
    return type;
  };
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <FontAwesome
        name={
          checkNotificationType(notification) === 'invalid-operation'
            ? 'warning'
            : 'info-circle'
        }
        color={
          checkNotificationType(notification) === 'invalid-operation'
            ? 'goldenrod'
            : 'dodgerblue'
        }
        size={15}
      />
      <Text
        style={{
          color:
            checkNotificationType(notification) === 'invalid-operation'
              ? 'goldenrod'
              : 'dodgerblue',
          fontSize: 15,
        }}>
        {' '}
        {notification}
      </Text>
    </Overlay>
  );
};
