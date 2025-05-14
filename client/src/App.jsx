import { useState, useEffect, useRef } from 'react';
import { Send, Coffee, MessageSquare, X, Settings, ChevronLeft, Menu as MenuIcon } from 'lucide-react';

const FloatingButton = ({ onClick, isOpen }) => (
  <div 
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: isOpen ? '#D84315' : '#FF6B35',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      zIndex: 1000
    }}
  >
    {isOpen ? <X size={24} color="white" /> : <MessageSquare size={24} color="white" />}
  </div>
);

const ChatWindow = ({ isOpen, children }) => (
  <div style={{
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    width: '360px',
    height: '520px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0,0,0,0.16)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    transform: isOpen ? 'scale(1)' : 'scale(0)',
    opacity: isOpen ? 1 : 0,
    transformOrigin: 'bottom right',
    zIndex: 999
  }}>
    {children}
  </div>
);

const Header = ({ onSettingsClick, children }) => (
  <div style={{
    backgroundColor: '#FF6B35',
    color: 'white',
    padding: '14px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </div>
    <div 
      onClick={onSettingsClick}
      style={{ 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)'
      }}
    >
      <Settings size={18} color="white" />
    </div>
  </div>
);

const HeaderLogo = () => (
  <div style={{
    width: '36px',
    height: '36px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px'
  }}>
    <Coffee size={20} color="#FF6B35" />
  </div>
);

const HeaderTitle = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
    <h1 style={{
      margin: 0,
      fontSize: '16px',
      fontWeight: 600
    }}>
      {children}
    </h1>
    <p style={{
      margin: '2px 0 0 0',
      fontSize: '12px',
      opacity: 0.85
    }}>
      Estamos para servirte
    </p>
  </div>
);

const ChatContainer = ({ children }) => (
  <div style={{
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#F9F9F9',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="52" height="26" viewBox="0 0 52 26" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f0f0f0" fill-opacity="0.4"%3E%3Cpath d="M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    display: 'flex',
    flexDirection: 'column'
  }}>
    {children}
  </div>
);

const Message = ({ sender, children }) => (
  <div style={{
    display: 'flex',
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
    marginBottom: '16px'
  }}>
    <div style={{
      maxWidth: '75%',
      padding: '12px 16px',
      borderRadius: sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
      backgroundColor: sender === 'user' ? '#FF6B35' : 'white',
      color: sender === 'user' ? 'white' : '#333',
      fontWeight: sender === 'user' ? 400 : 400,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      fontSize: '14px',
      lineHeight: '1.5'
    }}>
      {children}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '16px'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '14px 18px',
      borderRadius: '16px 16px 16px 0',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#FF6B35',
        opacity: 0.7,
        animation: 'bounce 1.4s infinite ease-in-out both'
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#FF6B35',
        opacity: 0.7,
        animation: 'bounce 1.4s infinite ease-in-out both',
        animationDelay: '0.2s'
      }} />
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#FF6B35',
        opacity: 0.7,
        animation: 'bounce 1.4s infinite ease-in-out both',
        animationDelay: '0.4s'
      }} />
    </div>
  </div>
);

const InputContainer = ({ children }) => (
  <div style={{
    padding: '14px',
    borderTop: '1px solid #eee',
    backgroundColor: 'white'
  }}>
    {children}
  </div>
);

const InputForm = ({ children }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: '24px',
    padding: '6px',
    position: 'relative'
  }}>
    {children}
  </div>
);

const Input = ({ value, onChange }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder="¿En qué puedo ayudarte?"
    style={{
      flex: 1,
      border: 'none',
      padding: '10px 14px',
      fontSize: '14px',
      borderRadius: '24px',
      backgroundColor: 'transparent',
      outline: 'none'
    }}
  />
);

const SendButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      border: 'none',
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      backgroundColor: disabled ? '#ccc' : '#FF6B35',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s',
      padding: 0
    }}
  >
    <Send size={18} />
  </button>
);

const SpecialOfferBanner = ({ children }) => (
  <div style={{
    backgroundColor: '#FFF4EF',
    borderRadius: '8px',
    padding: '12px',
    margin: '0 0 16px 0',
    border: '1px dashed #FF6B35',
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px'
  }}>
    {children}
  </div>
);

const ConfigPanel = ({ isOpen, onClose, restaurant, setRestaurant }) => {
  if (!isOpen) return null;
  
  const handleChangeName = (e) => {
    setRestaurant({...restaurant, name: e.target.value});
  };
  
  const handleChangeWelcomeMessage = (e) => {
    setRestaurant({...restaurant, welcomeMessage: e.target.value});
  };
  
  const handleChangeSpecialOffer = (e) => {
    setRestaurant({...restaurant, specialOffer: e.target.value});
  };

  const handleAddMenuItem = () => {
    const newMenu = [...restaurant.menu, { name: "", price: "", description: "" }];
    setRestaurant({...restaurant, menu: newMenu});
  };
  
  const handleUpdateMenuItem = (index, field, value) => {
    const newMenu = [...restaurant.menu];
    newMenu[index][field] = value;
    setRestaurant({...restaurant, menu: newMenu});
  };
  
  const handleRemoveMenuItem = (index) => {
    const newMenu = restaurant.menu.filter((_, i) => i !== index);
    setRestaurant({...restaurant, menu: newMenu});
  };
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#FF6B35',
        color: 'white',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div 
          onClick={onClose} 
          style={{ 
            cursor: 'pointer', 
            marginRight: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }}
        >
          <ChevronLeft size={20} color="white" />
        </div>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Configuración del Chatbot</h3>
      </div>
      
      <div style={{ 
        flex: 1,
        overflowY: 'auto',
        padding: '20px' 
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: 600
          }}>
            Nombre del Restaurante
          </label>
          <input 
            type="text" 
            value={restaurant.name} 
            onChange={handleChangeName}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: 600
          }}>
            Mensaje de Bienvenida
          </label>
          <textarea 
            value={restaurant.welcomeMessage} 
            onChange={handleChangeWelcomeMessage}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              height: '80px',
              resize: 'none',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontSize: '14px',
            fontWeight: 600
          }}>
            Oferta Especial
          </label>
          <textarea 
            value={restaurant.specialOffer} 
            onChange={handleChangeSpecialOffer}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              height: '60px',
              resize: 'none',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '12px' 
          }}>
            <h4 style={{ margin: 0, fontSize: '15px' }}>Menú del Restaurante</h4>
            <button 
              onClick={handleAddMenuItem}
              style={{
                backgroundColor: '#FF6B35',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Añadir Plato
            </button>
          </div>
          
          {restaurant.menu.map((item, index) => (
            <div key={index} style={{ 
              border: '1px solid #eee',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h5 style={{ margin: 0, fontSize: '14px' }}>Plato #{index + 1}</h5>
                <button 
                  onClick={() => handleRemoveMenuItem(index)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Nombre del plato"
                  value={item.name}
                  onChange={(e) => handleUpdateMenuItem(index, 'name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '13px',
                    marginBottom: '6px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => handleUpdateMenuItem(index, 'price', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '13px',
                    marginBottom: '6px'
                  }}
                />
              </div>
              
              <div>
                <textarea 
                  placeholder="Descripción del plato"
                  value={item.description}
                  onChange={(e) => handleUpdateMenuItem(index, 'description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    height: '60px',
                    resize: 'none',
                    fontSize: '13px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function RestaurantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [restaurant, setRestaurant] = useState({
    name: "Sabores Mediterráneos",
    welcomeMessage: "¡Hola! Bienvenido a Sabores Mediterráneos. ¿En qué puedo ayudarte hoy?",
    specialOffer: "20% de descuento en todas nuestras pizzas artesanales de 3pm a 6pm.",
    menu: [
      {
        name: "Paella Valenciana",
        price: "$18.90",
        description: "Arroz con azafrán, pollo, mariscos, tomate, pimiento y guisantes."
      },
      {
        name: "Pizza Mediterránea",
        price: "$14.50",
        description: "Base crujiente con aceitunas, queso feta, tomate, albahaca y aceite de oliva."
      },
      {
        name: "Ensalada Griega",
        price: "$9.90",
        description: "Pepino, tomate, cebolla roja, aceitunas kalamata, queso feta y aderezo especial."
      }
    ]
  });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 1, text: restaurant.welcomeMessage, sender: "bot" },
        { id: 2, text: "Puedo ayudarte con reservaciones, nuestro menú del día, o información sobre eventos especiales.", sender: "bot" }
      ]);
    }
  }, [isOpen, messages.length, restaurant.welcomeMessage]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        { id: 1, text: restaurant.welcomeMessage, sender: "bot" },
        { id: 2, text: "Puedo ayudarte con reservaciones, nuestro menú del día, o información sobre eventos especiales.", sender: "bot" }
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user"
    };
    
    setMessages([...messages, newUserMessage]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = "";
      const userInput = input.toLowerCase();
      
      if (userInput.includes("menú") || userInput.includes("carta") || userInput.includes("platos") || userInput.includes("comer")) {
        if (restaurant.menu.length > 0) {
          botResponse = `En ${restaurant.name} ofrecemos una variedad de platos mediterráneos. Algunos de nuestros platos populares son:\n\n`;
          
          restaurant.menu.forEach((item, index) => {
            botResponse += `• ${item.name} (${item.price}): ${item.description}\n`;
            if (index < restaurant.menu.length - 1) botResponse += "\n";
          });
          
          botResponse += "\n¿Te gustaría conocer alguna recomendación especial del chef?";
        } else {
          botResponse = `En ${restaurant.name} ofrecemos una variedad de platos mediterráneos. ¿Te interesa alguna categoría en particular como entradas, platos principales o postres?`;
        }
      } 
      else if (userInput.includes("reserva") || userInput.includes("reservar") || userInput.includes("mesa")) {
        botResponse = "¡Perfecto! Para hacer una reserva necesitaré algunos datos: ¿Para qué fecha y hora deseas la reserva? ¿Cuántas personas serán?";
      }
      else if (userInput.includes("hora") || userInput.includes("abierto") || userInput.includes("horario")) {
        botResponse = "Nuestro horario es: Lunes a Jueves de 12pm a 10pm, Viernes y Sábados de 12pm a 12am, y Domingos de 12pm a 9pm.";
      }
      else if (userInput.includes("ubicación") || userInput.includes("dirección") || userInput.includes("donde")) {
        botResponse = "Estamos ubicados en Av. Mediterráneo 123, en el centro de la ciudad. Tenemos estacionamiento gratuito para clientes.";
      }
      else if (userInput.includes("oferta") || userInput.includes("promoción") || userInput.includes("descuento") || userInput.includes("especial")) {
        botResponse = `¡Tenemos una promoción especial! ${restaurant.specialOffer} También ofrecemos 2x1 en postres los martes.`;
      }
      else if (restaurant.menu.some(item => userInput.includes(item.name.toLowerCase()))) {
        const mentionedItem = restaurant.menu.find(item => 
          userInput.includes(item.name.toLowerCase())
        );
        
        botResponse = `¡${mentionedItem.name} es una excelente elección! ${mentionedItem.description} Su precio es ${mentionedItem.price}. ¿Te gustaría ordenarlo o conocer más detalles?`;
      }
      else {
        botResponse = `Gracias por tu mensaje. En ${restaurant.name} podemos ayudarte con nuestro menú, hacer una reserva o informarte sobre nuestras promociones especiales. ¿En qué estás interesado?`;
      }
      
      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot"
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleConfigPanel = () => {
    setShowConfig(!showConfig);
  };

  return (
    <>
      <FloatingButton onClick={toggleChat} isOpen={isOpen} />
      
      <ChatWindow isOpen={isOpen}>
        <Header onSettingsClick={toggleConfigPanel}>
          <HeaderLogo />
          <HeaderTitle>{restaurant.name}</HeaderTitle>
        </Header>
        
        <ChatContainer>
          {restaurant.specialOffer && (
            <SpecialOfferBanner>
              <Coffee size={16} color="#FF6B35" style={{ marginRight: '8px', flexShrink: 0 }} />
              <div>
                <strong>Oferta especial:</strong> {restaurant.specialOffer}
              </div>
            </SpecialOfferBanner>
          )}
          
          {messages.map((message) => (
            <Message key={message.id} sender={message.sender}>
              {message.text}
            </Message>
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </ChatContainer>
        
        <InputContainer>
          <InputForm>
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SendButton 
              onClick={handleSendMessage} 
              disabled={input.trim() === ""}
            />
          </InputForm>
        </InputContainer>
        
        <ConfigPanel 
          isOpen={showConfig} 
          onClose={toggleConfigPanel} 
          restaurant={restaurant}
          setRestaurant={setRestaurant}
        />
      </ChatWindow>
    </>
  );
}