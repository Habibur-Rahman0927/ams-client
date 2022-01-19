import QRCode from 'qrcode.react'
import React, { useState, useRef } from 'react'
import QrReader from 'react-qr-reader'
import { useBarcode } from 'react-barcodes'
import { CButton, CCard, CCardBody, CCol, CCollapse, CRow } from '@coreui/react'
// import axios from 'axios'

const QrCode = () => {
  // const [userDate, setUserDate] = useState([])
  // const [qrcodeName, setQrcodeName] = useState('')
  // const [qrcodeId, setQrcodeId] = useState('')
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)
  const [visibleC, setVisibleC] = useState(false)
  // const [checked, setChecked] = useState(true)
  const [scanResultFile, setScanResultFile] = useState('')
  const [scanResultWebcam, setScanResultWebcam] = useState('')
  // const [location, setLocation] = useState({
  //   lati: '',
  //   long: '',
  // })
  const qrRef = useRef(null)
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // console.log(userInfoFromLocalStorage)
  // const RealTime = new Date()
  // const months = RealTime.getMonth()
  // const time = RealTime.getHours() + ':' + RealTime.getMinutes() + ':' + RealTime.getSeconds()
  // const date = RealTime.getDate() + '-' + months + 1 + '-' + RealTime.getFullYear()
  // const success = (pos) => {
  //   var crd = pos.coords
  //   const latitu = crd.latitude
  //   const longitu = crd.longitude
  //   // console.log(crd.accuracy)
  //   // eslint-disable-next-line no-sequences
  //   setLocation({
  //     lati: latitu,
  //     long: longitu,
  //   })
  // }
  // const error = (err) => {
  //   console.warn(`ERROR(${err.code}): ${err.message}`)
  // }
  const handleErrorFile = (error) => {
    console.log(error)
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result)
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog()
  }
  // console.log(scanResultFile)
  const handleErrorWebcam = (error) => {
    console.log(error)
  }
  const handleScanWebcam = (result) => {
    setScanResultWebcam(result)
    // console.log(scanResultWebcam)
    // response()
  }
  const { inputRef } = useBarcode({
    value: `${userInfoFromLocalStorage ? userInfoFromLocalStorage.name : null}`,
    options: {
      background: '#ccffff',
    },
  })
  // function response() {
  //   if (scanResultWebcam !== null) {
  //     alert('Your QRCodeHolds: ' + scanResultWebcam)
  //   }
  // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const loadStoreQrCode = () => {
  //   if (scanResultWebcam !== null) {
  //     const resultwebcam = scanResultWebcam.split(',')
  //     setQrcodeName(resultwebcam[0])
  //     setQrcodeId(resultwebcam[1])
  //     handleSubmit()
  //     console.log(qrcodeName, qrcodeId)
  //   }
  // }
  // const handleSubmit = async () => {
  //   const name = userInfoFromLocalStorage.name
  //   const { lati, long } = location
  //   const { data } = await axios.get(
  //     `https://api.geoapify.com/v1/geocode/reverse?lat=${lati}&lon=${long}&apiKey=9515698e632448d0820d65669c5fa699`,
  //   )
  //   // console.log(data.features[0])
  //   const placedata = data.features[0].properties.formatted
  //   let check
  //   if (checked) {
  //     check = 'Check In'
  //     for (let i = 0; i < userDate.length; i++) {
  //       const userName = userDate[i].name
  //       // console.log(userId)
  //       // console.log(userInfoFromLocalStorage._id)
  //       const userId = userDate[i].id
  //       // console.log(userId)
  //       if (userName === qrcodeName) {
  //         if (userId === qrcodeId) {
  //           if (RealTime > 9 && RealTime < 10) {
  //             const config = {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
  //               },
  //             }
  //             const { data } = await axios.post(
  //               `http://localhost:5000/api/attendance/select`,
  //               { name, check, time, date, lati, long, placedata },
  //               config,
  //             )
  //             console.log(data)
  //             // console.log('match')
  //             setChecked(!checked)
  //           } else {
  //             const config = {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
  //               },
  //             }
  //             const { data } = await axios.post(
  //               `http://localhost:5000/api/pending/selectpending`,
  //               { name, check, time, date, lati, long, placedata },
  //               config,
  //             )
  //             if (data) {
  //               setChecked(!checked)
  //             }
  //             console.log(data)
  //             console.log('match pading')
  //             console.log(checked)
  //             // console.log(placedata)
  //           }
  //         } else {
  //           console.log('not match id')
  //         }
  //       } else {
  //         console.log("Don't Select other person")
  //       }
  //     }
  //   } else {
  //     check = 'Check Out'
  //     for (let i = 0; i < userDate.length; i++) {
  //       const userName = userDate[i].name
  //       const userId = userDate[i].id
  //       // console.log(userId)
  //       // console.log(userInfoFromLocalStorage._id)
  //       if (userName === qrcodeName) {
  //         if (userId === qrcodeId) {
  //           const config = {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
  //             },
  //           }
  //           const { data } = await axios.post(
  //             `http://localhost:5000/api/attendance/select`,
  //             { name, check, time, date, lati, long, placedata },
  //             config,
  //           )
  //           if (data) {
  //             setChecked(!checked)
  //           }
  //           console.log(data)
  //           console.log('match check out')
  //           console.log(checked)
  //         } else {
  //           console.log('not match id')
  //         }
  //       } else {
  //         const notMatch = "Don't Select other person"
  //         console.log(notMatch)
  //       }
  //     }
  //     console.log('check false')
  //   }
  //   // console.log(data)
  // }
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(success, error)
  //   const loadSelectData = async () => {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${
  //           userInfoFromLocalStorage ? userInfoFromLocalStorage.token : null
  //         }`,
  //       },
  //     }
  //     const { data } = await axios.get('http://localhost:5000/api/attendance/select', config)
  //     setUserDate(data)
  //   }
  //   loadSelectData()
  //   loadStoreQrCode()
  // }, [loadStoreQrCode, userInfoFromLocalStorage])
  return (
    <>
      <h1>Qr Code Generator</h1>
      <CButton
        style={{ marginRight: '10px', marginBottom: '10px' }}
        onClick={() => setVisibleA(!visibleA)}
      >
        Scan QR Code
      </CButton>
      <CButton
        style={{ marginRight: '10px', marginBottom: '10px' }}
        onClick={() => setVisibleB(!visibleB)}
      >
        Grab QR Code
      </CButton>
      <CButton
        style={{ marginRight: '10px', marginBottom: '10px' }}
        onClick={() => setVisibleC(!visibleC)}
      >
        Grab Your Codes
      </CButton>
      <CRow>
        <CCol xs={6}>
          <CCollapse visible={visibleA}>
            <CCard className="mt-3">
              <CCardBody>
                <div className="col-sm-6 col-lg-6">
                  <div style={{ width: '100%', height: '100%' }}>
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
        <CCol xs={6}>
          <CCollapse visible={visibleB}>
            <CCard className="mt-3">
              <CCardBody>
                <div className="col-sm-6 col-lg-6">
                  <div>
                    <div style={{ width: '100%', height: '100%' }}>
                      <button
                        style={{
                          border: 'none',
                          padding: '8px 20px',
                          backgroundColor: '#1abc9c',
                          borderRadius: '5px',
                          color: '#fff',
                          fontWeight: '700',
                          marginBottom: '15px',
                        }}
                        onClick={onScanFile}
                      >
                        Select QR Code from Storage
                      </button>
                      <QrReader
                        ref={qrRef}
                        delay={300}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                      />
                      <div
                        style={{
                          padding: '15px 0',
                          fontWeight: '700',
                        }}
                      >
                        <p>Your QRCodeHolds: {scanResultFile} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCollapse>
        </CCol>
        <CCol xs={6}>
          <CCollapse visible={visibleC}>
            <CCard className="mt-3">
              <CCardBody>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <QRCode
                    id={userInfoFromLocalStorage ? userInfoFromLocalStorage._id : null}
                    value={`${userInfoFromLocalStorage ? userInfoFromLocalStorage.name : null},${
                      userInfoFromLocalStorage ? userInfoFromLocalStorage._id : null
                    }`}
                  />
                  <br />
                  <svg ref={inputRef} />
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
