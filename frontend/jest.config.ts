import type { Config } from 'jest';

const config: Config = {
  // Le dice a Jest que use ts-jest para "traducir" TypeScript sobre la marcha
  preset: 'ts-jest',
  
  // Como estamos testeando funciones lógicas puras por ahora, el entorno de Node es suficiente y más rápido
  testEnvironment: 'node',
  
  // Muestra un reporte detallado en la consola de cada test que se ejecuta
  verbose: true,
  
  // Opcional: Le dice a Jest qué carpetas ignorar para no perder tiempo buscando tests ahí
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;