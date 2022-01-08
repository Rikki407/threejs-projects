import path from 'path';

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, '/index.html'),
                customchair: path.resolve(__dirname, 'projects/custom-chairs/index.html'),
                plane: path.resolve(__dirname, 'projects/plane/index.html'),
                sphere: path.resolve(__dirname, 'projects/sphere/index.html'),
                shootout: path.resolve(__dirname, 'projects/shootout/index.html'),
            },
        },
    },
};
