const colors = {
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    lightGrey: (opacity = 1) => `rgba(238, 238, 238, ${opacity})`,
    grey: (opacity = 1) => `rgba(109, 125, 154, ${opacity})`,
    brown: (opacity = 1) => `rgba(148, 108, 82, ${opacity})`,
    blue: (opacity = 1) => `rgba(53, 88, 225, ${opacity})`,
    darkModeBlack: (opacity = 1) => `rgba(27, 27, 27, ${opacity})`,
    darkModeBlue: (opacity = 1) => `rgba(146, 156, 241, ${opacity})`,
    darkModeWhite: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
}
export default colors