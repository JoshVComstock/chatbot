import React, { useState, useEffect } from "react";
import { Menu, MapPin, Clock, Star, ChefHat, Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";

// Styled Components simulados con objetos de estilo
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#ffffff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },

  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
    borderBottom: "2px solid #ff6b35",
  },

  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#ff6b35",
  },

  nav: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },

  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.3s ease",
    cursor: "pointer",
  },

  hero: {
    height: "100vh",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  heroContent: {
    textAlign: "center",
    zIndex: 2,
    maxWidth: "800px",
    padding: "0 2rem",
  },

  heroTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    background: "linear-gradient(45deg, #ff6b35, #ff8c42)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "#cccccc",
  },

  ctaButton: {
    backgroundColor: "#ff6b35",
    color: "#ffffff",
    border: "none",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  decorativeElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },

  circle: {
    position: "absolute",
    borderRadius: "50%",
    opacity: 0.1,
  },

  section: {
    padding: "5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "3rem",
    color: "#ff6b35",
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "4rem",
  },

  featureCard: {
    backgroundColor: "#2a2a2a",
    padding: "2rem",
    borderRadius: "20px",
    textAlign: "center",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },

  featureIcon: {
    color: "#ff6b35",
    marginBottom: "1rem",
  },

  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },

  menuItem: {
    backgroundColor: "#2a2a2a",
    borderRadius: "15px",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },

  menuImage: {
    width: "100%",
    height: "200px",
    backgroundColor: "#ff6b35",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
  },

  menuContent: {
    padding: "1.5rem",
  },

  menuTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#ff6b35",
  },

  menuDescription: {
    color: "#cccccc",
    marginBottom: "1rem",
    lineHeight: "1.5",
  },

  menuPrice: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#ff6b35",
  },

  contact: {
    backgroundColor: "#000000",
    padding: "4rem 2rem",
    textAlign: "center",
  },

  contactInfo: {
    display: "flex",
    justifyContent: "center",
    gap: "3rem",
    flexWrap: "wrap",
    marginTop: "2rem",
  },

  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#cccccc",
  },

  footer: {
    backgroundColor: "#000000",
    padding: "2rem",
    textAlign: "center",
    borderTop: "2px solid #ff6b35",
    color: "#cccccc",
  },
};

const BolivianRestaurant = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <ChefHat size={48} />,
      title: "Cocina Tradicional",
      description:
        "Platos auténticos bolivianos preparados con recetas familiares transmitidas por generaciones.",
    },
    {
      icon: <Heart size={48} />,
      title: "Ingredientes Locales",
      description:
        "Utilizamos quinoa, llama, papa y otros ingredientes frescos directamente de Bolivia.",
    },
    {
      icon: <Star size={48} />,
      title: "Experiencia Única",
      description:
        "Ambiente acogedor que te transporta a los sabores y colores de Bolivia.",
    },
  ];

  const menuItems = [
    {
      name: "Salteña Paceña",
      description:
        "Empanada jugosa rellena de pollo, papa, guisantes y especias tradicionales.",
      price: "25 Bs",
      emoji: "🥟",
    },
    {
      name: "Pique Macho",
      description:
        "Carne de res, salchicha, papa frita, tomate, cebolla y ají amarillo.",
      price: "45 Bs",
      emoji: "🍖",
    },
    {
      name: "Sopa de Maní",
      description: "Sopa cremosa de maní con carne, papa y verduras frescas.",
      price: "30 Bs",
      emoji: "🍲",
    },
    {
      name: "Llajua Picante",
      description:
        "Salsa tradicional boliviana con tomate, locoto y hierba buena.",
      price: "15 Bs",
      emoji: "🌶️",
    },
    {
      name: "Api con Pastel",
      description: "Bebida caliente de maíz morado acompañada de pastel frito.",
      price: "20 Bs",
      emoji: "☕",
    },
    {
      name: "Charque Kan",
      description: "Carne seca deshilachada con papa, chuño y ají colorado.",
      price: "40 Bs",
      emoji: "🥩",
    },
  ];

  return (
    <div style={styles.container}>
      <header
        style={{
          ...styles.header,
          backgroundColor: isScrolled ? "#000000dd" : "#000000",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
        }}
      >
        <div style={styles.logo}>KUSINA BOLIVIANA</div>
        <nav style={styles.nav}>
          <a href="#inicio" style={styles.navLink}>
            Inicio
          </a>
          <a href="#menu" style={styles.navLink}>
            Menú
          </a>
          <a href="#nosotros" style={styles.navLink}>
            Nosotros
          </a>
          <a href="#contacto" style={styles.navLink}>
            Contacto
          </a>
          <Link to="/login" style={styles.navLink}>
            login
          </Link>
          <Menu size={24} style={{ color: "#ff6b35", cursor: "pointer" }} />
        </nav>
      </header>

      <section id="inicio" style={styles.hero}>
        <div style={styles.decorativeElements}>
          <div
            style={{
              ...styles.circle,
              width: "300px",
              height: "300px",
              backgroundColor: "#ff6b35",
              top: "10%",
              left: "10%",
            }}
          />
          <div
            style={{
              ...styles.circle,
              width: "200px",
              height: "200px",
              backgroundColor: "#ff8c42",
              bottom: "20%",
              right: "15%",
            }}
          />
          <div
            style={{
              ...styles.circle,
              width: "150px",
              height: "150px",
              backgroundColor: "#ff6b35",
              top: "60%",
              left: "70%",
            }}
          />
        </div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Sabores de Bolivia</h1>
          <p style={styles.heroSubtitle}>
            Auténtica cocina boliviana en el corazón de La Paz
          </p>
          <button
            style={{
              ...styles.ctaButton,
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.backgroundColor = "#ff8c42";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#ff6b35";
            }}
          >
            Ver Menú
          </button>
        </div>
      </section>

      <section id="nosotros" style={styles.section}>
        <h2 style={styles.sectionTitle}>¿Por qué elegirnos?</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                ...styles.featureCard,
                borderColor: hoveredCard === index ? "#ff6b35" : "transparent",
                transform:
                  hoveredCard === index ? "translateY(-10px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={{ marginBottom: "1rem", color: "#ffffff" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#cccccc", lineHeight: "1.6" }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="menu" style={styles.section}>
        <h2 style={styles.sectionTitle}>Nuestro Menú</h2>
        <div style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.menuItem,
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={styles.menuImage}>
                <span style={{ fontSize: "4rem" }}>{item.emoji}</span>
              </div>
              <div style={styles.menuContent}>
                <h3 style={styles.menuTitle}>{item.name}</h3>
                <p style={styles.menuDescription}>{item.description}</p>
                <div style={styles.menuPrice}>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" style={styles.contact}>
        <h2 style={styles.sectionTitle}>Visítanos</h2>
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <MapPin size={20} style={{ color: "#ff6b35" }} />
            <span>Calle Sagárnaga 123, La Paz</span>
          </div>
          <div style={styles.contactItem}>
            <Clock size={20} style={{ color: "#ff6b35" }} />
            <span>Lun-Dom: 8:00 - 22:00</span>
          </div>
          <div style={styles.contactItem}>
            <Phone size={20} style={{ color: "#ff6b35" }} />
            <span>+591 2 123-4567</span>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>&copy; 2025 Kusina Boliviana. Todos los derechos reservados.</p>
        <p style={{ marginTop: "0.5rem" }}>
          Sabores auténticos, tradición boliviana 🇧🇴
        </p>
      </footer>
    </div>
  );
};

export default BolivianRestaurant;
