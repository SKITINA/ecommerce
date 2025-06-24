import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Mail, Plus, X, MessageCircle } from 'lucide-react'

const actions = [
  {
    icon: <Mic className="w-6 h-6" />,
    label: 'Audio',
    color: 'bg-green-500',
    onClick: () => alert('Fonction audio à implémenter !'),
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: 'Email',
    color: 'bg-red-500',
    onClick: () => window.open('mailto:contact@freshmarket.com', '_blank'),
  },
  {
    icon: <Plus className="w-6 h-6" />,
    label: 'Plus',
    color: 'bg-green-500',
    onClick: () => alert('Action personnalisée !'),
  },
]

export default function FloatingActions() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-center space-y-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center space-y-3 mb-2"
          >
            {actions.map((action, idx) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white ${action.color} focus:outline-none`}
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                onClick={action.onClick}
                title={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                {action.icon}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white bg-green-600 focus:outline-none mt-2"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
              onClick={() => setOpen(false)}
              title="Fermer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-7 h-7" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-white bg-green-600 focus:outline-none"
          style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
          onClick={() => setOpen(true)}
          title="Ouvrir menu audio"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Mic className="w-8 h-8" />
        </motion.button>
      )}
    </div>
  )
} 