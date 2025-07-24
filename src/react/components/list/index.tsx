import React from 'react'
import { Text } from '../text'
import { CheckIcon } from '../icons'

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
  const IconComponent = iconComponents[iconType]

  return (
    <ul className={`space-y-5 w-full ${className}`}>
      {items.map((item, index) => (
        <li key={index} className='flex items-start gap-4'>
          <IconComponent size={20} className='flex-shrink-0' />
          <div className='flex flex-col gap-1'>
            <Text size={size} weight={500}>
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