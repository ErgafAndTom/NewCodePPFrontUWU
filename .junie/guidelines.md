# Керівництво проекту для Frontpp

## Відповіді та thinking must be ukrainian(language)

## Огляд проекту
Frontpp - це система управління рахунками на базі React, яка дозволяє користувачам створювати, переглядати, редагувати, друкувати та видаляти рахунки. Додаток розроблений з українським інтерфейсом і включає функціональність для управління контрагентами (постачальниками та покупцями), розрахунку підсумків та генерування документів рахунків.

## Структура проекту
- **src/** - Основна директорія вихідного коду
  - **actions/** - Redux action creators
  - **api/** - Інтеграція API з бекендом (використовуючи axios)
  - **components/** - Компоненти інтерфейсу, що можна повторно використовувати
    - **Invoices/** - Компоненти, пов'язані з рахунками
  - **pages/** - Компоненти сторінок
  - **reducers/** - Redux reducers
  - **stores/** - Конфігурація Redux store
  - **utils/** - Допоміжні функції
  - **hooks/** - Користувацькі React hooks
  - **types/** - TypeScript визначення типів
  - **App.js** - Головний компонент додатку

## Technology Stack
- **React** - UI library
- **Redux** - State management
- **React Router** - Navigation
- **Material UI** - UI components
- **Axios** - API requests
- **Chart.js** - Data visualization
- **React Three Fiber/drei** - 3D rendering (if applicable)

## Керівництво з розробки

### Збірка проекту
Для збірки проекту виконайте:
```
npm install
npm run build
```

Результат збірки буде в директорії `build`.

### Запуск проекту
Для запуску проекту в режимі розробки:
```
npm start
```

Це запустить сервер розробки за адресою http://localhost:3000.

### Тестування
Для запуску тестів:
```
npm test
```

When implementing changes, Junie should:
1. Ensure all existing tests pass
2. Add new tests for new functionality when appropriate
3. Run the test suite before submitting changes

### Code Style Guidelines
- Follow the existing code style in the project
- Use functional components with hooks instead of class components
- Use proper error handling for API requests
- Maintain the existing project structure
- Comment complex logic
- Use descriptive variable and function names
- Follow the React best practices

### Backend Integration
The application connects to a backend API at http://127.0.0.1:5555. When making changes that affect API interactions, ensure that:
1. The API endpoints are correctly called
2. Error handling is properly implemented
3. Loading states are managed appropriately

## Submission Guidelines
Before submitting changes, Junie should:
1. Ensure the code builds without errors
2. Run tests to verify functionality
3. Verify that the changes meet the requirements
4. Provide a clear explanation of the changes made
