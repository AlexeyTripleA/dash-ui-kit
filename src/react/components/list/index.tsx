import React from 'react'
import { Text } from '../text'
import { CheckIcon } from '../icons'
import { useTheme } from '../../contexts/ThemeContext'

interface ListItem {
  text: string
  description?: string
}

interface ListProps {
  items: ListItem[]
  iconType?: 'check'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const iconComponents = {
  check: CheckIcon
}

export const List: React.FC<ListProps> = ({
  items,
  iconType = 'check',
  className = '',
  size = 'sm'
}) => {
  const { theme } = useTheme()
  const IconComponent = iconComponents[iconType]

  return (
    <ul className={`space-y-5 w-full ${className}`}>
      {items.map((item, index) => (
        <li key={index} className='flex items-start gap-4'>
          <IconComponent 
            size={20} 
            className='flex-shrink-0' 
            color={theme === 'dark' ? '#4C7EFF' : '#4C7EFF'}
          />
          <div className='flex flex-col gap-1'>
            <Text size={size} weight="medium">
              {item.text}
            </Text>
            {item.description && (
              <Text size='xs' dim className='opacity-75'>
                {item.description}
              </Text>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export type { ListProps, ListItem } 