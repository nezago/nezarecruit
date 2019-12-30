export const handleOptionClicked = (necessaryFields) => {
  const {
    navbarContainer,
    brandLogo, optionsContainer,
  } = necessaryFields;

  navbarContainer.classList.add('bg-custom');
  navbarContainer.classList.remove('bg-unscrolled');
  brandLogo.classList.remove('brand-logo-lg');
  brandLogo.classList.add('brand-logo-sm');
  optionsContainer.classList.remove('navbar-options');
};
export const handleToggler = (component) => {
  const { isTogglerOpen } = component.state;
  component.setState({ isTogglerOpen: !isTogglerOpen });
};
