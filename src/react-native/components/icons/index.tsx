import React from 'react'
import Svg, { Path, G, Rect, Circle, Defs, ClipPath, Line } from 'react-native-svg'

export interface IconProps {
  color?: string
  size?: number
  className?: string
  onPress?: () => void
}

export const ArrowIcon: React.FC<IconProps> = ({
  color = 'white',
  size = 14,
  onPress
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 9 14'
      fill='none'
      onPress={onPress}
      color={color}
    >
      <Path
        d='M7.29297 0.292893C7.68349 -0.0976311 8.31651 -0.0976311 8.70703 0.292893C9.09756 0.683418 9.09756 1.31643 8.70703 1.70696L3.41406 6.99992L8.70703 12.2929L8.77539 12.3691C9.09574 12.7618 9.07315 13.3408 8.70703 13.707C8.34092 14.0731 7.76191 14.0957 7.36914 13.7753L7.29297 13.707L0.585938 6.99992L7.29297 0.292893Z'
        fill={color}
      />
    </Svg>
  )
}

export const CopyIcon: React.FC<IconProps> = ({
  color = 'white',
  size = 16,
  onPress
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      onPress={onPress}
      color={color}
    >
      <G clipPath='url(#clip0_3876_6767)'>
        <G clipPath='url(#clip1_3876_6767)'>
          <G clipPath='url(#clip2_3876_6767)'>
            <Path
              d='M11.4512 10.5645H5.28516V1.75586H9.32335L11.4512 3.88369V10.5645ZM12.332 3.51758L9.68945 0.875H5.28516H4.4043V1.75586V10.5645V11.4453H5.28516H11.4512H12.332V10.5645V3.51758ZM0.880859 4.39844H0V5.2793V14.0879V14.9688H0.880859H7.04688H7.92773V14.0879V12.3262H7.04688V14.0879H0.880859V5.2793H3.52344V4.39844H0.880859Z'
              fill={color}
            />
          </G>
        </G>
      </G>
      <Defs>
        <ClipPath id='clip0_3876_6767'>
          <Rect width='16' height='16' fill='white' />
        </ClipPath>
        <ClipPath id='clip1_3876_6767'>
          <Rect width='16' height='14.25' fill='white' transform='translate(0 0.875)' />
        </ClipPath>
        <ClipPath id='clip2_3876_6767'>
          <Rect width='12.332' height='14.0938' fill='white' transform='translate(0 0.875)' />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const SuccessIcon: React.FC<IconProps> = ({
  color = '#1CC400',
  size = 18,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Circle cx='9' cy='9' r='9' fill={color} fillOpacity='.2' />
    <Path d='M5 8.5L8 11.5L13.5 6' stroke={color} strokeWidth='2' strokeLinecap='round' />
  </Svg>
)

export const ErrorIcon: React.FC<IconProps> = ({
  color = '#F45858',
  size = 18,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 18 18'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Rect width='18' height='18' rx='4' fill={color} fillOpacity='.2' />
    <Path d='M9.06951 10L9.0695 4.86092' stroke={color} strokeWidth='2' strokeLinecap='round' />
    <Path d='M9.06951 13L9.06951 13.0102' stroke={color} strokeWidth='2' strokeLinecap='round' />
  </Svg>
)

export const CheckIcon: React.FC<IconProps> = ({
  color = '#4C7EFF',
  size = 20,
  onPress
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      onPress={onPress}
    >
      <Circle
        cx='10'
        cy='10'
        r='10'
        fill='rgba(12, 28, 51, 0.05)'
      />
      <Path
        d='M6.33 10L8.83 12.5L13.67 7.67'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const CrossIcon: React.FC<IconProps> = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => (
  <Svg
    width={size}
    height={(size * 17) / 16}
    viewBox='0 0 16 17'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M13.5693 3.40266L13.0973 2.93066L8 8.02866L2.90266 2.93066L2.43066 3.40266L7.52866 8.5L2.43066 13.5973L2.90266 14.0693L8 8.97133L13.0973 14.0693L13.5693 13.5973L8.47133 8.5L13.5693 3.40266Z'
      fill={color}
    />
  </Svg>
)

export const PlusIcon: React.FC<IconProps> = ({
  color = '#4C7EFF',
  size = 17,
  onPress
}) => (
  <Svg
    width={size}
    height={(size * 16) / 17}
    viewBox='0 0 17 16'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M15.1667 7.66665H8.83337V1.33331H8.16671V7.66665H1.83337V8.33331H8.16671V14.6666H8.83337V8.33331H15.1667V7.66665Z'
      fill={color}
    />
  </Svg>
)

export const ChevronIcon: React.FC<IconProps> = ({
  color = '#0C1C33',
  size = 12,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 12 12'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M6 8.9395L1.65149 4.59099L2.18149 4.06049L6 7.879L9.8185 4.06049L10.3485 4.59099L6 8.9395Z'
      fill={color}
    />
  </Svg>
)

export const SearchIcon: React.FC<IconProps> = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M14.569 14.0977L10.6623 10.191C11.5815 9.14938 12.0591 7.79092 11.9941 6.40327C11.9292 5.01564 11.3267 3.70776 10.3143 2.75659C9.30178 1.80542 7.95892 1.28563 6.56994 1.30729C5.18095 1.32895 3.85492 1.89036 2.87264 2.87264C1.89036 3.85492 1.32895 5.18095 1.30729 6.56994C1.28563 7.95892 1.80542 9.30178 2.75659 10.3143C3.70776 11.3267 5.01564 11.9292 6.40327 11.9941C7.79092 12.0591 9.14938 11.5815 10.191 10.6623L14.0977 14.569L14.569 14.0977ZM6.66665 11.3333C5.74364 11.3333 4.84138 11.0596 4.07396 10.5468C3.30653 10.0341 2.70839 9.30518 2.35518 8.45245C2.00197 7.59978 1.90956 6.66145 2.08962 5.7562C2.26968 4.85095 2.71414 4.01943 3.36678 3.36678C4.01943 2.71414 4.85095 2.26968 5.7562 2.08962C6.66145 1.90956 7.59978 2.00197 8.45245 2.35518C9.30518 2.70839 10.0341 3.30653 10.5468 4.07396C11.0596 4.84138 11.3333 5.74364 11.3333 6.66665C11.3319 7.90385 10.8398 9.09005 9.96492 9.96492C9.09005 10.8398 7.90385 11.3319 6.66665 11.3333Z'
      fill={color}
    />
  </Svg>
)

export const InfoCircleIcon: React.FC<IconProps> = ({
  color = '#4C7EFF',
  size = 19,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 19 19'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <G clipPath='url(#clip0_1166_258)'>
      <Path
        d='M9.5 5.5H9.51ZM9.5 8.5V13.5ZM18.5 9.5C18.5 14.4706 14.4706 18.5 9.5 18.5C4.52944 18.5 0.5 14.4706 0.5 9.5C0.5 4.52944 4.52944 0.5 9.5 0.5C14.4706 0.5 18.5 4.52944 18.5 9.5Z'
        fill={color}
        fillOpacity='0.05'
      />
      <Path
        d='M18 9.5C18 4.80558 14.1945 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1945 4.80558 18 9.5 18C14.1945 18 18 14.1945 18 9.5ZM9 13.5V8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5ZM9.50977 5C9.78591 5 10.0098 5.22386 10.0098 5.5C10.0098 5.77614 9.78591 6 9.50977 6H9.5C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5H9.50977ZM19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 0 14.7467 0 9.5C0 4.2533 4.2533 0 9.5 0C14.7467 0 19 4.2533 19 9.5Z'
        fill={color}
      />
    </G>
    <Defs>
      <ClipPath id='clip0_1166_258'>
        <Rect width='19' height='19' fill='white' />
      </ClipPath>
    </Defs>
  </Svg>
)

export const EyeOpenIcon: React.FC<IconProps> = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => (
  <Svg
    width={size}
    height={(size * 10) / 16}
    viewBox='0 0 16 10'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M7.89888 0C6.24409 0.000806406 4.62351 0.471042 3.22533 1.35609C1.82715 2.24114 0.708743 3.50469 0 5C0.708092 6.49578 1.82635 7.75974 3.22468 8.64489C4.623 9.53004 6.24392 9.99999 7.89888 9.99999C9.55378 9.99999 11.1747 9.53004 12.573 8.64489C13.9713 7.75974 15.0896 6.49578 15.7977 5C15.089 3.50469 13.9706 2.24114 12.5724 1.35609C11.1742 0.471042 9.55364 0.000806406 7.89888 0ZM7.89888 8.98344C6.52084 8.97755 5.16914 8.60565 3.98212 7.90571C2.79509 7.20576 1.81538 6.20297 1.14327 5C1.81083 3.7931 2.78951 2.78709 3.97757 2.08654C5.16561 1.38601 6.51964 1.01653 7.89888 1.01653C9.27804 1.01653 10.6321 1.38601 11.8201 2.08654C13.0082 2.78709 13.9868 3.7931 14.6545 5C13.9823 6.20297 13.0026 7.20576 11.8156 7.90571C10.6285 8.60565 9.27689 8.97755 7.89888 8.98344ZM7.89888 2.51693C7.40772 2.51693 6.92767 2.66256 6.51934 2.93541C6.11101 3.20825 5.79274 3.59605 5.60481 4.0498C5.41687 4.50349 5.3677 5.00271 5.46351 5.48439C5.55932 5.96606 5.7958 6.4085 6.14306 6.7558C6.49033 7.10303 6.93275 7.33953 7.41443 7.43535C7.8961 7.53117 8.39533 7.48197 8.84909 7.29406C9.30277 7.10608 9.69059 6.78785 9.96342 6.3795C10.2362 5.97114 10.3819 5.4911 10.3819 5C10.3819 4.34146 10.1203 3.70989 9.65461 3.24421C9.189 2.77854 8.55742 2.51693 7.89888 2.51693ZM7.89888 6.46658C7.60878 6.46658 7.32525 6.38058 7.08407 6.21937C6.8429 6.05822 6.65492 5.82918 6.54392 5.56123C6.43291 5.29322 6.40387 4.99837 6.46045 4.7139C6.51704 4.42942 6.65675 4.16805 6.8618 3.96299C7.06693 3.75786 7.32823 3.61818 7.61271 3.5616C7.89726 3.50501 8.1921 3.53405 8.46011 3.64504C8.72806 3.75603 8.9571 3.94402 9.11825 4.18519C9.27939 4.42637 9.36546 4.7099 9.36546 5C9.36498 5.38884 9.21034 5.76161 8.93542 6.03654C8.66043 6.31146 8.28765 6.4661 7.89888 6.46658Z'
      fill={color}
    />
  </Svg>
)

export const EyeClosedIcon: React.FC<IconProps> = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => (
  <Svg
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='none'
    onPress={onPress}
    color={color}
  >
    <Path
      d='M7.89888 3C6.24409 3.00081 4.62351 3.47104 3.22533 4.35609C1.82715 5.24114 0.708743 6.50469 0 8C0.708092 9.49578 1.82635 10.7597 3.22468 11.6449C4.623 12.53 6.24392 13 7.89888 13C9.55378 13 11.1747 12.53 12.573 11.6449C13.9713 10.7597 15.0896 9.49578 15.7977 8C15.089 6.50469 13.9706 5.24114 12.5724 4.35609C11.1742 3.47104 9.55364 3.00081 7.89888 3ZM7.89888 11.9834C6.52084 11.9776 5.16914 11.6056 3.98212 10.9057C2.79509 10.2058 1.81538 9.20297 1.14327 8C1.81083 6.7931 2.78951 5.78709 3.97757 5.08654C5.16561 4.38601 6.51964 4.01653 7.89888 4.01653C9.27804 4.01653 10.6321 4.38601 11.8201 5.08654C13.0082 5.78709 13.9868 6.7931 14.6545 8C13.9823 9.20297 13.0026 10.2058 11.8156 10.9057C10.6285 11.6056 9.27689 11.9776 7.89888 11.9834Z'
      fill={color}
    />
    <Line x1='1' y1='15' x2='15' y2='1' stroke={color} strokeWidth='1.5' strokeLinecap='round' />
  </Svg>
)

// Export all icons as a collection
export const Icons = {
  ArrowIcon,
  CopyIcon,
  SuccessIcon,
  ErrorIcon,
  CheckIcon,
  CrossIcon,
  PlusIcon,
  ChevronIcon,
  SearchIcon,
  InfoCircleIcon,
  EyeOpenIcon,
  EyeClosedIcon,
}
