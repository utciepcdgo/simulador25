import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    // Puedes descomentar y ajustar la configuración del servidor si es necesario
    // server: {
    //     port: 3000,
    // },
});