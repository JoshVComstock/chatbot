import React, { useState } from "react";
import { 
  FormContainer, 
  FormHeader, 
  FormTitle, 
  FormSection, 
  SectionTitle, 
  FormGroup, 
  Label, 
  Input, 
  TextArea, 
  PrimaryButton, 
  SecondaryButton, 
  CheckboxContainer, 
  Checkbox, 
  CheckboxLabel,
  PlatoCard,
  PlatosList,
  PlatoItem,
  PlatoTitle,
  PlatoDescription,
  Badge,
  FormFooter,
  PlatoHeader,
  PlatoActions,
  DeleteButton,
  FormGrid,
  FormColumn
} from "./style";

const RestauranteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    pagina_web: "",
    tipo_cocina: "",
    platos_estrella: [],
    rango_precios: "",
    estilo: "",
    servicios: [],
  });

  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    vegano: false,
    popular: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNuevoPlatoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoPlato((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const agregarPlato = () => {
    if (!nuevoPlato.nombre) {
      alert("El nombre del plato es obligatorio");
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      platos_estrella: [...prev.platos_estrella, { ...nuevoPlato, id: Date.now() }],
    }));
    
    setNuevoPlato({
      nombre: "",
      descripcion: "",
      precio: "",
      vegano: false,
      popular: false,
    });
  };
  
  const eliminarPlato = (id) => {
    setFormData((prev) => ({
      ...prev,
      platos_estrella: prev.platos_estrella.filter((plato) => plato.id !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosEnviar = {
      restaurante: {
        informacion_basica: {
          nombre: formData.nombre,
          direccion: formData.direccion,
          telefono: formData.telefono,
          pagina_web: formData.pagina_web,
        },
        menu: {
          tipo_cocina: formData.tipo_cocina,
          platos_estrella: formData.platos_estrella,
          menu_infantil: true,
        },
        precios_promociones: {
          rango_precios: formData.rango_precios,
          promociones: [],
        },
        ambiente_servicios: {
          estilo: formData.estilo,
          servicios: formData.servicios,
        },
      },
    };

    try {
      const res = await fetch("https://localhost:3000/restaurantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEnviar),
      });

      const data = await res.json();
      alert("¡Restaurante registrado con éxito!");
      console.log(data);
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error al registrar el restaurante. Intente nuevamente.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>Registro de Restaurante</FormTitle>
      </FormHeader>

      <FormSection>
        <SectionTitle>Información Básica</SectionTitle>
        <FormGrid>
          <FormColumn>
            <FormGroup>
              <Label htmlFor="nombre">Nombre del Restaurante*</Label>
              <Input 
                id="nombre"
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange}
                placeholder="Ej: La Buena Mesa"
                required
              />
            </FormGroup>
          
            <FormGroup>
              <Label htmlFor="telefono">Teléfono de Contacto*</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: +591 68485785"
                required
              />
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label htmlFor="direccion">Dirección Completa*</Label>
              <Input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ej: America y libertador"
                required
              />
            </FormGroup>
          
            <FormGroup>
              <Label htmlFor="pagina_web">Página Web</Label>
              <Input
                id="pagina_web"
                name="pagina_web"
                value={formData.pagina_web}
                onChange={handleChange}
                placeholder="Ej: www.mirestaurante.com"
              />
            </FormGroup>
          </FormColumn>
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Menú y Especialidades</SectionTitle>
        
        <FormGroup>
          <Label htmlFor="tipo_cocina">Tipo de Cocina*</Label>
          <Input
            id="tipo_cocina"
            name="tipo_cocina"
            value={formData.tipo_cocina}
            onChange={handleChange}
            placeholder="Ej: Cochabambina."
            required
          />
        </FormGroup>

        <FormSection>
          <SectionTitle>Platos Estrella</SectionTitle>
          
          {formData.platos_estrella.length > 0 && (
            <PlatosList>
              {formData.platos_estrella.map((plato) => (
                <PlatoItem key={plato.id}>
                  <PlatoCard>
                    <PlatoHeader>
                      <PlatoTitle>{plato.nombre}</PlatoTitle>
                      <PlatoActions>
                        <DeleteButton onClick={() => eliminarPlato(plato.id)}>×</DeleteButton>
                      </PlatoActions>
                    </PlatoHeader>
                    <PlatoDescription>{plato.descripcion}</PlatoDescription>
                    {plato.precio && <Badge>Bs{plato.precio}</Badge>}
                    {plato.vegano && <Badge color="green">Vegano</Badge>}
                    {plato.popular && <Badge color="orange">Popular</Badge>}
                  </PlatoCard>
                </PlatoItem>
              ))}
            </PlatosList>
          )}
          
          <FormGroup>
            <Label htmlFor="plato_nombre">Agregar Nuevo Plato</Label>
            <Input
              id="plato_nombre"
              name="nombre"
              placeholder="Nombre del plato"
              value={nuevoPlato.nombre}
              onChange={handleNuevoPlatoChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="plato_descripcion">Descripción</Label>
            <TextArea
              id="plato_descripcion"
              name="descripcion"
              placeholder="Breve descripción del plato"
              value={nuevoPlato.descripcion}
              onChange={handleNuevoPlatoChange}
              rows="3"
            />
          </FormGroup>
          
          <FormGrid>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="plato_precio">Precio (Bs)</Label>
                <Input
                  id="plato_precio"
                  name="precio"
                  type="number"
                  placeholder="0.00"
                  value={nuevoPlato.precio}
                  onChange={handleNuevoPlatoChange}
                />
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <CheckboxContainer>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      name="vegano"
                      checked={nuevoPlato.vegano}
                      onChange={handleNuevoPlatoChange}
                    />
                    Vegano
                  </CheckboxLabel>
                  
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      name="popular"
                      checked={nuevoPlato.popular}
                      onChange={handleNuevoPlatoChange}
                    />
                    Popular
                  </CheckboxLabel>
                </CheckboxContainer>
              </FormGroup>
            </FormColumn>
          </FormGrid>
          
          <SecondaryButton type="button" onClick={agregarPlato}>
            Agregar Plato
          </SecondaryButton>
        </FormSection>
      </FormSection>

      <FormSection>
        <SectionTitle>Precios y Ambiente</SectionTitle>
        
        <FormGrid>
          <FormColumn>
            <FormGroup>
              <Label htmlFor="rango_precios">Rango de Precios*</Label>
              <Input
                id="rango_precios"
                name="rango_precios"
                value={formData.rango_precios}
                onChange={handleChange}
                placeholder="Ej: 10Bs - 80bs"
                required
              />
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label htmlFor="estilo">Estilo del Local*</Label>
              <Input 
                id="estilo"
                name="estilo" 
                value={formData.estilo} 
                onChange={handleChange}
                placeholder="Ej: Elegante, Casual, Rústico, etc."
                required
              />
            </FormGroup>
          </FormColumn>
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Servicios Adicionales</SectionTitle>
        
        <CheckboxContainer>
          {["Reservas", "Wi-Fi gratuito", "Estacionamiento", "Comida para llevar", "Terraza", "Menú infantil", "Accesibilidad"].map(
            (servicio) => (
              <CheckboxLabel key={servicio}>
                <Checkbox
                  type="checkbox"
                  name="servicios"
                  value={servicio.toLowerCase()}
                  onChange={handleChange}
                  checked={formData.servicios.includes(servicio.toLowerCase())}
                />
                {servicio}
              </CheckboxLabel>
            )
          )}
        </CheckboxContainer>
      </FormSection>

      <FormFooter>
        <PrimaryButton type="submit">Registrar Restaurante</PrimaryButton>
      </FormFooter>
    </FormContainer>
  );
};

export default RestauranteForm;