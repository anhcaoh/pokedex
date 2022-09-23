/*
  Created on 9/16/2022
  by Anh Cao
  
  This Component is bootstrapped from .templates/Component
*/

import React, { useCallback, useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import useSearch from '@/hooks/useSearch'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Input, Space, Tag, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'app/store'
import { v4 as uuidv4 } from 'uuid'

export interface ISearchProps {
  className?: string
  children?: JSX.Element | JSX.Element[]
  onSearch?: (payload: any) => void
  secondarySearch?: any
}
export type SearchQueryTypes = 'recent' | 'name' | 'move'

const Search: React.FC<ISearchProps> = ({
  onSearch,
  secondarySearch,
  children,
  ...rest
}) => {
  const [, , setQuery, setQueryType] = useSearch('', '', onSearch)
  // `setQueryType` will trigger a new search with new query type i.e. `name | move`
  const searchedQueries = useSelector((state: RootState) => [
    ...state.search.queries.names,
    ...state.search.queries.moves,
  ])
  const [options, setOptions] = useState<
    {
      label: string | JSX.Element
      value?: string | object
      queryType: SearchQueryTypes | string
    }[]
  >([])
  useEffect(() => {
    if (secondarySearch) {
      const additionalSearchOptions = secondarySearch[0].map((item: any) => {
        return { label: item.name, queryType: 'move' }
      })
      const _searchOptions = [...options, ...additionalSearchOptions]
      setOptions(_searchOptions)
    }
  }, [secondarySearch, options])
  const renderSearchOptions = useCallback(
    (queryType: SearchQueryTypes, queries: string[]) => {
      if (queryType === 'recent' && queries.length) {
        return (
          <>
            <Space direction="vertical">
              <Typography.Text type="secondary">Recent</Typography.Text>
              <Space wrap direction="horizontal" size="small">
                {queries.map((query: string) => (
                  <Tag
                    key={uuidv4()}
                    onClick={() => {
                      onSearch && onSearch({ query })
                    }}
                  >
                    {query}
                  </Tag>
                ))}
              </Space>
            </Space>
          </>
        )
      }
      return (
        <>
          <Typography.Text type="secondary">{queryType}</Typography.Text>
          <Typography>{queries[0]}</Typography>
        </>
      )
    },
    [onSearch]
  )
  const handleOnChangeQuery = useDebounce<React.ChangeEvent<HTMLInputElement>>(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(value?.toLowerCase().trim())
      let opts = []
      opts.push(
        ...[
          {
            label: renderSearchOptions('move', [value]),
            value,
            queryType: 'move',
          },
        ]
      )
      if (searchedQueries.length) {
        opts.push({
          label: renderSearchOptions('recent', searchedQueries),
          queryType: 'recent',
        })
      }
      value && setOptions(opts)
    },
    500
  )
  const handleOnSelectOption = (value: string, option: object) => {
    setQueryType('move')
  }

  return (
    <div {...rest}>
      <AutoComplete options={options} onSelect={handleOnSelectOption}>
        <Input
          size={'large'}
          autoFocus
          placeholder="Search any Pokemon"
          prefix={<SearchOutlined />}
          onKeyDown={() => setQueryType('name')}
          onChange={handleOnChangeQuery}
        />
      </AutoComplete>
    </div>
  )
}
Search.displayName = 'Search'

export default Search
