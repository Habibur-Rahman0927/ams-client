import PropTypes from 'prop-types'
import React, { useEffect, useState, createRef, useCallback } from 'react'
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
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import axios from 'axios'
import Paginate from '../typography/Paginate'
import { Link, useParams } from 'react-router-dom'

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
      {/* <Colors /> */}
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const [checkData, setCheckData] = useState([])
  const [pages, setPages] = useState(null)
  const [page, setPage] = useState(null)
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadCheckData = async (keyword = '', pageNumber = '') => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage && userInfoFromLocalStorage.token}`,
      },
    }
    const { data } = await axios.get(
      `http://localhost:5000/api/attendance/adcheck?keyword=${keyword}&pageNumber=${pageNumber}`,
      config,
    )
    setCheckData(data.checkAll)
    setPage(data.page)
    setPages(data.pages)
    // console.log(data)
  }
  useEffect(() => {
    loadCheckData('', pageNumber)
  }, [loadCheckData, pageNumber])
  return (
    <>
      <h1>This Is For Admin</h1>
      <br />
      <CTable color="secondary" striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checked</CTableHeaderCell>
            <CTableHeaderCell scope="col">Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
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
              <CTableDataCell>
                {check.lati}/{check.long}
              </CTableDataCell>
              <CTableDataCell>{check.placedata}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Paginate pages={pages} page={page} isAdmin={true} />
    </>
  )
}

export default Colors
