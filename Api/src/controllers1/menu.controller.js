import MenuService from '../services1/menu.service';

const MenuController = {
  getMenu(req, res) {
    const menu = MenuService.getMenu();
    return res.status(200).json({
      status: 'success',
      data: menu,
    });
  },
  addMenu(req, res) {
    /*
      Expect json of format
      {
        'date': '21st March, 2018',
        'menu': {
            sample menu
        }
      }
    */
    const menu = req.body;
    const newMenu = MenuService.addMenu(menu);
    return res.status(201).json({
      status: 'success',
      message: 'Menu created successfully',
      data: newMenu,
    });
  },
};

export default MenuController;
