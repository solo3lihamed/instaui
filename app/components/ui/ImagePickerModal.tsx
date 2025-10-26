import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Button } from './Button';

interface ImageItem {
  id: string;
  uri: string;
}

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage?: (imageUri: string) => void;
  onSelectMultiple?: (imageUris: string[]) => void;
}

// Mock image library for demo
const mockImages: ImageItem[] = [
  { id: '1', uri: 'https://placehold.co/150x150/FF6B6B/FFFFFF?text=1' },
  { id: '2', uri: 'https://placehold.co/150x150/4ECDC4/FFFFFF?text=2' },
  { id: '3', uri: 'https://placehold.co/150x150/FFD166/000000?text=3' },
  { id: '4', uri: 'https://placehold.co/150x150/6A0572/FFFFFF?text=4' },
  { id: '5', uri: 'https://placehold.co/150x150/1A535C/FFFFFF?text=5' },
  { id: '6', uri: 'https://placehold.co/150x150/2EC4B6/FFFFFF?text=6' },
  { id: '7', uri: 'https://placehold.co/150x150/FF006E/FFFFFF?text=7' },
  { id: '8', uri: 'https://placehold.co/150x150/8338EC/FFFFFF?text=8' },
];

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onSelectImage,
  onSelectMultiple,
}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [multiSelect, setMultiSelect] = useState(false);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      if (!multiSelect) {
        newSelected.clear();
      }
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  const handleConfirm = () => {
    const selectedUris = Array.from(selected).map((id) => {
      const image = mockImages.find((img) => img.id === id);
      return image?.uri || '';
    });

    if (multiSelect && onSelectMultiple) {
      onSelectMultiple(selectedUris.filter(Boolean));
    } else if (!multiSelect && onSelectImage && selectedUris[0]) {
      onSelectImage(selectedUris[0]);
    }

    setSelected(new Set());
    setMultiSelect(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: theme.background },
        ]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.surface, borderBottomColor: theme.border },
          ]}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {multiSelect ? 'Select Multiple' : 'Select Image'}
          </Text>
          <TouchableOpacity
            onPress={() => setMultiSelect(!multiSelect)}
          >
            <Text
              style={[
                styles.modeButton,
                { color: multiSelect ? '#0095f6' : theme.textSecondary },
              ]}
            >
              {multiSelect ? '✓ Multi' : 'Multi'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Image Grid */}
        <FlatList
          data={mockImages}
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => toggleSelect(item.id)}
            >
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
              />
              {selected.has(item.id) && (
                <View
                  style={[
                    styles.selectedOverlay,
                    { backgroundColor: 'rgba(0, 149, 246, 0.7)' },
                  ]}
                >
                  <Ionicons name="checkmark-circle" size={32} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          )}
        />

        {/* Footer */}
        <View
          style={[
            styles.footer,
            { backgroundColor: theme.surface, borderTopColor: theme.border },
          ]}
        >
          <Button
            title="Cancel"
            variant="secondary"
            onPress={onClose}
            size="small"
          />
          <Button
            title={`Confirm (${selected.size})`}
            variant="primary"
            onPress={handleConfirm}
            size="small"
            disabled={selected.size === 0}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modeButton: {
    fontSize: 13,
    fontWeight: '600',
  },
  gridContent: {
    paddingHorizontal: 2,
    paddingVertical: 8,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    gap: 12,
  },
});