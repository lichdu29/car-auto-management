import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServiceThunk } from '../../../../redux/service/actions'
import { Tabs } from 'antd'
import { camelize } from '../../../../utils'
import * as icons from '../../../.././assets/icons'
import TableService from './TableService'
const Services = () => {
  const dispatch = useDispatch()
  const { services } = useSelector((state) => state.service)

  const items = useMemo(() => {
    if (!services) return []
    return Object.keys(services).map((type) => {
      return {
        label: icons[camelize(type)] ? (
          <span className="flex gap-2 items-center">
            <img
              src={icons[camelize(type)]}
              alt={type}
              width={16}
              height={16}
            />
            {type}
          </span>
        ) : (
          type
        ),
        key: type,
        slug: camelize(type),
        icon: icons[camelize(type)] || null,
        children: <TableService data={services[type] || []} />,
      }
    }, [])
  }, [services])

  useEffect(() => {
    dispatch(getAllServiceThunk({ page: 1, limit: 9999 }))
  }, [dispatch])

  return (
    <div className="p-6 rounded-xl bg-white shadow-lg">
      <Tabs items={items} type="card"></Tabs>
    </div>
  )
}

export default Services
