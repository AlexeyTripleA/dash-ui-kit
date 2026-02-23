import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-native'
import { View, Text, StyleSheet } from 'react-native'
import { TransactionStatusIcon } from './index'
import type { StatusKey } from './index'

const meta: Meta<typeof TransactionStatusIcon> = {
  title: 'React Native/TransactionStatusIcon',
  component: TransactionStatusIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['SUCCESS', 'FAIL', 'QUEUED', 'POOLED', 'BROADCASTED'],
      description: 'Transaction status to display',
    },
    size: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Override icon color',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme for default color selection',
    },
  },
}

export default meta
type Story = StoryObj<typeof TransactionStatusIcon>

export const Success: Story = {
  args: {
    status: 'SUCCESS',
    size: 18,
  },
}

export const Fail: Story = {
  args: {
    status: 'FAIL',
    size: 18,
  },
}

export const Queued: Story = {
  args: {
    status: 'QUEUED',
    size: 18,
  },
}

export const Pooled: Story = {
  args: {
    status: 'POOLED',
    size: 18,
  },
}

export const Broadcasted: Story = {
  args: {
    status: 'BROADCASTED',
    size: 18,
  },
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: '#0C1C33',
    minWidth: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0C1C33',
    marginBottom: 8,
  },
})

const statuses: StatusKey[] = ['SUCCESS', 'FAIL', 'QUEUED', 'POOLED', 'BROADCASTED']

export const AllStatuses: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Light Theme</Text>
      {statuses.map((status) => (
        <View key={status} style={styles.row}>
          <TransactionStatusIcon status={status} theme='light' size={24} />
          <Text style={styles.label}>{status}</Text>
        </View>
      ))}
    </View>
  ),
}

export const DarkTheme: Story = {
  render: () => (
    <View style={[styles.container, { backgroundColor: '#0C1C33', borderRadius: 12 }]}>
      <Text style={[styles.sectionTitle, { color: 'white' }]}>Dark Theme</Text>
      {statuses.map((status) => (
        <View key={status} style={styles.row}>
          <TransactionStatusIcon status={status} theme='dark' size={24} />
          <Text style={[styles.label, { color: 'white' }]}>{status}</Text>
        </View>
      ))}
    </View>
  ),
}

export const Sizes: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Size Variations</Text>
      {[12, 18, 24, 32, 40].map((size) => (
        <View key={size} style={styles.row}>
          <TransactionStatusIcon status='SUCCESS' size={size} />
          <TransactionStatusIcon status='FAIL' size={size} />
          <TransactionStatusIcon status='QUEUED' size={size} />
          <TransactionStatusIcon status='POOLED' size={size} />
          <TransactionStatusIcon status='BROADCASTED' size={size} />
          <Text style={styles.label}>{size}px</Text>
        </View>
      ))}
    </View>
  ),
}

export const CustomColors: Story = {
  render: () => (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Custom Color Override</Text>
      <View style={styles.row}>
        <TransactionStatusIcon status='SUCCESS' color='#9B59B6' size={24} />
        <Text style={styles.label}>SUCCESS purple</Text>
      </View>
      <View style={styles.row}>
        <TransactionStatusIcon status='FAIL' color='#E74C3C' size={24} />
        <Text style={styles.label}>FAIL red</Text>
      </View>
      <View style={styles.row}>
        <TransactionStatusIcon status='QUEUED' color='#3498DB' size={24} />
        <Text style={styles.label}>QUEUED blue</Text>
      </View>
    </View>
  ),
}
