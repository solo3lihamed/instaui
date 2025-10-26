import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from './theme/useTheme';

const AddScreen = () => {
  const theme = useTheme();
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [activeTab, setActiveTab] = useState('photo'); // photo or gallery
  const [imagePicker, setImagePicker] = useState(false);

  // Mock images for gallery - these match ImagePickerModal mock data
  const galleryImages = [
    'https://placehold.co/100x100/FF6B6B/FFFFFF?text=1',
    'https://placehold.co/100x100/4ECDC4/FFFFFF?text=2',
    'https://placehold.co/100x100/FFD166/000000?text=3',
    'https://placehold.co/100x100/6A0572/FFFFFF?text=4',
    'https://placehold.co/100x100/1A535C/FFFFFF?text=5',
    'https://placehold.co/100x100/FF9F1C/FFFFFF?text=6',
    'https://placehold.co/100x100/2EC4B6/FFFFFF?text=7',
    'https://placehold.co/100x100/E71D36/FFFFFF?text=8',
    'https://placehold.co/100x100/011627/FFFFFF?text=9',
  ];

  const handleSelectImage = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const handleNext = () => {
    // In a real app, this would proceed to filters/sharing options
    console.log('Next pressed with caption:', caption);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        <TouchableOpacity>
          <Text style={[styles.headerCancel, { color: theme.text }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Post</Text>
        <TouchableOpacity 
          onPress={handleNext} 
          disabled={!selectedImage}
          style={[styles.nextButton, !selectedImage && styles.nextButtonDisabled, { backgroundColor: !selectedImage ? theme.textSecondary : theme.text }]}
        >
          <Text style={[styles.nextButtonText, !selectedImage && styles.nextButtonTextDisabled, { color: !selectedImage ? theme.background : theme.background }]}>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Image Selection */}
        <View style={styles.imageSelectionContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={[styles.imagePlaceholder, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <MaterialCommunityIcons name="image-plus" size={60} color={theme.textSecondary} />
              <Text style={[styles.placeholderText, { color: theme.textSecondary }]}>Select a photo</Text>
            </View>
          )}

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'photo' && { ...styles.activeTab, borderBottomColor: theme.text }]}
              onPress={() => setActiveTab('photo')}
            >
              <Text style={[styles.tabText, activeTab === 'photo' && { ...styles.activeTabText, color: theme.text }]}>PHOTO</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'gallery' && { ...styles.activeTab, borderBottomColor: theme.text }]}
              onPress={() => setActiveTab('gallery')}
            >
              <Text style={[styles.tabText, activeTab === 'gallery' && { ...styles.activeTabText, color: theme.text }]}>GALLERY</Text>
            </TouchableOpacity>
          </View>

          {/* Gallery View */}
          {activeTab === 'gallery' ? (
            <View style={styles.galleryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.galleryRow}>
                  {galleryImages.map((image, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[styles.galleryItem, selectedImage === image && styles.selectedGalleryItem]}
                      onPress={() => handleSelectImage(image)}
                    >
                      <Image source={{ uri: image }} style={styles.galleryItemImage} />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : (
            <View style={[styles.cameraPlaceholder, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <Feather name="camera" size={40} color={theme.textSecondary} />
              <Text style={[styles.cameraText, { color: theme.textSecondary }]}>Take a photo</Text>
            </View>
          )}
        </View>

        {/* Caption Input */}
        <View style={styles.captionContainer}>
          <TextInput
            style={[styles.captionInput, { color: theme.text }]}
            placeholder="Write a caption..."
            placeholderTextColor={theme.textSecondary}
            value={caption}
            onChangeText={setCaption}
            multiline
          />
          <View style={[styles.suggestionsContainer, { borderTopColor: theme.border }]}>
            <TouchableOpacity style={styles.suggestionItem}>
              <Feather name="hash" size={16} color={theme.text} />
              <Text style={[styles.suggestionText, { color: theme.text }]}>Tag People</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionItem}>
              <Feather name="map-pin" size={16} color={theme.text} />
              <Text style={[styles.suggestionText, { color: theme.text }]}>Add Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.suggestionItem}>
              <Feather name="feather" size={16} color={theme.text} />
              <Text style={[styles.suggestionText, { color: theme.text }]}>Advanced Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
  },
  nextButtonDisabled: {
    backgroundColor: '#b0b0b0',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButtonTextDisabled: {
    color: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
  imageSelectionContainer: {
    alignItems: 'center',
    padding: 16,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8e8e8e',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#8e8e8e',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  galleryContainer: {
    width: '100%',
    marginTop: 16,
  },
  galleryRow: {
    flexDirection: 'row',
  },
  galleryItem: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedGalleryItem: {
    borderWidth: 2,
    borderColor: '#000',
  },
  galleryItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cameraPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cameraText: {
    marginTop: 8,
    fontSize: 16,
    color: '#8e8e8e',
  },
  captionContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  captionInput: {
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
  },
  suggestionsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#efefef',
    paddingTop: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
});

export default AddScreen;