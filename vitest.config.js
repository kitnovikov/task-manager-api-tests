import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ["allure-vitest/setup"],
        reporters: [
            "verbose",
            [
                "allure-vitest/reporter",
                {
                    resultsDir: "allure-results",
                },
            ],
        ],
        tags: [
            {
                name: 'smoke',
                description: 'Быстрый набор тестов',
            },
            {
                name: 'regression',
                description: 'Проведение полного регресса',
            },
        ],
    },
})