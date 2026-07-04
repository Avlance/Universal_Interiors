'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/button/js/Button';
import ImageUploader from './ImageUploader';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: var(--universal-font);
  font-size: 14px;
  color: #111;
  outline: none;
  margin-bottom: 16px;
  
  &:focus {
    border-color: #D50F25;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  flex-wrap: wrap;
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  flex: 1;
`;

const Label = styled.label`
  font-family: var(--universal-font-medium);
  font-size: 14px;
  color: #444;
`;

const Select = styled.select`
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: var(--universal-font);
  font-size: 14px;
  color: #111;
  outline: none;
  
  &:focus {
    border-color: #D50F25;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const ImageCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  position: relative;
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const CardInfo = styled.div`
  padding: 16px;
`;

const ImageName = styled.div`
  font-family: var(--universal-font-medium);
  font-size: 15px;
  color: #111;
  margin-bottom: 4px;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 12px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
`;

const DeleteButton = styled.button`
  background: #D50F25;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  
  &:hover {
    background: #b00c1e;
  }
`;

export default function GalleryManager() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Category Form State
  const [newCatType, setNewCatType] = useState('main'); // 'main' or 'sub'
  const [newCatName, setNewCatName] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [newCatImage, setNewCatImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image Form State
  const [newImageName, setNewImageName] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      fetchItems(selectedCategory, selectedSubcategory);
    } else {
      setItems([]);
    }
  }, [selectedCategory, selectedSubcategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/gallery/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchItems = async (cat, subcat) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery/items?category=${cat}&subCategory=${subcat}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.data?.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentCatData = categories.find(c => c.category === selectedCategory);
  const subcategories = currentCatData?.categoryItems || [];

  const handleAddCategory = async () => {
    if (!newCatName) return alert('Name is required');
    if (newCatType === 'sub' && (!newCatParent || !newCatImage)) return alert('Parent category and image required for subcategory');
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/gallery/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: newCatType === 'main' ? 'addCategory' : 'addSubCategory',
          name: newCatName,
          categoryId: newCatType === 'sub' ? newCatParent : null,
          previewImage: newCatType === 'sub' ? newCatImage : null
        })
      });
      
      if (res.ok) {
        alert('Category added successfully!');
        setIsCategoryModalOpen(false);
        fetchCategories(); // Refresh categories
        // Reset form
        setNewCatName(''); setNewCatParent(''); setNewCatImage('');
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      alert('Failed to add category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImageName || !newImageUrl) return alert('Name and Image are required');
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/gallery/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newImageName,
          category: selectedCategory,
          subCategory: selectedSubcategory,
          previewImage: newImageUrl
        })
      });
      
      if (res.ok) {
        alert('Image added successfully!');
        setIsImageModalOpen(false);
        fetchItems(selectedCategory, selectedSubcategory); // Refresh items
        fetchCategories(); // Refresh categories (to update counts)
        // Reset form
        setNewImageName(''); setNewImageUrl('');
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      alert('Failed to add image');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`/api/admin/gallery/items?id=${id}&category=${selectedCategory}&subCategory=${selectedSubcategory}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        fetchItems(selectedCategory, selectedSubcategory);
        fetchCategories();
      } else {
        alert('Failed to delete image');
      }
    } catch (e) {
      alert('Error deleting image');
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'var(--universal-font-bold)', color: '#111', fontSize: 20 }}>Manage Design Gallery</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button secondary onClick={() => setIsCategoryModalOpen(true)}>+ New Category</Button>
          <Button primary onClick={() => setIsImageModalOpen(true)} disabled={!selectedCategory || !selectedSubcategory}>
            + Upload Image
          </Button>
        </div>
      </div>

      <ControlsRow>
        <SelectGroup>
          <Label>Category (e.g. Room)</Label>
          <Select value={selectedCategory} onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory('');
          }}>
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat.category} value={cat.category}>{cat.name}</option>
            ))}
          </Select>
        </SelectGroup>

        <SelectGroup>
          <Label>Subcategory (e.g. Kitchen)</Label>
          <Select 
            value={selectedSubcategory} 
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="">-- Select Subcategory --</option>
            {subcategories.map(sub => (
              <option key={sub.subCategory} value={sub.subCategory}>{sub.name}</option>
            ))}
          </Select>
        </SelectGroup>
      </ControlsRow>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#666' }}>Loading images...</div>
      ) : items.length > 0 ? (
        <Grid>
          {items.map(item => (
            <ImageCard key={item.id}>
              <CardOverlay className="overlay">
                <DeleteButton onClick={() => handleDeleteImage(item.id)} title="Delete Image">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </DeleteButton>
              </CardOverlay>
              <ImagePreview src={item.previewImage} alt={item.name} />
              <CardInfo>
                <ImageName>{item.name}</ImageName>
              </CardInfo>
            </ImageCard>
          ))}
        </Grid>
      ) : (
        selectedCategory && selectedSubcategory && (
          <div style={{ padding: 40, textAlign: 'center', color: '#666', background: 'white', borderRadius: 12 }}>
            No images found in this subcategory. Click "+ Upload Image" to add some!
          </div>
        )
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <ModalOverlay onClick={() => setIsCategoryModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--universal-font-bold)', marginBottom: 24, fontSize: 20 }}>Add Category</h2>
            
            <Label>Type</Label>
            <Select 
              value={newCatType} 
              onChange={e => setNewCatType(e.target.value)} 
              style={{ width: '100%', marginBottom: 16 }}
            >
              <option value="main">Main Category (e.g., Room)</option>
              <option value="sub">Subcategory (e.g., Kitchen)</option>
            </Select>

            {newCatType === 'sub' && (
              <>
                <Label>Parent Category</Label>
                <Select 
                  value={newCatParent} 
                  onChange={e => setNewCatParent(e.target.value)} 
                  style={{ width: '100%', marginBottom: 16 }}
                >
                  <option value="">-- Select Parent Category --</option>
                  {categories.map(cat => (
                    <option key={cat.category} value={cat.category}>{cat.name}</option>
                  ))}
                </Select>
              </>
            )}

            <Label>Name</Label>
            <Input 
              placeholder={newCatType === 'main' ? "e.g. Room" : "e.g. Kitchen"} 
              value={newCatName}
              onChange={e => setNewCatName(e.target.value)}
            />

            {newCatType === 'sub' && (
              <div style={{ marginBottom: 24 }}>
                <Label>Preview Thumbnail</Label>
                <div style={{ marginTop: 8 }}>
                  <ImageUploader 
                    onUploadSuccess={url => setNewCatImage(url)} 
                    onUploadError={err => alert(err)} 
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <Button secondary onClick={() => setIsCategoryModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button primary onClick={handleAddCategory} disabled={isSubmitting || !newCatName || (newCatType === 'sub' && !newCatParent)}>
                {isSubmitting ? 'Saving...' : 'Save Category'}
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Add Image Modal */}
      {isImageModalOpen && (
        <ModalOverlay onClick={() => setIsImageModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--universal-font-bold)', marginBottom: 8, fontSize: 20 }}>Upload Image</h2>
            <p style={{ fontFamily: 'var(--universal-font)', color: '#666', fontSize: '14px', marginBottom: 24 }}>
              Uploading to: <strong>{categories.find(c => c.category === selectedCategory)?.name} &gt; {subcategories.find(s => s.subCategory === selectedSubcategory)?.name}</strong>
            </p>

            <Label>Image Name / Title</Label>
            <Input 
              placeholder="e.g. Modern White Kitchen" 
              value={newImageName}
              onChange={e => setNewImageName(e.target.value)}
            />

            <div style={{ marginBottom: 24 }}>
              <Label>High Quality Image</Label>
              <div style={{ marginTop: 8 }}>
                <ImageUploader 
                  onUploadSuccess={url => setNewImageUrl(url)} 
                  onUploadError={err => alert(err)} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <Button secondary onClick={() => setIsImageModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button primary onClick={handleAddImage} disabled={isSubmitting || !newImageName || !newImageUrl}>
                {isSubmitting ? 'Uploading...' : 'Save Image'}
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
