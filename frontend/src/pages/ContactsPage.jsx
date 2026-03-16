import './ContactsPage.css'

function ContactsPage() {
  return (
    <div className="contacts-page">
      <div className="contacts-page-header">
        <h2 className="contacts-page-title">Contacts</h2>
      </div>
      <div className="contacts-page-empty">
        <p>No contacts yet. They will appear here once the backend is connected.</p>
      </div>
    </div>
  )
}

export default ContactsPage
