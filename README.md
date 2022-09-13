## FoodOrder

This application allows to user get the menu for the day and choose plates for order. Menu is formed by admin for whole week.

### Description
Application has login form and two possible roles: admin and user. After login Admin can create new plate and add it to menu in a particular day. Each plate can be modified or deleted. Admin also can see all orders, created by users for current day.
User is able to choose plates from menu and add them to the order. Order also can be modified and deleted.

Application uses several states and reducers to provide authorization, admin and user actions. There are several Higher-Order Components to create component and provide FoodService, AuthService and router inside main containers.\
Application includes 6 pages, main actions are performed by containers, nested components are responsible for presentation and user interaction.

### Available actions

Admin:
1. Add plate to menu (by days)
2. Watch all orders

User:
1. Add plate to order from menu
2. Edit/Delete order

### Main models
```
Menu: [
    { day: string, plates: Plate[] },
];
Orders: [
    { userId: string, plates: Plate[] },
];


Plate = {
    name: string,
    type: PlateType,
    hasSideDish: boolean,
    sideDish?: SideDish[],
};

PlateType = enum {salad, main, desert}
SideDishType = enum {sauce, garnish, topping };
SideDish = {
    type: SideDishType,
    name: string;
}
```
### Main actions
Menu\
list - all plates by days\
form - add plate with adds to day, add plate side dishes (modal window)

Order\
get - current order\
form/edit - add plate with particular add from menu by day

Orders\
list - all orders

Roles\
Admin - menu, orders (view only)\
User - order, menu (view only)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
