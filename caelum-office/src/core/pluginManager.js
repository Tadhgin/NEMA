const plugins = [];

export const loadPlugin = (pluginName) => {
    plugins.push(pluginName);
    console.log(`Plugin loaded: ${pluginName}`);
};

export const listPlugins = () => {
    return plugins;
};