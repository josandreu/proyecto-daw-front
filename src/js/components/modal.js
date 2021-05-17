class Modal {
  static init() {
    const modal = document.querySelector('.main-modal');
    const closeButton = document.querySelectorAll('.modal-close');

    const openModal = () => {
      modal.classList.remove('fadeOut');
      modal.classList.add('fadeIn');
      modal.style.display = 'flex';
    }

    for (let i = 0; i < closeButton.length; i++) {

      const elements = closeButton[i];

      elements.onclick = (e) => modalClose();

      modal.style.display = 'none';

      window.onclick = function (event) {
        if (event.target === modal) modalClose();
      }
    }
    document.getElementById('buttonOpenModal').addEventListener('click', openModal);
  }
}

export const modalClose = () => {
  const modal = document.querySelector('.main-modal');
  modal.classList.remove('fadeIn');
  modal.classList.add('fadeOut');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 500);
}

export default Modal;
