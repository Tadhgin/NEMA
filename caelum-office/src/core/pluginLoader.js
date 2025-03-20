const plugins = [];

// Load all plugins in the plugins directory
export const loadPlugins = () => {
  try {
    const context = require.context('../plugins', false, /\.js$/);

    context.keys().forEach((key) => {
      const plugin = context(key).default;
      plugins.push(plugin);
      console.log(`Plugin loaded: ${plugin.name}`);
    });
  } catch (error) {
    console.error('Failed to load plugins:', error);
  }
};

// Load a specific plugin by name
export const loadPlugin = (pluginName) => {
  try {
    const context = require.context('../plugins', false, /\.js$/);
    const pluginPath = `./${pluginName}.js`;

    if (context.keys().includes(pluginPath)) {
      const plugin = context(pluginPath).default;
      plugins.push(plugin);
      console.log(`Plugin loaded: ${plugin.name}`);
    } else {
      console.warn(`Plugin not found: ${pluginName}`);
    }
  } catch (error) {
    console.error(`Failed to load plugin: ${pluginName}`, error);
  }
};