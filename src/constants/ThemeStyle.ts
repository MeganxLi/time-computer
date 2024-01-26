// Ant Design Token
const color_variables = {
  primary: "#5f5f5f",
  secondary: "#ac9999",
  secondary_transparency: "rgba(172, 153, 153, 0.6)"

}

export const time_picker_style = { height: 40 }

export const time_picker_theme = {
  components: {
    token: {
      cellHeight: 100
    },
    DatePicker: {
      colorPrimary: color_variables.secondary,
      algorithm: true, //啟用算法
      colorLink: color_variables.secondary,
      colorLinkActive: color_variables.primary,
      colorLinkHover: color_variables.primary,
    },
    Button: {
      colorPrimary: color_variables.secondary,
      colorPrimaryHover: color_variables.primary,
      colorPrimaryActive: color_variables.primary
    },
  },
}