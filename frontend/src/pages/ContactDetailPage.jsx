import { useParams, Link } from 'react-router-dom'
import './ContactDetailPage.css'

function ContactDetailPage() {
  const { id } = useParams()

  return (
    <div className="contact-detail-page">
      <div className="contact-detail-back">
        <Link to="/contacts" className="contact-detail-back-link">
          &larr; Back to Contacts
        </Link>
      </div>
      <div className="contact-detail-card">
        <h2 className="contact-detail-title">Contact #{id}</h2>
        <p className="contact-detail-placeholder">
          Contact details will appear here once the backend is connected.
        </p>
      </div>
    </div>
  )
}

export default ContactDetailPage
