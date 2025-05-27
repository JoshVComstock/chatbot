export const ConfigPanel = ({ isOpen, onClose, restaurant, setRestaurant }) => {
  if (!isOpen) return null;

  const handleChangeName = (e) => {
    setRestaurant({ ...restaurant, name: e.target.value });
  };

  const handleChangeWelcomeMessage = (e) => {
    setRestaurant({ ...restaurant, welcomeMessage: e.target.value });
  };

  const handleChangeSpecialOffer = (e) => {
    setRestaurant({ ...restaurant, specialOffer: e.target.value });
  };

  const handleAddMenuItem = () => {
    const newMenu = [
      ...restaurant.menu,
      { name: "", price: "", description: "" },
    ];
    setRestaurant({ ...restaurant, menu: newMenu });
  };

  const handleUpdateMenuItem = (index, field, value) => {
    const newMenu = [...restaurant.menu];
    newMenu[index][field] = value;
    setRestaurant({ ...restaurant, menu: newMenu });
  };

  const handleRemoveMenuItem = (index) => {
    const newMenu = restaurant.menu.filter((_, i) => i !== index);
    setRestaurant({ ...restaurant, menu: newMenu });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#FF6B35",
          color: "white",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          onClick={onClose}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        >
          <ChevronLeft size={20} color="white" />
        </div>
        <h3 style={{ margin: 0, fontSize: "16px" }}>
          Configuración del Chatbot
        </h3>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Nombre del Restaurante
          </label>
          <input
            type="text"
            value={restaurant.name}
            onChange={handleChangeName}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Mensaje de Bienvenida
          </label>
          <textarea
            value={restaurant.welcomeMessage}
            onChange={handleChangeWelcomeMessage}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              height: "80px",
              resize: "none",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Oferta Especial
          </label>
          <textarea
            value={restaurant.specialOffer}
            onChange={handleChangeSpecialOffer}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              height: "60px",
              resize: "none",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "15px" }}>
              Menú del Restaurante
            </h4>
            <button
              onClick={handleAddMenuItem}
              style={{
                backgroundColor: "#FF6B35",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Añadir Plato
            </button>
          </div>

          {restaurant.menu.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h5 style={{ margin: 0, fontSize: "14px" }}>
                  Plato #{index + 1}
                </h5>
                <button
                  onClick={() => handleRemoveMenuItem(index)}
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>

              <div style={{ marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Nombre del plato"
                  value={item.name}
                  onChange={(e) =>
                    handleUpdateMenuItem(index, "name", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) =>
                    handleUpdateMenuItem(index, "price", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    marginBottom: "6px",
                  }}
                />
              </div>

              <div>
                <textarea
                  placeholder="Descripción del plato"
                  value={item.description}
                  onChange={(e) =>
                    handleUpdateMenuItem(index, "description", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    height: "60px",
                    resize: "none",
                    fontSize: "13px",
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