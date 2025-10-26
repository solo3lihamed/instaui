import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useTheme } from '../../theme/useTheme';

const { width } = Dimensions.get('window');

interface ImageGalleryProps {
  images: string[];
  height?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  height = 400,
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={[styles.image, { height }]}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

      {images.length > 1 && (
        <View
          style={[
            styles.indicatorContainer,
            { backgroundColor: 'rgba(0,0,0,0.3)' },
          ]}
        >
          <Text style={styles.indicatorText}>
            {currentIndex + 1} / {images.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#000',
  },
  image: {
    width,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  indicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});