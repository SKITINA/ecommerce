import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ShoppingCart, Plus, Minus, X, MessageCircle, Phone, MapPin, Star, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppOrderForm from './components/WhatsAppOrderForm.jsx'
import ChatBot from './components/ChatBot.jsx'
import bananeImg from '@/assets/banane.jpeg'
import carotteImg from '@/assets/Carrote.jpeg'
import cornesDeGazelleImg from '@/assets/Cornes de Gazelle.jpeg'
import courgettesImg from '@/assets/Courgettes.jpeg'
import dessertsImg from '@/assets/desserts.jpg'
import foodImg from '@/assets/food.jpg'
import fraiseImg from '@/assets/fraise.jpeg'
import fruitsImg from '@/assets/fruits.jpg'
import logoImg from '@/assets/logo.jpeg'
import makroudhImg from '@/assets/Makroudh.jpeg'
import orangesImg from '@/assets/oranges.jpeg'
import poivronsImg from '@/assets/Poivrons.jpeg'
import pommerougeImg from '@/assets/pommerouge.jpeg'
import tomatesImg from '@/assets/tomates.jpg'
import vegetablesImg from '@/assets/vegetables.jpg'
import FloatingActions from './components/FloatingActions.jsx'
import heroBg from './assets/food.jpg'
import histoireImg from './assets/desserts.jpg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Données des produits
const products = [
  // Fruits
  {
    id: 1,
    name: 'Pommes Rouges',
    category: 'fruits',
    price: 25,
    image: '/src/assets/pommerouge.jpeg',
    description: 'Pommes rouges fraîches et croquantes',
    unit: 'kg'
  },
  {
    id: 2,
    name: 'Bananes',
    category: 'fruits',
    price: 18,
    image: '/src/assets/banane.jpeg',
    description: 'Bananes mûres et sucrées',
    unit: 'kg'
  },
  {
    id: 3,
    name: 'Oranges',
    category: 'fruits',
    price: 22,
    image: '/src/assets/oranges.jpeg',
    description: 'Oranges juteuses riches en vitamine C',
    unit: 'kg'
  },
  {
    id: 4,
    name: 'Fraises',
    category: 'fruits',
    price: 35,
    image: '/src/assets/fraise.jpeg',
    description: 'Fraises fraîches de saison',
    unit: 'kg'
  },
  // Légumes
  {
    id: 5,
    name: 'Tomates',
    category: 'vegetables',
    price: 15,
    image: '/src/assets/tomates.jpg',
    description: 'Tomates fraîches et savoureuses',
    unit: 'kg'
  },
  {
    id: 6,
    name: 'Carottes',
    category: 'vegetables',
    price: 12,
    image: '/src/assets/Carrote.jpeg',
    description: 'Carottes croquantes et nutritives',
    unit: 'kg'
  },
  {
    id: 7,
    name: 'Courgettes',
    category: 'vegetables',
    price: 20,
    image: '/src/assets/Courgettes.jpeg',
    description: 'Courgettes tendres et fraîches',
    unit: 'kg'
  },
  {
    id: 8,
    name: 'Poivrons',
    category: 'vegetables',
    price: 28,
    image: '/src/assets/Poivrons.jpeg',
    description: 'Poivrons colorés et croquants',
    unit: 'kg'
  }
];

const categories = [
  { id: 'all', name: 'Tous les Produits', icon: '🛒' },
  { id: 'fruits', name: 'Fruits Frais', icon: '🍎' },
  { id: 'vegetables', name: 'Légumes', icon: '🥕' },
]

const packs = [
  {
    name: "Pack Essentiel",
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1.5 KG", emoji: "🥕" },
    ],
    highlight: "PLUS 17 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Famille",
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1 KG", emoji: "🥕" },
    ],
    highlight: "PLUS 19 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Prestige",
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
      
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1 KG", emoji: "🥕" },
      
    ],
    highlight: "PLUS 26 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Vitalité",
    fruits: [
      { label: "Citron", qty: "1 KG", emoji: "🍋" },
      { label: "Orange", qty: "2 KG", emoji: "🍊" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
      { label: "Kiwi", qty: "1 KG", emoji: "🥝" },
    ],
    legumes: [
      { label: "Carotte", qty: "2 KG", emoji: "🥕" },
      { label: "Courgette", qty: "1 KG", emoji: "🥒" },
      { label: "Concombre", qty: "1 KG", emoji: "🥒" },
      { label: "Épinard", qty: "1 botte", emoji: "🥬" },
    ],
    highlight: "PACK BOOST VITAMINES & ANTIOXYDANTS"
  },
]

// Définir les variants d'animation pour le stagger
const packGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
    },
  },
}
const packCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 60, damping: 18 } },
}

function PacksPage() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={packGridVariants}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
      className="container mx-auto px-4 py-16 min-h-[60vh]"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        className="text-4xl md:text-5xl font-serif font-extrabold text-orange-600 mb-10 text-center tracking-tight drop-shadow-lg"
      >
        Nos Packs
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10">
        {packs.map((pack, idx) => (
          <motion.div
            key={pack.name}
            variants={packCardVariants}
            className="flex h-full"
          >
            <Card className="flex flex-col flex-1 min-h-[520px] h-full shadow-xl rounded-2xl overflow-hidden border bg-white/90">
              <CardHeader className="bg-yellow-400/80 text-center py-6">
                <CardTitle className="text-3xl md:text-4xl font-serif font-bold text-orange-700 tracking-wide drop-shadow-sm">
                  {pack.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Fruits</h3>
                    <ul className="space-y-2">
                      {pack.fruits.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                          {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                          <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Légumes</h3>
                    <ul className="space-y-2">
                      {pack.legumes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                          {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                          <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="bg-yellow-300 text-orange-800 font-bold text-lg rounded-lg py-3 px-6 inline-block shadow-md animate-pulse font-serif tracking-wide">
                    {pack.highlight}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function ProductsPage() {
  return (
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
          {products.map((product) => (
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
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const histoireRef = useRef(null)

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

  // Hauteur de la navbar (pour calcul dynamique)
  const NAVBAR_HEIGHT = 88 // px (ajuster si besoin)

  // Scroll vers la section Notre Histoire
  const scrollToHistoire = (e) => {
    e.preventDefault()
    if (histoireRef.current) {
      histoireRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Router>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50"
      >
        {/* Navbar (header) */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
          className="bg-white shadow-lg sticky top-0 z-50 rounded-b-xl px-2 md:px-0"
          style={{ height: NAVBAR_HEIGHT }}
        >
          <div className="container mx-auto flex items-center justify-between py-3">
            {/* Logo + nom à gauche */}
            <div className="flex items-center space-x-3">
              <img
                src={logoImg}
                alt="Logo FreshMarket"
                className="w-14 h-14 rounded-full shadow-md border-2 border-green-700 bg-white object-contain"
                style={{ background: 'white' }}
              />
              <span className="text-3xl font-extrabold text-green-800 tracking-tight drop-shadow-sm logo-title">
                FreshMarket
              </span>
            </div>
            {/* Liens au centre/droite */}
            <nav className="hidden md:flex flex-1 justify-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Accueil</Link>
              <a href="#histoire" onClick={scrollToHistoire} className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Notre Histoire</a>
              <Link to="/packs" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Packs</Link>
              <Link to="/produits" className="text-gray-700 hover:text-green-600 transition-colors font-medium px-2 py-1 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-200">Produits</Link>
            </nav>
            {/* Panier à droite */}
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
        </motion.header>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section full screen sous la navbar */}
              <motion.section
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.9, type: 'spring', stiffness: 50 }}
                className="relative w-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(${heroBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`
                }}
              >
                <div className="absolute inset-0 bg-black/60 z-0" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4 py-12">
                  <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight">
                    Fruits, Légumes & Produits Frais
                  </h2>
                  <p className="text-2xl md:text-3xl text-gray-100 mb-10 drop-shadow-xl font-medium">
                    Commandez des produits frais, sains et variés, livrés chez vous en quelques clics !
                  </p>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block px-10 py-5 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-full shadow-2xl transition-all duration-200 border-4 border-white/10"
                  >
                    Découvrir le marché
                  </motion.a>
                </div>
              </motion.section>

              {/* Section Notre Histoire */}
              <section ref={histoireRef} id="histoire" className="w-full py-20 bg-white">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
                    className="flex-1"
                  >
                    <motion.h2
                      initial={{ opacity: 0, y: -40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
                      className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8"
                    >
                      NOTRE HISTOIRE
                    </motion.h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                      FreshMarket est une aventure familiale passionnée par la qualité et la fraîcheur. Depuis des années, nous sélectionnons avec soin les meilleurs fruits, légumes et desserts marocains pour régaler vos papilles.<br/><br/>
                      Notre mission : vous offrir chaque jour le meilleur du marché
                    </p>
                    <p className="text-xl font-semibold text-green-700 font-serif">Fait avec Passion</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, type: 'spring', stiffness: 60, delay: 0.2 }}
                    className="flex-1 flex justify-center"
                  >
                    <img
                      src={fruitsImg}
                      alt="Fruits et légumes FreshMarket"
                      className="rounded-2xl shadow-2xl w-full max-w-md object-cover animate-fadein"
                      style={{ minHeight: 320, maxHeight: 420 }}
                    />
                  </motion.div>
                </div>
              </section>

              {/* Section Packs (home) */}
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={packGridVariants}
                transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
                className="container mx-auto px-4 py-16 min-h-[60vh]"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
                  className="text-4xl md:text-5xl font-serif font-extrabold text-orange-600 mb-10 text-center tracking-tight drop-shadow-lg"
                >
                  Nos Packs
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-10">
                  {packs.map((pack, idx) => (
                    <motion.div
                      key={pack.name}
                      variants={packCardVariants}
                      className="flex h-full"
                    >
                      <Card className="flex flex-col flex-1 min-h-[520px] h-full shadow-xl rounded-2xl overflow-hidden border bg-white/90">
                        <CardHeader className="bg-yellow-400/80 text-center py-6">
                          <CardTitle className="text-3xl md:text-4xl font-serif font-bold text-orange-700 tracking-wide drop-shadow-sm">
                            {pack.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <div>
                              <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Fruits</h3>
                              <ul className="space-y-2">
                                {pack.fruits.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                                    {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                                    <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Légumes</h3>
                              <ul className="space-y-2">
                                {pack.legumes.map((item, i) => (
                                  <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                                    {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                                    <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-8 text-center">
                            <div className="bg-yellow-300 text-orange-800 font-bold text-lg rounded-lg py-3 px-6 inline-block shadow-md animate-pulse font-serif tracking-wide">
                              {pack.highlight}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
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
            </>
          } />
          <Route path="/packs" element={<PacksPage />} />
          <Route path="/produits" element={<ProductsPage />} />
        </Routes>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/10 backdrop-blur-sm transition-all duration-300 z-50"
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

        {/* Chatbot Button en bas à droite (bleu, robot) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 chatbot-glow"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
        >
          <Bot className="w-8 h-8" />
          <style>{`
            .chatbot-glow:hover {
              box-shadow: 0 0 0 0 #2563eb, 0 0 16px 4px #2563eb66, 0 4px 16px rgba(0,0,0,0.18);
              animation: chatbot-glow-anim 1.5s infinite alternate;
            }
            @keyframes chatbot-glow-anim {
              0% { box-shadow: 0 0 0 0 #2563eb, 0 0 16px 4px #2563eb66, 0 4px 16px rgba(0,0,0,0.18); }
              100% { box-shadow: 0 0 0 8px #2563eb44, 0 0 32px 8px #2563eb66, 0 4px 16px rgba(0,0,0,0.18); }
            }
          `}</style>
        </motion.button>

        {/* ChatBot : positionné juste au-dessus du bouton, aligné à droite, stable */}
        <AnimatePresence>
          {isChatbotOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 80 }}
              className="fixed right-6 bottom-[88px] z-50 w-80"
              style={{ minWidth: 320, maxWidth: 384 }}
            >
              <ChatBot
                isOpen={isChatbotOpen}
                onClose={() => setIsChatbotOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
    </Router>
  )
}

export default App

