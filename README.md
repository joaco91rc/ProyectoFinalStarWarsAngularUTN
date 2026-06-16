# ⚔️ Guardian's Forge

**Guardian's Forge** es una aplicación de gestión galáctica temática del universo Star Wars, desarrollada en Angular como Trabajo Final Integrador. Permite crear y gestionar personajes Jedi y Sith, forjar sables de luz personalizados, y administrar el sistema de créditos y rangos de la Fuerza.

---

## 🚀 Despliegue

La aplicación está desplegada en Vercel:  
🔗 [https://guardian-forge.vercel.app](https://guardian-forge.vercel.app)

Repositorio:  
🔗 [https://github.com/joaco91rc/ProyectoFinalStarWarsAngularUTN](https://github.com/joaco91rc/ProyectoFinalStarWarsAngularUTN)

---

## 🛠️ Tecnologías utilizadas

- Angular 19
- TypeScript
- RxJS (BehaviorSubject para estado reactivo)
- CSS puro con variables y animaciones
- Vercel para despliegue

---

## 📁 Estructura del proyecto

```
src/app/
├── core/
│   ├── models/          # Interfaces: Personaje, Sable
│   ├── services/        # PersonajesService, SablesService
│   └── utils/           # Lógica de midiclorianos, precios, colores, monedas
├── modules/
│   ├── inicio/          # Módulo de inicio con lazyload
│   ├── personajes/      # Módulo de personajes con lazyload
│   └── sables/          # Módulo de sables con lazyload
└── shared/
    └── components/
        ├── selector-carrusel/   # Modal selector genérico reutilizable
        └── avatar-picker/       # Selector de apariencia de personaje
```

---

## 📋 Equivalencias entre consigna y proyecto

La consigna requería una aplicación de gestión de **productos** y **usuarios**. En Guardian's Forge, estos conceptos se adaptaron al universo Star Wars de la siguiente manera:

### 🧑‍🚀 Usuarios → Personajes

| Consigna | Guardian's Forge |
|---|---|
| Nombre | Nombre del personaje (ej: Luke Skywalker) |
| Correo electrónico | Canal Holonet — dirección de comunicación galáctica con formato `usuario@holonet.gal` o `usuario@imperio.gal` según la facción. Es el equivalente Star Wars al correo electrónico institucional |
| Rol | Rango en la Fuerza — calculado automáticamente según los midiclorianos del personaje (Padawan, Caballero Jedi, Maestro Jedi, Gran Maestro, Darth, Señor Sith, etc.) |
| Estado activo/inactivo | Sistema de **personaje activo** — ver sección detallada abajo |
| Ver detalle | `/personajes/detalle/:id` |
| Eliminar | Modal de confirmación temático con efecto glassmorphism |
| Cambiar estado | Botón "Activar" en cada card |

#### 🔄 Estado activo/inactivo — Personaje Activo

La consigna requería poder cambiar el estado de un usuario entre activo e inactivo. En Guardian's Forge este concepto se implementó mediante el sistema de **personaje activo**, que va más allá de un simple campo de estado:

- En todo momento existe un único personaje activo en el sistema, visible permanentemente en el sidebar
- Cualquier personaje puede ser activado desde la lista mediante el botón "Activar"
- Al activar un personaje, el anterior queda inactivo implícitamente — solo puede haber un operador activo a la vez
- El personaje activo es el único que puede **comprar sables** en la armería, **participar en el minijuego** de reflejos y **acumular o perder créditos galácticos**
- El estado activo se gestiona de forma reactiva mediante un `BehaviorSubject` en `PersonajesService`, lo que permite que cualquier componente de la app reaccione en tiempo real al cambio de personaje activo
- Si el personaje activo es eliminado, el sistema activa automáticamente el siguiente personaje disponible

Este enfoque es funcionalmente equivalente al requisito de activar/desactivar usuarios, pero integrado de forma coherente con la narrativa del universo Star Wars.

---

### ⚔️ Productos → Sables de Luz

| Consigna | Guardian's Forge |
|---|---|
| Título | Nombre del sable (ej: Sable de Luke Skywalker) |
| Precio | Precio en créditos galácticos o créditos del Imperio, calculado dinámicamente por el poder del cristal Kyber y la empuñadura elegida. Los Sith pagan un 15% de recargo por el mercado negro |
| Descripción | Historia y lore del sable, más datos técnicos: cristal, facción, empuñadura y tipo de hoja |
| Descuento (opcional) | Descuento aplicado automáticamente según el rango del personaje activo al momento de la compra. Un Gran Maestro Jedi obtiene mayor descuento que un Padawan |
| Ver detalle | `/sables/detalle/:id` con vista inmersiva, carrusel de 3 slides y efecto de nebulosa dinámica |
| Eliminar | Modal de confirmación temático |

#### 🔗 Sable asignado al personaje — Estado activo del producto

La consigna contempla la posibilidad de establecer un producto como activo o inactivo. En Guardian's Forge este concepto se implementó mediante la **asignación de sable al personaje activo**:

- Desde el detalle del personaje, el personaje activo puede **comprar y asignarse un sable** de la armería
- Una vez asignado, ese sable queda vinculado al personaje y se considera su arma activa
- Si el personaje vende o cambia su sable, el anterior queda desvinculado — equivalente a desactivar el producto
- El precio de compra se calcula con el descuento correspondiente al rango del personaje, incentivando el progreso dentro del sistema

---

## 🗂️ Módulos

### Módulo Inicio `/`
Pantalla principal con:
- Mensaje de bienvenida a la Forja
- **Estadísticas galácticas** en tiempo real: cantidad de sables forjados, personajes registrados, cristal Kyber más usado y planeta natal más poblado — los íconos se actualizan dinámicamente según el dato
- **Guía de uso** en 4 pasos: forjar sable, registrar personaje, comprar con descuento y entrenar reflejos
- **Minijuego de reflejos** — entrenamiento Jedi: el personaje activo debe reaccionar a la señal verde. Ganar otorga créditos galácticos; adelantarse o fallar los descuenta. Sin personaje activo, el minijuego está deshabilitado

### Módulo Personajes `/personajes`
- Lista de personajes con avatar, rango, lado de la Fuerza, especie, planeta y créditos
- Formulario de creación con selector de apariencia tipo RPG (18 personajes icónicos filtrados por facción), test de midiclorianos animado que determina el rango automáticamente, selector de planeta natal y canal Holonet
- Detalle de personaje con estadísticas completas y opción de compra de sable
- Acciones: Ver detalle, Activar, Eliminar

### Módulo Sables `/sables`
- Lista de sables con carrusel de 3 slides por card: imagen del sable, empuñadura y cristal Kyber
- Forja de sables: el usuario elige facción, cristal Kyber y empuñadura. El sistema determina automáticamente el tipo de hoja, el color, el poder y el precio. Los Sith siempre usan cristales sangrados rojos; los Jedi usan cristales de luz. La vista previa del sable se actualiza en tiempo real
- Vista previa inteligente: los sables Sith muestran hoja doble (Darth Maul), curva (Dooku, Darth Bane), crossguard (Kylo Ren) o simple según la empuñadura elegida
- Detalle de sable con carrusel, efecto de nebulosa dinámica coloreada según el cristal y estadísticas técnicas
- Acciones: Ver detalle, Eliminar

---

## 🧬 Lógica de negocio destacada

### Cálculo de rango por midiclorianos
El test de midiclorianos genera un valor aleatorio con animación de "análisis de sangre". Según el resultado y la facción, el sistema asigna automáticamente un rango (Padawan, Caballero, Maestro, etc.) con su color, descripción y porcentaje de descuento en la armería.

### Cálculo de precio del sable
```
precio = poder_cristal × multiplicador_empuñadura × 8 créditos/punto × recargo_facción
```
Cada cristal tiene un poder base y cada empuñadura un multiplicador. Los Sith pagan 15% más. El resultado se redondea a centenas.

### Sistema de créditos
Cada personaje tiene créditos en la moneda de su facción (Créditos de la República para Jedi, Créditos del Imperio para Sith). Los créditos se ganan o pierden en el minijuego y se gastan al comprar sables con el descuento del rango correspondiente.

### Cristales Kyber exclusivos
- **Jedi**: Azul, Verde, Amarillo, Púrpura (solo rangos altos: Maestro Jedi, Gran Maestro, Elegido de la Fuerza)
- **Sith**: Rojo Sangrado Sintético, Común, Antiguo y Corrupto — todos los cristales Sith son versiones "sangradas" del kyber original

---

## ▶️ Instalación y ejecución local

```bash
git clone https://github.com/joaco91rc/ProyectoFinalStarWarsAngularUTN
cd ProyectoFinalStarWarsAngularUTN
npm install
ng serve
```

Abrí `http://localhost:4200` en el navegador.
