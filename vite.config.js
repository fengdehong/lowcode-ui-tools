import {defineConfig, loadEnv} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'

// https://vitejs.dev/config/
export default ({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: 5173,
            proxy: {
                '^/request-api': {
                    // target: 'http://192.168.6.25:8080',
                    target: env.VITE_APP_BASE_API,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/request-api/, "")
                },
            }
        },
        build: {
            lib: {
                // Could also be a dictionary or array of multiple entry points
                entry: resolve(__dirname, 'src/components/index.js'),
                name: 'fen-lowcode-ui-form',
                // the proper extensions will be added
                fileName: 'fen-lowcode-ui-form',
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue',
                    },
                },
            },
        },
    })
}
