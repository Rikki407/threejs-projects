const { resolve } = require('path');

module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                projects: resolve(__dirname, 'projects/custom-chairs/index.html'),
            },
        },
    },
};
