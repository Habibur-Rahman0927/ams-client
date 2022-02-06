import React from 'react'
import { CButton } from '@coreui/react'
// eslint-disable-next-line react/prop-types
function ShareLink({ label, text, title }) {
  const canonical = document.querySelector('link[rel=canonical]')
  let url = canonical ? canonical.href : document.location.href
  const shareDetails = { url, title, text }

  const handleSharing = async () => {
    console.log(navigator.share)
    // console.log(shareDetails)
    try {
      await navigator
        .share(shareDetails)
        .then(() => console.log('Hooray! Your content was shared to tha world'))
    } catch (error) {
      console.log(`Oops! I couldn't share to the world because: ${error}`)
    }
  }
  return (
    <CButton
      style={{ marginTop: '20px', marginBottom: '20px' }}
      className="sharer-button"
      onClick={handleSharing}
    >
      <span className="sharer-button-text">{label}</span>
    </CButton>
  )
}
export default ShareLink
