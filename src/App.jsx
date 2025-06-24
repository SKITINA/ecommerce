import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ShoppingCart, Plus, Minus, X, MessageCircle, Phone, MapPin, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppOrderForm from './components/WhatsAppOrderForm.jsx'
import ChatBot from './components/ChatBot.jsx'
import fruitsImg from './assets/fruits.jpg'
import vegetablesImg from './assets/vegetables.jpg'
import dessertsImg from './assets/desserts.jpg'
import logo from './assets/logo.jpeg'
import FloatingActions from './components/FloatingActions.jsx'
import './App.css'

// Données des produits
const products = [
  // Fruits
  {
    id: 1,
    name: 'Pommes Rouges',
    category: 'fruits',
    price: 25,
    image: fruitsImg,
    description: 'Pommes rouges fraîches et croquantes',
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Bananes',
    category: 'fruits',
    price: 18,
    image: fruitsImg,
    description: 'Bananes mûres et sucrées',
    unit: 'kg'
  },
  {
    id: 3,
    name: 'Oranges',
    category: 'fruits',
    price: 22,
    image: fruitsImg,
    description: 'Oranges juteuses riches en vitamine C',
    unit: 'kg'
  },
  {
    id: 4,
    name: 'Fraises',
    category: 'fruits',
    price: 35,
    image: fruitsImg,
    description: 'Fraises fraîches de saison',
    unit: 'kg'
  },
  // Légumes
  {
    id: 5,
    name: 'Tomates',
    category: 'vegetables',
    price: 15,
    image: vegetablesImg,
    description: 'Tomates fraîches et savoureuses',
    unit: 'kg'
  },
  {
    id: 6,
    name: 'Carottes',
    category: 'vegetables',
    price: 12,
    image: vegetablesImg,
    description: 'Carottes croquantes et nutritives',
    unit: 'kg'
  },
  {
    id: 7,
    name: 'Courgettes',
    category: 'vegetables',
    price: 20,
    image: vegetablesImg,
    description: 'Courgettes tendres et fraîches',
    unit: 'kg'
  },
  {
    id: 8,
    name: 'Poivrons',
    category: 'vegetables',
    price: 28,
    image: vegetablesImg,
    description: 'Poivrons colorés et croquants',
    unit: 'kg'
  },
  // Desserts Marocains
  {
    id: 9,
    name: 'Chebakia',
    category: 'desserts',
    price: 45,
    image: dessertsImg,
    description: 'Pâtisserie traditionnelle au miel et sésame',
    unit: 'kg'
  },
  {
    id: 10,
    name: 'Makroudh',
    category: 'desserts',
    price: 50,
    image: dessertsImg,
    description: 'Gâteau aux dattes et semoule',
    unit: 'kg'
  },
  {
    id: 11,
    name: 'Cornes de Gazelle',
    category: 'desserts',
    price: 60,
    image: dessertsImg,
    description: 'Pâtisserie aux amandes et fleur d\'oranger',
    unit: 'kg'
  },
  {
    id: 12,
    name: 'Baklawa',
    category: 'desserts',
    price: 55,
    image: dessertsImg,
    description: 'Feuilletés aux amandes et miel',
    unit: 'kg'
  }
]

const categories = [
  { id: 'all', name: 'Tous les Produits', icon: '🛒' },
  { id: 'fruits', name: 'Fruits Frais', icon: '🍎' },
  { id: 'vegetables', name: 'Légumes', icon: '🥕' },
  { id: 'desserts', name: 'Desserts Marocains', icon: '🧁' }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)

  // Filtrer les produits par catégorie
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Ajouter au panier
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Retirer du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Modifier la quantité
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Calculer le total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Ouvrir le formulaire de commande WhatsApp
  const openOrderForm = () => {
    setIsOrderFormOpen(true)
    setIsCartOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50"
    >
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 rounded-b-xl animate-navbar-fade">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
              className="flex items-center space-x-3"
            >
              <img
                src={logo}
                alt="Logo FreshMarket"
                className="w-14 h-14 rounded-full shadow-md border-2 border-green-700 bg-white object-contain"
                style={{ background: 'white' }}
              />
              <span className="text-3xl font-extrabold text-green-800 tracking-tight drop-shadow-sm logo-title">
                FreshMarket
              </span>
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Accueil</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">À Propos</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Contact</a>
            </nav>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-green-600 hover:bg-green-700 rounded-xl shadow-lg transition-all duration-200 p-3"
                style={{ minWidth: 48, minHeight: 48 }}
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="py-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Fruits, Légumes & Desserts
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Produits frais et desserts marocains traditionnels livrés chez vous
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Qualité Premium</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-green-500 mr-1" />
              <span>Livraison Rapide</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 text-blue-500 mr-1" />
              <span>Commande WhatsApp</span>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="container mx-auto px-4 pb-16"
      >
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform hover:scale-110"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        {product.price} MAD/{product.unit}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {product.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter au Panier
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Mon Panier</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Votre panier est vide</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.price} MAD/{item.unit}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-xl font-bold text-green-600">{total} MAD</span>
                      </div>
                      <Button
                        onClick={openOrderForm}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Commander via WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Actions (audio, email, plus) en bas à gauche */}
      <FloatingActions />

      {/* Chatbot Button en bas à droite (inchangé) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* ChatBot */}
      <ChatBot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="bg-gray-800 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FreshMarket</h3>
              <p className="text-gray-300">
                Votre source de confiance pour des produits frais et des desserts marocains authentiques.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+212 6 00 00 00 00</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Horaires</h4>
              <div className="text-gray-300">
                <p>Lun - Sam: 8h00 - 20h00</p>
                <p>Dimanche: 9h00 - 18h00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreshMarket. Tous droits réservés.</p>
          </div>
        </div>
      </motion.footer>

      {/* WhatsApp Order Form */}
      <WhatsAppOrderForm
        cart={cart}
        total={total}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </motion.div>
  )
}

export default App

