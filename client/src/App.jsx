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

  const handleSendMessage = (e) => {
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

    setTimeout(() => {
      let botResponse = "";
      const userInput = input.toLowerCase();

      if (
        userInput.includes("menú") ||
        userInput.includes("carta") ||
        userInput.includes("platos") ||
        userInput.includes("comer")
      ) {
        if (restaurant.menu.length > 0) {
          botResponse = `En ${restaurant.name} ofrecemos una variedad de platos mediterráneos. Algunos de nuestros platos populares son:\n\n`;

          restaurant.menu.forEach((item, index) => {
            botResponse += `• ${item.name} (${item.price}): ${item.description}\n`;
            if (index < restaurant.menu.length - 1) botResponse += "\n";
          });

          botResponse +=
            "\n¿Te gustaría conocer alguna recomendación especial del chef?";
        } else {
          botResponse = `En ${restaurant.name} ofrecemos una variedad de platos mediterráneos. ¿Te interesa alguna categoría en particular como entradas, platos principales o postres?`;
        }
      } else if (
        userInput.includes("reserva") ||
        userInput.includes("reservar") ||
        userInput.includes("mesa")
      ) {
        botResponse =
          "¡Perfecto! Para hacer una reserva necesitaré algunos datos: ¿Para qué fecha y hora deseas la reserva? ¿Cuántas personas serán?";
      } else if (
        userInput.includes("hora") ||
        userInput.includes("abierto") ||
        userInput.includes("horario")
      ) {
        botResponse =
          "Nuestro horario es: Lunes a Jueves de 12pm a 10pm, Viernes y Sábados de 12pm a 12am, y Domingos de 12pm a 9pm.";
      } else if (
        userInput.includes("ubicación") ||
        userInput.includes("dirección") ||
        userInput.includes("donde")
      ) {
        botResponse =
          "Estamos ubicados en Av. Mediterráneo 123, en el centro de la ciudad. Tenemos estacionamiento gratuito para clientes.";
      } else if (
        userInput.includes("oferta") ||
        userInput.includes("promoción") ||
        userInput.includes("descuento") ||
        userInput.includes("especial")
      ) {
        botResponse = `¡Tenemos una promoción especial! ${restaurant.specialOffer} También ofrecemos 2x1 en postres los martes.`;
      } else if (
        restaurant.menu.some((item) =>
          userInput.includes(item.name.toLowerCase())
        )
      ) {
        const mentionedItem = restaurant.menu.find((item) =>
          userInput.includes(item.name.toLowerCase())
        );

        botResponse = `¡${mentionedItem.name} es una excelente elección! ${mentionedItem.description} Su precio es ${mentionedItem.price}. ¿Te gustaría ordenarlo o conocer más detalles?`;
      } else {
        botResponse = `Gracias por tu mensaje. En ${restaurant.name} podemos ayudarte con nuestro menú, hacer una reserva o informarte sobre nuestras promociones especiales. ¿En qué estás interesado?`;
      }

      const newBotMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
      };

      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1500);
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
