import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
function viteMockDevServer(){
    // console.log("mock");
    return mockDevServerPlugin()
}
export default viteMockDevServer