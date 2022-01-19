import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CCol,
  CCard,
  CFormSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardFooter,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import axios from 'axios'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const [userDate, setUserDate] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(true)
  const [location, setLocation] = useState({
    lati: '',
    long: '',
  })
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  const RealTime = new Date()
  const months = RealTime.getMonth()
  const time = RealTime.getHours() + ':' + RealTime.getMinutes() + ':' + RealTime.getSeconds()
  const date = RealTime.getDate() + '-' + months + 1 + '-' + RealTime.getFullYear()

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
  useEffect(() => {
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
      const { data } = await axios.get('http://localhost:5500/api/attendance/select', config)
      setUserDate(data)
    }
    loadSelectData()
    return () => {}
  }, [userInfoFromLocalStorage])
  const handleSubmit = async () => {
    const { lati, long } = location
    const { data } = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lati}&lon=${long}&apiKey=9515698e632448d0820d65669c5fa699`,
    )
    console.log(data.features[0])
    const placedata = data.features[0].properties.formatted
    let check
    if (checked) {
      check = 'Check In'
      for (let i = 0; i < userDate.length; i++) {
        const userId = userDate[i].name
        // console.log(userId)
        // console.log(userInfoFromLocalStorage._id)
        if (userId === name) {
          if (userDate[i].id === userInfoFromLocalStorage._id) {
            if (RealTime > 9 && RealTime < 10) {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
                },
              }
              await axios.post(
                `http://localhost:5500/api/attendance/select`,
                { name, check, time, date, lati, long, placedata },
                config,
              )
              // console.log(data)
              // console.log('match')
              setChecked(!checked)
            } else {
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
                },
              }
              await axios.post(
                `http://localhost:5500/api/pending/selectpending`,
                { name, check, time, date, lati, long, placedata },
                config,
              )
              // console.log(data)
              // console.log('match pading')
              setChecked(!checked)
              // console.log(placedata)
            }
          } else {
            // console.log('not match id')
          }
        } else {
          // const notMatch = "Don't Select other person"
          // console.log('Dont Select other person')
        }
      }
    } else {
      check = 'Check Out'
      for (let i = 0; i < userDate.length; i++) {
        const userId = userDate[i].name
        // console.log(userId)
        // console.log(userInfoFromLocalStorage._id)
        if (userId === name) {
          if (userDate[i].id === userInfoFromLocalStorage._id) {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
              },
            }
            await axios.post(
              `http://localhost:5500/api/attendance/select`,
              { name, check, time, date, lati, long, placedata },
              config,
            )
            // console.log(data)
            // console.log('match')
            setChecked(!checked)
          } else {
            console.log('not match id')
          }
        } else {
          const notMatch = "Don't Select other person"
          console.log(notMatch)
        }
      }
      // console.log('check false')
    }
    // console.log(data)
  }
  // console.log(name)
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CCard style={{ width: '26rem' }} className="text-center">
          <CCardHeader>Attendance Page</CCardHeader>
          <CCardBody>
            <CCardTitle style={{ marginBottom: '20px' }}>Give Your Attendance Here</CCardTitle>
            <CFormSelect
              aria-label="Default select example"
              onChange={(e) => setName(e.target.value)}
            >
              <option>Select your Name</option>
              {userDate.map((v) => {
                return (
                  <option value={v.name} key={v.id}>
                    {v.name}
                  </option>
                )
              })}
            </CFormSelect>
            <br />
            <CButton
              color="success"
              size="md"
              style={{ color: 'white' }}
              onClick={() => setVisible(!visible)}
              disabled={!checked}
            >
              Check In
            </CButton>
            <CButton
              color="success"
              size="md"
              style={{ color: 'white', marginLeft: '10px' }}
              onClick={() => setVisible(!visible)}
              disabled={checked}
            >
              Check Out
            </CButton>
          </CCardBody>
          <CCardFooter className="text-medium-emphasis">
            You can not checkout for 30min once checked In
          </CCardFooter>
        </CCard>
      </div>
      <CModal
        className="show d-block position-static"
        backdrop={false}
        keyboard={false}
        portal={false}
        visible={visible}
      >
        <CModalHeader>
          <CModalTitle>Are you sure?</CModalTitle>
        </CModalHeader>
        {/* <CModalBody>Modal body text goes here.</CModalBody> */}
        <CModalFooter>
          <CButton style={{ color: 'white' }} color="success" onClick={handleSubmit}>
            Yes
          </CButton>
          <CButton color="primary" onClick={() => setVisible(!visible)}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Colors
