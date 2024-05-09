enum ELEMENT_TYPE {
  PARAGRAPH = "ElementParagraph",
  BUTTON = "ElementButton",
}

const renderTextTitle = (type: ELEMENT_TYPE | undefined) => {
  let title = '';

  switch (type) {
    case ELEMENT_TYPE.PARAGRAPH:
      title = 'Paragraph';
      break;
    case ELEMENT_TYPE.BUTTON:
      title = 'Button';
      break;
    default:
      title = '';
      break;
  }

  return title;
}

export { ELEMENT_TYPE, renderTextTitle }