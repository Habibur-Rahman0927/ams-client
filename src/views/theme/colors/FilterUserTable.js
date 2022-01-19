import QRCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CInputGroup,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'

const Colors = () => {
  const [checkData, setCheckData] = useState([])
  const [text, setText] = useState('')
  const [filterData, setFilterData] = useState([])
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get('http://localhost:5500/api/attendance/adcheck', config)
    setCheckData(data)
    // console.log(data)
  }
  useEffect(() => {
    loadCheckData()
  }, [loadCheckData])
  let tempCheckData = [...checkData]
  const searchUser = (e) => {
    setText(e.target.value)
    console.log(text)
    tempCheckData = tempCheckData.filter((data) => {
      return data.name.toLowerCase().startsWith(text)
    })
    console.log(tempCheckData)
    setFilterData(tempCheckData)

    // console.log(tempCheckData)
  }
  return (
    <>
      <h1>Search User</h1>
      <CInputGroup className="mb-3" style={{ width: '50%' }}>
        <CFormInput
          placeholder="Username"
          aria-label="Username"
          value={text}
          onChange={searchUser}
          aria-describedby="basic-addon1"
        />
      </CInputGroup>
      <br />
      <CTable color="success" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Place</CTableHeaderCell>
            <CTableHeaderCell scope="col">QrCode</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {/* <CTableHeaderCell scope="row">1</CTableHeaderCell> */}
          {filterData.map((check) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={check._id}>
              <CTableDataCell>{check.user}</CTableDataCell>
              <CTableDataCell>{check.name}</CTableDataCell>
              <CTableDataCell>{check.check}</CTableDataCell>
              <CTableDataCell>{check.time}</CTableDataCell>
              <CTableDataCell>{check.date}</CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
              <CTableDataCell>
                <QRCode
                  id={check._id}
                  value={`${check.name}, ${check.user}, ${check.check}, ${check.createdAt}`}
                />
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Colors
