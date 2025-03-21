export const loadModule = async (moduleName) => {

    try {
        const module = await import(`../modules/${moduleName}.js`);
        return module.default;
    } catch (error) {
        console.error(`Module "${moduleName}" could not be loaded.`, error);
        return null;
    }
};