export const defaultTheme = {
  token: {
    fontFamily: 'var(--font-plain)',
    colorSuccess: 'var(--color-success)',
    colorWarning: 'var(--color-warning)',
    colorPrimary: 'var(--color-primary)',
    colorInfo: 'var(--color-info)',
    colorError: 'var(--color-danger)',
    colorTextBase: 'var(--color-default)',
    colorBgBase: '#edf2f9',
    colorBgElevated: 'white',
    colorBgContainer: '#fbfbfb',
    wireframe: true,
    borderRadius: 5,
    colorBorder: 'var(--color-gray-25)',
  },
  components: {
    Modal: {
      colorSplit: 'transparent',
      colorSuccess: 'var(--color-success)',
      colorPrimary: 'var(--color-primary)',
    },
    Button: {
      colorPrimary: 'var(--color-primary)',
      controlOutline: 'rgba(5, 145, 255, 0.1)',
      colorPrimaryHover: '#4096ff',
      colorPrimaryActive: '#2f6bff',
      colorPrimaryBorder: '#0958d9',
    },
    Form: {
      fontSize: 'var(--font-size-base)',
    },
  },
}
