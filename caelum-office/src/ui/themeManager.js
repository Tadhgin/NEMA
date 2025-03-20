export const themes = {

    dark: { background: "#222", text: "#fff" },

    light: { background: "#fff", text: "#000" },

};



export const applyTheme = (theme) => {

    return themes[theme] || themes.light;

};