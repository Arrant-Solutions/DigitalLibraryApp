declare module '@env' {
  export const APP_BASE_URL: string
  export const APP_COUNTRIES_API: string
  export const APP_UNSPLASH_ACCESS_SECRET: string
  export const APP_UNSPLASH_ACCESS_KEY: string
  export const APP_UNSPLASH_ACCESS_URL: string
}

// interface ProgressBar {
//   animated?: boolean
//   indeterminate?: boolean
//   indeterminateAnimationDuration?: number
//   progress?: number
//   color?: string
//   unfilledColor?: string
//   borderWidth?: number
//   borderColor?: string
// }

// interface AnimationConfig {
//   bounciness: number
// }

// interface Pie {
//   size?: number
// }

// interface CircleI {
//   thickness?: string
//   strokeCap?: 'butt' | 'square' | 'round'
// }
// interface Circle {
//   endAngle?: number
//   showsText?: boolean
//   formatText?: (progress) => string
//   textStyle?: TextStyle
//   allowFontScaling?: boolean
//   direction?: 'clockwise' | 'counter-clockwise'
//   fill?: string
// }

// interface CircleSnail {
//   animating?: boolean
//   hidesWhenStopped?: boolean
//   color?: string
//   duration?: number
//   spinDuration?: number
// }
// declare module 'react-native-progressbar' {
//   export const Bar: React.ComponentType<
//     ProgressBar & {
//       width?: number
//       height?: number
//       borderRadius?: number
//       useNativeDriver?: boolean
//       animationConfig?: AnimationConfig
//       animationType?: 'decay' | 'timing' | 'spring'
//     }
//   >
//   export const Pie: React.ComponentType<ProgressBar & Pie>
//   export const Circle: React.ComponentType<ProgressBar & Pie & Circle & CircleI>
//   export const CircleSnail: React.ComponentType<
//     ProgressBar & Pie & CircleSnail & CircleI
//   >
// }

