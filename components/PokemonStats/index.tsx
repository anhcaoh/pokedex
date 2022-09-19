/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import { Col, Divider, List, Row, Space, Typography } from 'antd'
import Image from 'next/image'
import { Pokemon } from 'pokedex-promise-v2'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './style.module.scss'

export interface IPokemonStatsProps {
  className?: string
  stats: Pokemon | null
  children?: JSX.Element | JSX.Element[]
}
const PokemonStats: React.FC<IPokemonStatsProps> = ({
  stats,
  children,
  ...rest
}) => {
  if (!stats) return null
  const { species, sprites, types, abilities, moves } = stats
  return (
    <div {...rest}>
      <Space direction="vertical">
        <Space align="baseline">
          <Image
            src={sprites?.front_default || ''}
            alt={species?.name}
            width={96}
            height={96}
          />
          <Image
            src={sprites?.front_shiny || ''}
            alt={species?.name}
            width={96}
            height={96}
          />
          <Image
            src={sprites?.back_default || ''}
            alt={species?.name}
            width={96}
            height={96}
          />
          <Image
            src={sprites?.back_shiny || ''}
            alt={species?.name}
            width={96}
            height={96}
          />
        </Space>
        <div style={{ textAlign: 'center' }}>
          <Space direction="vertical" align="baseline">
            <Space align="baseline">
              👾
              <Typography.Text
                type={'secondary'}
                strong
                className={styles['stats-heading']}
              >
                Name
              </Typography.Text>
              <Typography.Text>{species?.name}</Typography.Text>
            </Space>
            <Space align="baseline">
              ✨
              <Typography.Text
                type={'secondary'}
                strong
                className={styles['stats-heading']}
              >
                Types
              </Typography.Text>
              <List>
                {types?.map(({ id, type: { name } }) => (
                  <List.Item key={uuidv4()}>{name}</List.Item>
                ))}
              </List>
            </Space>
            <Space align="baseline">
              ⚡️
              <Typography.Text
                type={'secondary'}
                strong
                className={styles['stats-heading']}
              >
                Abilities
              </Typography.Text>
              <List>
                {abilities?.map(({ id, ability: { name } }) => (
                  <List.Item key={uuidv4()}>{name}</List.Item>
                ))}
              </List>
            </Space>
          </Space>
          <Space>
            <Space align="baseline">
              🚀
              <Typography.Text
                type={'secondary'}
                strong
                className={styles['stats-heading']}
              >
                Moves
              </Typography.Text>
              <List style={{ overflowY: 'auto', height: 200 }}>
                {moves?.map(({ id, move: { name } }) => (
                  <List.Item key={uuidv4()}>{name}</List.Item>
                ))}
              </List>
            </Space>
          </Space>
        </div>
      </Space>
    </div>
  )
}
PokemonStats.displayName = 'PokemonStats'

export default PokemonStats
