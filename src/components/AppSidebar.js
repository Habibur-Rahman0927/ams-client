import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './navdesgin.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCollapse,
  CDropdownDivider,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'

import { NavLink } from 'react-router-dom'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

const AppSidebar = () => {
  const [visible, setVisible] = useState(false)
  const [emp, setEmp] = useState(false)
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const userInfoFromLocalStorage = localStorage.getItem('userTime')
    ? JSON.parse(localStorage.getItem('userTime'))
    : null
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/home">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <h4 style={{ textDecoration: 'none', color: 'white' }}>Attendance System</h4>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {userInfoFromLocalStorage && userInfoFromLocalStorage.isAdmin && (
            <>
              <CButton
                className="bg-transparent border-0 "
                style={{
                  fontWeight: '700',
                  display: 'flex',
                  width: '12rem',
                  padding: '10px 0 10px 0',
                  marginLeft: '30px',
                  marginTop: '10px',
                }}
                onClick={() => setVisible(!visible)}
              >
                Admin
              </CButton>
              <CCollapse visible={visible}>
                <CCard className="mt-3 border-0">
                  <CCardBody
                    style={{
                      background: '#303C54',
                      margin: '0',
                    }}
                  >
                    <>
                      <NavLink to="/checking/admin" className="navDesgin">
                        <h6 className="navDesgin">Datavalues</h6>
                      </NavLink>
                      <NavLink to="/checking/filterUserTable" className="navDesgin">
                        <h6 className="navDesgin">Filter User</h6>
                      </NavLink>
                    </>
                  </CCardBody>
                </CCard>
              </CCollapse>
              <CDropdownDivider />
              <CButton
                className="bg-transparent border-0 "
                style={{
                  fontWeight: '700',
                  display: 'flex',
                  width: '12rem',
                  padding: '10px 0 10px 0',
                  marginLeft: '30px',
                  marginTop: '10px',
                }}
                onClick={() => setEmp(!emp)}
              >
                Employee
              </CButton>
              <CCollapse visible={emp}>
                <CCard className="mt-3 border-0">
                  <CCardBody
                    style={{
                      background: '#303C54',
                      margin: '0',
                    }}
                  >
                    <>
                      <NavLink to="/checking/check" className="navDesgin">
                        <h6 className="navDesgin">Check</h6>
                      </NavLink>
                      <NavLink to="/checking/table" className="navDesgin">
                        <h6 className="navDesgin">Table</h6>
                      </NavLink>
                      <NavLink to="/checking/qrcodeUser" className="navDesgin">
                        <h6 className="navDesgin">QR CODE</h6>
                      </NavLink>
                      <NavLink to="/login" className="navDesgin">
                        <h6 className="navDesgin">Login</h6>
                      </NavLink>
                      <NavLink to="/register" className="navDesgin">
                        <h6 className="navDesgin">Register</h6>
                      </NavLink>
                    </>
                  </CCardBody>
                </CCard>
              </CCollapse>
            </>
          )}
          {userInfoFromLocalStorage && userInfoFromLocalStorage.isAdmin === false && (
            <>
              <NavLink to="/checking/check" className="navDesgin">
                <h6 className="navDesgin">Check</h6>
              </NavLink>
              <NavLink to="/checking/table" className="navDesgin">
                <h6 className="navDesgin">Table</h6>
              </NavLink>
              <NavLink to="/checking/qrcodeUser" className="navDesgin">
                <h6 className="navDesgin">QR CODE</h6>
              </NavLink>
            </>
          )}
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
