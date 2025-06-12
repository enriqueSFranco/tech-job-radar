interface SearchFormFields extends HTMLFormControlsCollection {
  keyword: HTMLInputElement;
  location: HTMLInputElement;
}

interface SearchFormElements extends HTMLFormElement {
  readonly elements: SearchFormFields;
}

export {SearchFormElements, SearchFormFields}

