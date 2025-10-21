const ContactRequestModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1010,
      }}
      onClick={onClose} // Close on overlay click
    >
      <div 
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '1.2em',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ContactRequestModal;
