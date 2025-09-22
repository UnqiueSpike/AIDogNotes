import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Plus, Package, Edit, Trash2, X } from 'lucide-react'

// CSS Styles
const styles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 100%);
  color: #e8f5e8; min-height: 100vh;
}
#root { min-height: 100vh; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { 
  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
  padding: 30px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  margin-bottom: 30px; border: 1px solid rgba(255, 255, 255, 0.2);
}
.header h1 { color: #2c3e50; font-size: 32px; margin-bottom: 12px; font-weight: 700; }
.header p { color: #7f8c8d; font-size: 16px; font-weight: 400; }
.btn { 
  padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer;
  font-size: 14px; font-weight: 500; transition: all 0.2s ease;
  display: inline-flex; align-items: center; gap: 8px;
}
.btn-primary { 
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white; box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
}
.btn-primary:hover { 
  background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
}
.btn-success { 
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white; box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
}
.btn-success:hover { 
  background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(44, 62, 80, 0.4);
}
.btn-danger { 
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}
.btn-danger:hover { 
  background: linear-gradient(135deg, #ff5252 0%, #e53935 100%);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}
.btn-secondary { 
  background: linear-gradient(135deg, #a8a8a8 0%, #8a8a8a 100%);
  color: white; box-shadow: 0 4px 15px rgba(168, 168, 168, 0.3);
}
.btn-secondary:hover { 
  background: linear-gradient(135deg, #9a9a9a 0%, #7a7a7a 100%);
  transform: translateY(-2px); box-shadow: 0 6px 20px rgba(168, 168, 168, 0.4);
}
.form-group { margin-bottom: 20px; }
.form-group label { 
  display: block; margin-bottom: 8px; font-weight: 500; color: #ffffff;
}
.form-group input, .form-group textarea, .form-group select { 
  width: 100%; padding: 14px 16px; border: 2px solid #e1e8ed; border-radius: 12px;
  font-size: 14px; transition: all 0.3s ease; background-color: #ffffff; color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { 
  outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}
.form-group textarea { resize: vertical; min-height: 100px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { 
  background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
  border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  overflow: hidden; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.2);
}
.card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
.card-header { 
  padding: 24px; border-bottom: 1px solid rgba(0,0,0,0.05);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}
.card-body { padding: 24px; }
.grid { display: grid; gap: 20px; }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.item-card { position: relative; }
.item-image { width: 100%; height: 200px; object-fit: cover; background-color: #f8f9fa; }
.item-info { padding: 15px; }
.item-title { font-size: 18px; font-weight: 600; color: #2c3e50; margin-bottom: 8px; }
.item-description { 
  color: #7f8c8d; font-size: 14px; line-height: 1.5; margin-bottom: 12px;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.item-price { font-size: 20px; font-weight: 700; color: #e74c3c; margin-bottom: 15px; }
.item-actions { display: flex; gap: 10px; justify-content: flex-end; }
.modal { 
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5); display: flex; align-items: center;
  justify-content: center; z-index: 1000;
}
.modal-content { 
  background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px);
  border-radius: 20px; padding: 40px; max-width: 600px; width: 90%;
  max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.modal-header { 
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e1e8ed;
}
.modal-title { font-size: 20px; font-weight: 600; color: #2c3e50; }
.close-btn { 
  background: none; border: none; font-size: 24px; cursor: pointer; color: #7f8c8d;
  padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { color: #e74c3c; }
.image-upload { 
  border: 2px dashed #667eea; border-radius: 12px; padding: 30px; text-align: center;
  cursor: pointer; transition: all 0.3s ease; background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
}
.image-upload:hover { 
  border-color: #4facfe; background: linear-gradient(135deg, #e8f2ff 0%, #f0f8ff 100%);
  transform: translateY(-2px);
}
.image-upload.dragover { 
  border-color: #4facfe; background: linear-gradient(135deg, #e8f2ff 0%, #f0f8ff 100%);
  transform: scale(1.02);
}
.image-preview { width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-top: 10px; }
.empty-state { text-align: center; padding: 60px 20px; color: #7f8c8d; }
.empty-state h3 { margin-bottom: 10px; color: #95a5a6; }
.empty-state p { color: #7f8c8d; }
@media (max-width: 768px) { 
  .form-row { grid-template-columns: 1fr; }
  .grid-3 { grid-template-columns: 1fr; }
  .container { padding: 10px; }
  .modal-content { width: 95%; padding: 20px; }
}
`

// Inject styles
const styleSheet = document.createElement("style")
styleSheet.textContent = styles
document.head.appendChild(styleSheet)

// App Component
function App() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', image: null, imagePreview: null
  })

  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Pendants', 'Brooches', 'Sets & Collections']

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: file, imagePreview: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('dragover') }
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('dragover') }
  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: file, imagePreview: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      alert('Please fill in product name and price')
      return
    }
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      name: formData.name, description: formData.description, price: parseFloat(formData.price),
      category: formData.category, image: formData.imagePreview,
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString()
    }
    if (editingItem) {
      setItems(prev => prev.map(item => item.id === editingItem.id ? newItem : item))
    } else {
      setItems(prev => [...prev, newItem])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', category: '', image: null, imagePreview: null })
    setEditingItem(null)
    setShowModal(false)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name, description: item.description, price: item.price.toString(),
      category: item.category, image: null, imagePreview: item.image
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const openAddModal = () => { resetForm(); setShowModal(true) }

  return (
    <div className="container">
      <header className="header">
        <h1>Admin Product Management</h1>
        <p>Manage your product information including images, descriptions, prices, and more</p>
      </header>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#000000' }}>
              <Package size={24} /> Product Management
            </h2>
            <button className="btn btn-primary" onClick={openAddModal}>
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>
        
        <div className="card-body">
          {items.length === 0 ? (
            <div className="empty-state">
              <Package size={64} style={{ margin: '0 auto 20px', color: '#bdc3c7' }} />
              <h3>No Products</h3>
              <p>Click "Add Product" button to start adding your first product</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {items.map(item => (
                <div key={item.id} className="card item-card">
                  {item.image && <img src={item.image} alt={item.name} className="item-image" />}
                  <div className="item-info">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-price">¥{item.price.toFixed(2)}</div>
                    {item.category && (
                      <div style={{ 
                        display: 'inline-block', background: '#3498db', color: 'white', 
                        padding: '4px 8px', borderRadius: '4px', fontSize: '12px', marginBottom: '10px'
                      }}>{item.category}</div>
                    )}
                    <div className="item-actions">
                      <button className="btn btn-secondary" onClick={() => handleEdit(item)}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{editingItem ? 'Edit Product' : 'Add Product'}</h3>
              <button className="close-btn" onClick={resetForm}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input type="text" id="name" name="name" value={formData.name}
                    onChange={handleInputChange} placeholder="Enter product name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input type="number" id="price" name="price" value={formData.price}
                    onChange={handleInputChange} placeholder="0.00" step="0.01" min="0" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="">Select category</option>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload" onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                  onDrop={handleDrop} onClick={() => document.getElementById('imageInput').click()}>
                  {formData.imagePreview ? (
                    <img src={formData.imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div>
                      <Package size={48} style={{ margin: '0 auto 10px', color: '#667eea' }} />
                      <p style={{ color: '#2c3e50', fontWeight: '500' }}>Click to upload image or drag image here</p>
                      <p style={{ fontSize: '12px', color: '#7f8c8d' }}>Supports JPG, PNG, GIF formats</p>
                    </div>
                  )}
                </div>
                <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description</label>
                <textarea id="description" name="description" value={formData.description}
                  onChange={handleInputChange} placeholder="Enter detailed product description..." rows="4" />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-success">
                  {editingItem ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)
