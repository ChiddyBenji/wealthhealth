import Modal from 'react-modal';

export default function CustomModal({ isOpen, onClose }) {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      contentLabel="Employee Created"
    >
      <h2>Employee Created!</h2>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}