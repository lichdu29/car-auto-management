import React, { useEffect } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { camelize } from '../../../../utils/index'
import { getAllServiceThunk } from '../../../../redux/service/actions'
import ServicesForm from './ServicesForm'
const { Panel } = Collapse

const Services = () => {
  const { token } = theme.useToken()
  const dispatch = useDispatch()
  const { isLoading, services, types } = useSelector((state) => state.service)
  useEffect(() => {
    if (services.length === 0)
      dispatch(getAllServiceThunk({ page: 1, limit: 9999 }))
  }, [dispatch, services.length])

  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    boxShadow: token.boxShadowTertiary,
  }
  return (
    <div className="rounded-xl p-6 bg-white shadow-lg h-full">
      <Collapse
        accordion
        bordered={false}
        defaultActiveKey={types[0]}
        destroyInactivePanel
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
      >
        {Object.keys(services).map((type) => (
          <Panel
            header={type}
            className="font-bold"
            key={camelize(type)}
            style={panelStyle}
          >
            <ServicesForm type={type} services={services[type]} />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}

export default Services
