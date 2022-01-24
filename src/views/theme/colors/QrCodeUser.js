import React, { useRef, useState } from 'react'
import QrReader from 'react-qr-reader'
import { CButton, CCard, CCardBody, CCol, CCollapse, CRow } from '@coreui/react'

const QrCode = () => {
  const [visibleA, setVisibleA] = useState(false)
  const [scanResultWebcam, setScanResultWebcam] = useState('')
  const qrRef = useRef(null)
  const handleErrorWebcam = (error) => {
    console.log(error)
  }
  const handleScanWebcam = (result) => {
    setScanResultWebcam(result)
    // console.log(scanResultWebcam)
    // response()
  }

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
            setVisibleA(!visibleA)
          }}
        >
          Scan QR Code
        </CButton>
      </div>
      <CRow>
        <CCol md={12}>
          <CCollapse visible={visibleA}>
            <CCard className="mt-3">
              <CCardBody
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div className="col-md-6 col-md-6">
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {/* <button onClick={onScanFile}>Qr code reader</button> */}
                    <QrReader
                      ref={qrRef}
                      delay={300}
                      onError={handleErrorWebcam}
                      onScan={handleScanWebcam}
                    />
                  </div>
                  <div
                    style={{
                      fontWeight: '700',
                    }}
                    className=""
                  >
                    <p>Your QRCodeHolds: {scanResultWebcam} </p>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCollapse>
        </CCol>
      </CRow>
    </>
  )
}

export default QrCode
