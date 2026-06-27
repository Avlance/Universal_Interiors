// Accepts an input element, validates its value for at least 3 letters, no special characters, and no spaces
// Shows or removes an error message below the input element as needed
export function inputValidation(inputElement, parentElement) {
  if (!inputElement || typeof inputElement.value !== 'string') {
    appendOrRemoveError(inputElement, 'Invalid input element.', parentElement);
    if (parentElement) {
      parentElement.style.border = '1.5px solid #D50F25';
    } else if (inputElement) {
      inputElement.style.border = '1.5px solid #D50F25';
    }
    return false;
  }
  const value = inputElement.value;
  let error = '';

  // Phone number validation
  if (inputElement.type === 'tel' || inputElement.name === 'phone') {
    if (!/^\d{10}$/.test(value)) {
      error = 'Phone number must be exactly 10 digits.';
    }
  }
  // Email validation
  else if (inputElement.type === 'email' || inputElement.name === 'email') {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Please enter a valid email address.';
    }
  }
  // Pincode validation
  else if (inputElement.name === 'pincode') {
    if (!/^\d{6}$/.test(value)) {
      error = 'Pincode must be exactly 6 digits.';
    }
  }
  // OTP validation
  else if (inputElement.name === 'otp') {
    if (!/^\d{6}$/.test(value)) {
      error = 'OTP must be exactly 6 digits.';
    }
  }
  // Name/letters validation
  else {
    if (value.length < 3) {
      error = 'Input must be at least 3 letters.';
    } else if (/[^A-Za-z ]/.test(value)) {
      error = 'Only letters are allowed. No spaces or special characters.';
    }
  }

  appendOrRemoveError(inputElement, error, parentElement);

  if (error) {
    if (parentElement) {
      parentElement.style.border = '1.5px solid #D50F25';
    } else {
      inputElement.style.border = '1.5px solid #D50F25';
    }
  } else {
    if (parentElement) {
      parentElement.style.border = '';
    } else {
      inputElement.style.border = '';
    }
  }
  return !error;
}

// Validates a select element, requires a non-empty value
// Shows/removes error below the parent element and applies/removes #D50F25 border
export function selectValidation(selectElement, parentElement) {
  if (!selectElement) return false;
  let error = '';
  if (!selectElement.value || selectElement.value === '') {
    error = 'Please select a city.';
  }
  // Always add error after parentElement if provided, else after selectElement
  const referenceNode = parentElement || selectElement;
  const errorClass = 'universal-input-error-message';
  let errorElem = null;
  let next = referenceNode.nextElementSibling;
  if (next && next.classList.contains(errorClass)) {
    errorElem = next;
  }
  if (error) {
    if (!errorElem) {
      errorElem = document.createElement('div');
      errorElem.className = errorClass;
      errorElem.style.color = '#D50F25';
      errorElem.style.fontSize = '0.9em';
      errorElem.style.marginTop = '4px';
      errorElem.style.textAlign = 'left';
      if (referenceNode.parentNode) {
        if (referenceNode.nextSibling) {
          referenceNode.parentNode.insertBefore(errorElem, referenceNode.nextSibling);
        } else {
          referenceNode.parentNode.appendChild(errorElem);
        }
      }
    }
    errorElem.textContent = error;
    if (parentElement) {
      parentElement.style.border = '1.5px solid #D50F25';
    } else {
      selectElement.style.border = '1.5px solid #D50F25';
    }
    return false;
  } else {
    if (errorElem) {
      errorElem.parentNode.removeChild(errorElem);
    }
    if (parentElement) {
      parentElement.style.border = '';
    } else {
      selectElement.style.border = '';
    }
    return true;
  }
}

// Internal helper for error message display
function appendOrRemoveError(inputElement, error, parentElement) {
  if (!inputElement) return;
  const errorClass = 'universal-input-error-message';
  function insertAfter(newNode, referenceNode) {
    if (referenceNode.parentNode) {
      if (referenceNode.nextSibling) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      } else {
        referenceNode.parentNode.appendChild(newNode);
      }
    }
  }
  // Always add error after parentElement if provided, else after inputElement
  let referenceNode = parentElement || inputElement;
  let errorElem = null;
  let next = referenceNode.nextElementSibling;
  if (next && next.classList.contains(errorClass)) {
    errorElem = next;
  }
  if (error) {
    if (!errorElem) {
      errorElem = document.createElement('div');
      errorElem.className = errorClass;
      errorElem.style.color = '#D50F25';
      errorElem.style.fontSize = '0.9em';
      errorElem.style.marginTop = '4px';
      errorElem.style.textAlign = 'left';
      insertAfter(errorElem, referenceNode);
    }
    errorElem.textContent = error;
  } else if (errorElem) {
    errorElem.parentNode.removeChild(errorElem);
  }
}
