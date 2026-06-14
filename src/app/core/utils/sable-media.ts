const empunaduraImageMap: Record<string, string> = {
  'Empuñadura Anakin':        'assets/img/creacion/empunaduras/jedis/empunaduraAnakin.png',
  'Empuñadura Ahsoka':        'assets/img/creacion/empunaduras/jedis/empunaduraAsooka.png',
  'Empuñadura Luke':          'assets/img/creacion/empunaduras/jedis/empunaduraLuke.png',
  'Empuñadura Obi Wan':       'assets/img/creacion/empunaduras/jedis/empunaduraObiWan.png',
  'Empuñadura Qui Gon':       'assets/img/creacion/empunaduras/jedis/empunaduraQuiGon.png',
  'Empuñadura Yoda':          'assets/img/creacion/empunaduras/jedis/empunaduraYoda.png',
  'Empuñadura Windu':         'assets/img/creacion/empunaduras/jedis/empunaduraWindu.png',
  'Empuñadura Darth Bane':    'assets/img/creacion/empunaduras/siths/empunaduraDarthBane.png',
  'Empuñadura Darth Maul':    'assets/img/creacion/empunaduras/siths/empunaduraDarthMaul.png',
  'Empuñadura Darth Revan':   'assets/img/creacion/empunaduras/siths/empunaduraDarthRevan.png',
  'Empuñadura Darth Sidious': 'assets/img/creacion/empunaduras/siths/empunaduraDarthSidious.png',
  'Empuñadura Darth Vader':   'assets/img/creacion/empunaduras/siths/empunaduraDarthVader.png',
  'Empuñadura Dooku':         'assets/img/creacion/empunaduras/siths/empunaduraDooku.png',
  'Empuñadura Kylo Ren':      'assets/img/creacion/empunaduras/siths/empunaduraKyloRen.png',
};

const cristalImageMap: Record<string, string> = {
  'Kyber Azul':                    'assets/img/creacion/cristales/kyberAzul.png',
  'Kyber Verde':                   'assets/img/creacion/cristales/kyberVerde.png',
  'Kyber Purpura':                 'assets/img/creacion/cristales/kyberPurpura.png',
  'Kyber Amarillo':                'assets/img/creacion/cristales/kyberAmarillo.png',
  'Kyber Rojo Sangrado Sintetico': 'assets/img/creacion/cristales/kyberRojoSintetico.png',
  'Kyber Rojo Sangrado Comun':     'assets/img/creacion/cristales/kyberRojoSangrado.png',
  'Kyber Rojo Sangrado Antiguo':   'assets/img/creacion/cristales/kyberRojoAntiguo.png',
  'Kyber Rojo Sangrado Corrupto':  'assets/img/creacion/cristales/kyberRojoCorrupto.png',
};

export function getEmpunaduraImagen(nombre: string): string {
  return empunaduraImageMap[nombre] ?? 'assets/img/creacion/empunaduras/default.png';
}

export function getCristalImagen(nombre: string): string {
  return cristalImageMap[nombre.trim()] ?? 'assets/img/creacion/cristales/default.png';
}