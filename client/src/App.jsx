import { restaurantService } from "./services/restaurantService";
import { useState, useEffect, useRef } from "react";
import {
  Send,
  Coffee,
  MessageSquare,
  X,
  Settings,
  ChevronLeft,
  Menu as MenuIcon,
} from "lucide-react";
import { SendButton } from "./components/sendButton";
import { FloatingButton } from "./components/floatingButton";
import { ChatWindow } from "./components/chatWindow";
import { Header } from "./components/header";
import { HeaderLogo } from "./components/headerLogo";
import { HeaderTitle } from "./components/headerTitle";
import { ChatContainer } from "./components/chatContainer";
import Formulario from "./page/formulario";
import { Message } from "./components/Message";
import { InputForm } from "./components/ui/inputForm";
import { Input } from "./page/style";
import { InputContainer } from "./components/ui/inputContainer";
import { TypingIndicator } from "./components/typingIndicator";
import { SpecialOfferBanner } from "./components/specialOfferBanner";
import { ConfigPanel } from "./config/configPanel";
import { Dropdown } from "./components/dropdown";
import { FeedbackSummary } from "./components/feedbackSummary";

export default function RestaurantChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [restaurant, setRestaurant] = useState({
    name: "Sabores Mediterráneos",
    welcomeMessage:
      "¡Hola! Bienvenido a Sabores Mediterráneos. ¿En qué puedo ayudarte hoy?",
    specialOffer:
      "20% de descuento en todas nuestras pizzas artesanales de 3pm a 6pm.",
    menu: [
      {
        name: "Paella Valenciana",
        price: "$18.90",
        description:
          "Arroz con azafrán, pollo, mariscos, tomate, pimiento y guisantes.",
      },
      {
        name: "Pizza Mediterránea",
        price: "$14.50",
        description:
          "Base crujiente con aceitunas, queso feta, tomate, albahaca y aceite de oliva.",
      },
      {
        name: "Ensalada Griega",
        price: "$9.90",
        description:
          "Pepino, tomate, cebolla roja, aceitunas kalamata, queso feta y aderezo especial.",
      },
    ],
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await restaurantService.getConfig();
        if (config) {
          setRestaurant(config);
        }
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 1, text: restaurant.welcomeMessage, sender: "bot" },
        {
          id: 2,
          text: "Puedo ayudarte con reservaciones, nuestro menú del día, o información sobre eventos especiales.",
          sender: "bot",
        },
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
        {
          id: 2,
          text: "Puedo ayudarte con reservaciones, nuestro menú del día, o información sobre eventos especiales.",
          sender: "bot",
        },
      ]);
    }
  };

 const handleSendMessage = async (e) => {
  e.preventDefault();
  if (input.trim() === "") return;

  const newUserMessage = {
    id: messages.length + 1,
    text: input,
    sender: "user",
  };

  setMessages([...messages, newUserMessage]);
  setInput("");
  setIsTyping(true);

  try {
    const res = await restaurantService.sendMessage(input);
    const newBotMessage = {
      id: messages.length + 2,
      text: res.response,
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, newBotMessage]);
  } catch (error) {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 2,
        text: "Ocurrió un error al contactar al chatbot.",
        sender: "bot",
      },
    ]);
  }
  setIsTyping(false);
};
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formulario, setFormulario] = useState(false);
  const toggleConfigPanel = () => {
    /*     setShowConfig(!showConfig);
     */ setFormulario(!formulario);
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
              <Coffee
                size={16}
                color="#FF6B35"
                style={{ marginRight: "8px", flexShrink: 0 }}
              />
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
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
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
      {formulario && <Formulario />}
      <Dropdown onSelect={setSelectedRestaurant} />
      <FeedbackSummary selectedRestaurant={selectedRestaurant} />
    </>
  );
}
