# Contributing

Thank you for your interest in contributing to Payrail API.

---

## Getting started

1. Fork the repository
2. Clone your fork
```bash
git clone https://github.com/your-username/payrail-api.git
cd payrail-api
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file using `.env.example` as a template
5. Start the development server
```bash
npm run dev
```

---

## Making changes

- Create a new branch for your changes
```bash
git checkout -b feature/your-feature-name
```

- Make your changes
- Test your changes locally
- Commit with a clear message
```bash
git commit -m "add your feature description"
```

- Push to your fork and open a pull request

---

## Code style

- Use `async/await` for all asynchronous operations
- Always use `next(error)` to pass errors to the error handler
- Keep controllers and routes separate
- Add a comment to any non-obvious code

---

## Pull request guidelines

- Keep pull requests focused — one feature or fix per PR
- Update documentation if you change any endpoints
- Update the `CHANGELOG.md` with your changes
- Update the `openapi.yaml` spec if you add or change endpoints

---

## Reporting issues

Open an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behaviour
- Your Node.js version and operating system