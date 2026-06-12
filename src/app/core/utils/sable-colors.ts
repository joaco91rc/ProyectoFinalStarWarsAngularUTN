export interface SableColorTheme {
  color: string;   // hex principal
  rgb: string;     // "r, g, b" para los rgba()
  hover: string;   // segundo color del gradiente de hover
}

const TEMA_DEFAULT: SableColorTheme = {
  color: '#00d4ff',
  rgb: '0, 212, 255',
  hover: '#0066ff',
};

const TEMAS: Record<string, SableColorTheme> = {
  verde:    { color: '#39ff14', rgb: '57, 255, 20',   hover: '#00a838' },
  azul:     { color: '#00d4ff', rgb: '0, 212, 255',   hover: '#0066ff' },
  rojo:     { color: '#ff3131', rgb: '255, 49, 49',   hover: '#8b0000' },
  purpura:  { color: '#c84cff', rgb: '200, 76, 255',  hover: '#6a0dad' },
  violeta:  { color: '#c84cff', rgb: '200, 76, 255',  hover: '#6a0dad' },
  amarillo: { color: '#ffd700', rgb: '255, 215, 0',   hover: '#ff8c00' },
  blanco:   { color: '#f5f5f5', rgb: '245, 245, 245', hover: '#9aa7c7' },
  naranja:  { color: '#ff8c00', rgb: '255, 140, 0',   hover: '#ff3131' },
  negro:    { color: '#8b00ff', rgb: '139, 0, 255',   hover: '#1a1a2e' }, // darksaber vibes
};

export function getTemaSable(color?: string): SableColorTheme {
  if (!color) return TEMA_DEFAULT;

  const clave = color
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // 1º intento: match exacto ("verde", "azul"...)
  if (TEMAS[clave]) return TEMAS[clave];

  // 2º intento: el nombre contiene algún color conocido
  // ("rojo sangrado corrupto" → contiene "rojo")
  const encontrada = Object.keys(TEMAS).find(k => clave.includes(k));
  return encontrada ? TEMAS[encontrada] : TEMA_DEFAULT;
}