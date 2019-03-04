import MenuData from '../data/menu-data';

const MenuService = {
  getMenu() {
    return MenuData.menu;
  },
  addMenu(menu) {
    const newMenu = menu;
    MenuData.menu = newMenu;
    return newMenu;
  },
};

export default MenuService;
