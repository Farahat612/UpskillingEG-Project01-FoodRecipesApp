# Food Recipes Management System

The Food Recipes Management System is a comprehensive web application designed to facilitate the management, sharing, and discovery of food recipes. Built with modern web technologies, this system offers a user-friendly interface for users to explore, manage, and contribute recipes. It caters to a wide range of users, from home cooks to professional chefs, providing features tailored to enhance the culinary experience.

## Demo

You may watch the following video demo:

[FoodrecipeappDemo.webm](https://github.com/Farahat612/UpskillingEG-Project01-FoodRecipesApp/assets/67427124/8ad8f1da-18ce-4a07-b752-2cef9539b351)

> A live production demo will be available soon after resolving a deployment issue.

## Features

### User Authentication and Authorization

- **User Authentication:** Secure login and registration system to manage user access.
- **User Roles:** Differentiated user roles, including SuperAdmin and regular users, to control access levels within the application.

### Recipe Management

- **Browse Recipes:** Users can browse through a list of recipes, with options to filter by categories or tags.
- **Recipe Details:** View detailed information about a recipe, including ingredients, preparation steps, and images.
- **Add and Edit Recipes:** Users with appropriate permissions can add new recipes or edit existing ones, including uploading images and specifying categories and tags.
- **Favorites:** Users can mark recipes as favorites for easy access later.

### Categories and Tags

- **Manage Categories:** Admin users can add, edit, or delete categories to organize recipes.
- **Manage Tags:** Admin users can add, edit, or delete tags to provide additional recipe metadata.

### Dashboard

- **Admin Dashboard:** A dashboard for SuperAdmin users to manage recipes, categories, and tags, and view system statistics.
- **User Dashboard:** A personalized dashboard for regular users to view their favorite recipes and recent activity.

## Technologies Used

- **React.js:** For building the user interface.
- **React-hook-form:** For form validation.
- **React Bootstrap:** For styling.
- **React Toastify:** For toast notifications.
- **React Icons:** For icons.
- **Context API:** For managing application state across components.
- **React Router:** For navigation within the application.

## Skills and Techniques Covered

- **React Development**: Utilizing functional components, hooks (e.g., `useState`, `useEffect`, `useContext`), and `the context API` for state management across the application.

- **Routing and Navigation**: Implemented client-side routing using `react-router-dom` with route protection to manage navigation between different parts of the application.

- **Form Handling and Validation**: Leverageing `react-hook-form` for efficient form handling and validation, ensuring a smooth user experience when submitting data.

- **API Integration**: Used `axios` for making HTTP requests to protected and public endpoints, as seen in the [`apiProtected`](src/utils/api.js) and [`apiPublic`](src/utils/api.js) utilities.

- **Custom Hooks**: Showcases the creation and use of `custom hooks` (e.g., [`useCategories`](src/hooks/other/useCategories.js)) to encapsulate and reuse logic across components.

- **Error Handling and Notifications**: Implements error handling strategies and user notifications using `react-toastify`, enhancing the user interface and experience.

## Getting Started

To get the application running locally on your machine, follow these steps:

1. Clone the repo

   ```sh
   git clone https://github.com/Farahat612/UpskillingEG-Project01-FoodRecipesApp
   ```

2. Change directory

   ```shell
   cd UpskillingEG-Project01-FoodRecipesApp
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Start the development server

   ```shell
   npm run dev
   ```

5. Visit `http://127.0.0.1:5173/` in your browser.

## Acknowledgment

> This applicetion was developed and built as part of UpSkillingEG `frontend job simulation bootcamp`, following their `Figma` design guidelines and `API` docs.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
