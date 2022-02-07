import QRCode from 'qrcode.react'
import React, { useCallback, useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'
import axios from 'axios'

const Colors = () => {
  const [checkData, setCheckData] = useState([])
  const [text, setText] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = useCallback(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5000/api/attendance/adcheckbyfilter', config)
    // console.log(data)
    setCheckData(data)
  }, [userInfoFromLocalStorage.token])
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  //
  let tempCheckData = [...checkData]
  const handleFilter = (e) => {
    // console.log(tempCheckData)
    // console.log(text)
    if (text) {
      tempCheckData = tempCheckData.filter((data) => {
        return data.name.toLowerCase().startsWith(text.toLocaleLowerCase())
      })
      console.log(tempCheckData)
      setCheckData(tempCheckData)
    }
  }
  const handleDateFilter = (e) => {
    tempCheckData = tempCheckData.filter((data) => {
      const date = new Date(data.date).getTime()
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()
      return start <= date && date <= end
    })
    setCheckData(tempCheckData)
  }
  return (
    <>
      <CRow className="justify-content-center">
        <CCol md={4} lg={7} xl={6}>
          <h4>Search User</h4>
          <CInputGroup className="mb-3" style={{ width: '60%' }}>
            <CFormInput
              placeholder="Username"
              aria-label="Username"
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-describedby="basic-addon1"
            />
            <CButton onClick={handleFilter}>Search</CButton>
          </CInputGroup>
        </CCol>
        <CCol md={6} lg={7} xl={6}>
          <h4>Filter By Date : </h4>
          <CInputGroup className="mb-3" style={{ width: '95%' }}>
            <CFormLabel htmlFor="formFileMultiple">
              <strong style={{ padding: '10px' }}>Start : </strong>
            </CFormLabel>
            <CFormInput
              type="date"
              id="formFileMultiple"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <CFormLabel htmlFor="formFileMultiple1">
              <strong style={{ padding: '10px' }}>End : </strong>
            </CFormLabel>
            <CFormInput
              type="date"
              id="formFileMultiple1"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <CButton style={{ marginLeft: '10px' }} onClick={handleDateFilter}>
              Filter
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>

      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Place</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {checkData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
