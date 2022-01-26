import React, { useRef, useState } from 'react'
import { CButton, CCol, CCollapse, CRow } from '@coreui/react'
import BarCodeScanner from './components/BarCodeScanner'
import QrCodeScanner from './components/QrCodeScanner'

const QrCode = () => {
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  return (
    <>
      <h1>Autonomous Attendance</h1>
      <div
        className=""
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <CButton
          style={{ marginRight: '10px', marginBottom: '10px' }}
          onClick={() => {
            setVisibleA(true)
            setVisibleB(false)
          }}
        >
          Scan QR Code
        </CButton>
        <CButton
          style={{ marginRight: '10px', marginBottom: '10px' }}
          onClick={() => {
            setVisibleB(true)
            setVisibleA(false)
          }}
        >
          Bar-Code Scanner
        </CButton>
      </div>
      <CRow>
        <CCol md={12}>
          <CCollapse visible={visibleA}>
            <QrCodeScanner />
          </CCollapse>
          <CCollapse visible={visibleB}>
            <BarCodeScanner />
          </CCollapse>
        </CCol>
      </CRow>
    </>
  )
}

export default QrCode
