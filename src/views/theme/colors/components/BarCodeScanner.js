import { CCard, CCardBody, CCardFooter, CCardHeader, CCardTitle, CFormInput } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

function BarCodeScanner() {
  const [userDate, setUserDate] = useState([])
  const [checked, setChecked] = useState(true)
  const [location, setLocation] = useState({
    lati: '',
    long: '',
  })
  const [inpValue, setInpValue] = useState('')
  const inputRef = useRef(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const RealTime = new Date()
  const months = RealTime.getMonth()
  const time = RealTime.getHours() + ':' + RealTime.getMinutes() + ':' + RealTime.getSeconds()
  const date = RealTime.getDate() + '-' + months + 1 + '-' + RealTime.getFullYear()
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const success = (pos) => {
    var crd = pos.coords
    const latitu = crd.latitude
    const longitu = crd.longitude
    // console.log(crd.accuracy)
    // eslint-disable-next-line no-sequences
    setLocation({
      lati: latitu,
      long: longitu,
    })
  }
  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkingApiFunc = async (attendanceApi, name, check, lati, long) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    await axios.post(
      `http://localhost:5000/api/${attendanceApi}`,
      { name, check, time, date, lati, long },
      config,
    )
    alert('success')
    setInpValue('')
  }
  useLayoutEffect(() => {
    let check
    navigator.geolocation.getCurrentPosition(success, error)
    const loadSelectData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            userInfoFromLocalStorage ? userInfoFromLocalStorage.token : null
          }`,
        },
      }
      const { data } = await axios.get('http://localhost:5000/api/attendance/select', config)
      setUserDate(data)
    }
    loadSelectData()
    window.addEventListener('keypress', () => {
      inputRef.current.focus()
      // console.log(inpValue)
      const CheckDataPost = async () => {
        const { lati, long } = location
        if (inpValue.length === 10) {
          if (checked) {
            check = 'Check In'
            for (let i = 0; i < userDate.length; i++) {
              const barCode = userDate[i].barCode
              // console.log(barCode)
              // console.log(inpValue)
              if (barCode === Number(inpValue)) {
                const name = 'Nadim'
                if (RealTime > 9 && RealTime < 10) {
                  checkingApiFunc('attendance/select', name, check, lati, long)
                  setChecked(!checked)
                } else {
                  checkingApiFunc('pending/selectpending', name, check, lati, long)
                  setChecked(false)
                }
              } else {
                console.log('not match id in checkin')
              }
            }
          } else {
            check = 'Check Out'
            for (let i = 0; i < userDate.length; i++) {
              const barCode = userDate[i].barCode
              console.log(barCode)
              console.log(inpValue)
              if (barCode === Number(inpValue)) {
                const name = 'Nadim'
                checkingApiFunc('attendance/select', name, check, lati, long)
                setChecked(true)
              } else {
                console.log('not match id checkout')
              }
            }
            console.log('check false')
          }
        }
      }
      CheckDataPost()
    })
  }, [RealTime, checked, checkingApiFunc, inpValue, location, userDate, userInfoFromLocalStorage])
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CCard style={{ width: '26rem' }} className="text-center">
        <CCardHeader>Attendance Page</CCardHeader>
        <CCardBody>
          <CCardTitle style={{ marginBottom: '20px' }}>
            Please Plug In your Barcode Scanner
          </CCardTitle>
          <CFormInput
            type="text"
            placeholder=""
            ref={inputRef}
            value={inpValue}
            onChange={(e) => setInpValue(e.target.value)}
          />
          <br />
        </CCardBody>
        <CCardFooter className="text-medium-emphasis">
          You can not checkout for 30min once checked In
        </CCardFooter>
      </CCard>
    </div>
  )
}

export default BarCodeScanner
