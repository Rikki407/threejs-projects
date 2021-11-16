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
                main: path.resolve(__dirname, 'projects/index.html'),
            },
        },
    },
};
