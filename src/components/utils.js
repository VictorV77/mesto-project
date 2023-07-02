import { closePopup } from "./modal.js";

export function isEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
  };
  