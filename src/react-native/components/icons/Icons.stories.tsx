import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-native'
import { View, Text, StyleSheet } from 'react-native'
import {
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
  TopRightArrowIcon
} from './index'

const meta: Meta = {
  title: 'React Native/Icons',
  component: ArrowIcon
}

export default meta

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 32,
    gap: 32
  },
  iconContainer: {
    alignItems: 'center',
    gap: 8,
    width: 80
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center'
  }
})

// All Icons Overview
export const AllIcons: StoryObj = {
  render: () => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <ArrowIcon />
        <Text style={styles.iconLabel}>ArrowIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CopyIcon />
        <Text style={styles.iconLabel}>CopyIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SuccessIcon />
        <Text style={styles.iconLabel}>SuccessIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <ErrorIcon />
        <Text style={styles.iconLabel}>ErrorIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CheckIcon />
        <Text style={styles.iconLabel}>CheckIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <CrossIcon />
        <Text style={styles.iconLabel}>CrossIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <PlusIcon />
        <Text style={styles.iconLabel}>PlusIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <ChevronIcon />
        <Text style={styles.iconLabel}>ChevronIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <SearchIcon />
        <Text style={styles.iconLabel}>SearchIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <InfoCircleIcon />
        <Text style={styles.iconLabel}>InfoCircleIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <EyeOpenIcon color="#333" />
        <Text style={styles.iconLabel}>EyeOpenIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <EyeClosedIcon color="#333" />
        <Text style={styles.iconLabel}>EyeClosedIcon</Text>
      </View>
      <View style={styles.iconContainer}>
        <TopRightArrowIcon />
        <Text style={styles.iconLabel}>TopRightArrowIcon</Text>
      </View>
    </View>
  )
}

// Arrow Icon
export const Arrow: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20, backgroundColor: '#333' }}>
      <ArrowIcon {...args} />
    </View>
  ),
  args: {
    size: 14,
    color: 'white'
  }
}

// Copy Icon
export const Copy: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20, backgroundColor: '#333' }}>
      <CopyIcon {...args} />
    </View>
  ),
  args: {
    size: 16,
    color: 'white'
  }
}

// Success Icon
export const Success: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <SuccessIcon {...args} />
    </View>
  ),
  args: {
    size: 18,
    color: '#1CC400'
  }
}

// Error Icon
export const Error: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <ErrorIcon {...args} />
    </View>
  ),
  args: {
    size: 18,
    color: '#F45858'
  }
}

// Check Icon
export const Check: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <CheckIcon {...args} />
    </View>
  ),
  args: {
    size: 20,
    color: '#4C7EFF'
  }
}

// Cross Icon
export const Cross: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <CrossIcon {...args} />
    </View>
  ),
  args: {
    size: 16,
    color: '#0C1C33'
  }
}

// Plus Icon
export const Plus: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <PlusIcon {...args} />
    </View>
  ),
  args: {
    size: 17,
    color: '#4C7EFF'
  }
}

// Chevron Icon
export const Chevron: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <ChevronIcon {...args} />
    </View>
  ),
  args: {
    size: 12,
    color: '#0C1C33'
  }
}

// Search Icon
export const Search: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <SearchIcon {...args} />
    </View>
  ),
  args: {
    size: 16,
    color: '#0C1C33'
  }
}

// Info Circle Icon
export const InfoCircle: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <InfoCircleIcon {...args} />
    </View>
  ),
  args: {
    size: 19,
    color: '#4C7EFF'
  }
}

// Eye Open Icon
export const EyeOpen: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <EyeOpenIcon {...args} />
    </View>
  ),
  args: {
    size: 16,
    color: '#333'
  }
}

// Eye Closed Icon
export const EyeClosed: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <EyeClosedIcon {...args} />
    </View>
  ),
  args: {
    size: 16,
    color: '#333'
  }
}

// Top Right Arrow Icon
export const TopRightArrow: StoryObj = {
  render: (args) => (
    <View style={{ padding: 20 }}>
      <TopRightArrowIcon {...args} />
    </View>
  ),
  args: {
    size: 25,
    color: '#0C1C33'
  }
}

// Size Variations
export const SizeVariations: StoryObj = {
  render: () => (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 16, fontSize: 12 }}>Icons support different sizes:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <SuccessIcon size={16} />
        <SuccessIcon size={24} />
        <SuccessIcon size={32} />
      </View>
    </View>
  )
}

// Color Variations
export const ColorVariations: StoryObj = {
  render: () => (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 16, fontSize: 12 }}>Icons support custom colors:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <SuccessIcon color="#1CC400" />
        <SuccessIcon color="#F45858" />
        <SuccessIcon color="#008DE4" />
      </View>
    </View>
  )
}

// Interactive Icons
export const Interactive: StoryObj = {
  render: () => (
    <View style={{ padding: 16 }}>
      <Text style={{ marginBottom: 16, fontSize: 12 }}>Icons can be interactive with onPress handlers:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <CopyIcon 
          color="#4C7EFF" 
          onPress={() => console.log('Copy pressed!')}
        />
        <CheckIcon 
          onPress={() => console.log('Check pressed!')}
        />
        <CrossIcon 
          color="#F45858"
          onPress={() => console.log('Delete pressed!')}
        />
      </View>
    </View>
  )
}
